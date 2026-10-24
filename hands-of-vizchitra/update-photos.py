#!/usr/bin/env python3
"""Sync traced-hand photos from the published sheet into photos/.

The sheet's photo_Link column points at Google Photos (googleusercontent)
URLs that only live as long as the album does. This pulls each entry's
photo into photos/<id>.jpg — the id is the filename, per the sheet's own
convention ("001.jpg") — so the site serves them from the repo.

Usage, after adding new entries to the sheet:
    python3 hands-of-vizchitra/update-photos.py           # download new photos
    python3 hands-of-vizchitra/update-photos.py --push    # ...then commit + push
    python3 hands-of-vizchitra/update-photos.py --force   # re-download everything

Already-downloaded ids are skipped, so re-running is cheap. The page falls
back to the sheet's remote link for any id with no local photo yet.

It also refreshes the CSV embedded in index.html (<script id="sampleCsv">),
which first-time visitors see before the live sheet arrives, so keeping it
current means their first paint is already the real data.
"""
import csv
import io
import subprocess
import sys
import urllib.request
from pathlib import Path

CSV_URL = ("https://docs.google.com/spreadsheets/d/e/"
           "2PACX-1vTc0BJUydiWxnGDh_y0_Jl7FaPysPX9CJnsmQ7IAn2zss2FarDqCyJGxWLDcLeZ5fSScWHmFyEeC47r"
           "/pub?output=csv")
SIZE = "w1600"  # googleusercontent size hint — plenty for the lightbox
HERE = Path(__file__).resolve().parent
PHOTOS = HERE / "photos"
PAGE = HERE / "index.html"
SAMPLE_OPEN = '<script id="sampleCsv" type="text/plain">'


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def sized(link):
    """Swap the googleusercontent size suffix (=w3024-h1702-s-no-gm) for ours."""
    link = link.split("?")[0]
    base, eq, _ = link.rpartition("=")
    return f"{base}={SIZE}" if eq else f"{link}={SIZE}"


def to_jpeg(data, dest):
    """Write data to dest, converting via sips when it isn't already JPEG."""
    if data[:2] == b"\xff\xd8":
        dest.write_bytes(data)
        return
    tmp = dest.with_suffix(".tmp")
    tmp.write_bytes(data)
    try:
        subprocess.run(["sips", "-s", "format", "jpeg", str(tmp), "--out", str(dest)],
                       check=True, capture_output=True)
    except (subprocess.CalledProcessError, FileNotFoundError):
        dest.write_bytes(data)  # browsers sniff image type; extension mismatch is OK
    finally:
        tmp.unlink(missing_ok=True)


def refresh_sample(text):
    """Replace the page's embedded CSV with text. Returns True if it changed."""
    text = text.replace("\r\n", "\n").replace("\r", "\n").strip()
    if "</script" in text.lower():
        print("  sheet text contains </script — not embedding it")
        return False
    html = PAGE.read_text(encoding="utf-8")
    start = html.index(SAMPLE_OPEN) + len(SAMPLE_OPEN)
    end = html.index("</script>", start)
    if html[start:end].strip() == text:
        return False
    PAGE.write_text(html[:start] + text + html[end:], encoding="utf-8")
    return True


def main():
    force = "--force" in sys.argv
    push = "--push" in sys.argv
    PHOTOS.mkdir(exist_ok=True)

    sheet = fetch(CSV_URL).decode("utf-8")
    sample_changed = refresh_sample(sheet)
    rows = list(csv.DictReader(io.StringIO(sheet)))
    got, skipped, failed, nolink = [], [], [], []
    for row in rows:
        rid = (row.get("id") or "").strip()
        if not rid.isdigit():          # header-note row, blanks
            continue
        link = next((v.strip() for k, v in row.items()
                     if v and "http" in v and ("photo" in k.lower() or "link" in k.lower())), "")
        name = (row.get("name") or "").strip()
        if not link:
            nolink.append(f"{rid} {name}".strip())
            continue
        dest = PHOTOS / f"{int(rid):03d}.jpg"
        if dest.exists() and not force:
            skipped.append(dest.name)
            continue
        try:
            to_jpeg(fetch(sized(link)), dest)
            got.append(dest.name)
            print(f"  ↓ {dest.name}  {name}")
        except Exception as e:
            failed.append(f"{dest.name} ({e})")

    print(f"\ndownloaded {len(got)} · already had {len(skipped)} · "
          f"no link {len(nolink)} · failed {len(failed)}")
    if nolink:
        print("  no photo link yet:", ", ".join(nolink))
    if failed:
        print("  FAILED:", "\n          ".join(failed))
    print("embedded sample CSV:", "updated" if sample_changed else "already current")

    if push and (got or sample_changed) and not failed:
        subprocess.run(["git", "-C", str(HERE.parent), "add", str(PHOTOS), str(PAGE)], check=True)
        what = [f"{len(got)} photo(s)"] if got else []
        what += ["embedded CSV"] if sample_changed else []
        subprocess.run(["git", "-C", str(HERE.parent), "commit",
                        "-m", f"hands-of-vizchitra: sync {' + '.join(what)} from sheet"],
                       check=True)
        subprocess.run(["git", "-C", str(HERE.parent), "push"], check=True)
        print("pushed.")
    elif push and failed:
        print("not pushing — fix failures first.")
    elif push:
        print("nothing new to push.")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
