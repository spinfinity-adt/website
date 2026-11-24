// Science Sante faces — shared drawing code for every canvas on the page.
// Same rules as the p5 sketch: every size is a fraction of the face diameter D.
// Works in p5 instance mode, so the board and the "make yours" face can share it.

window.SSF = (function () {

  // ---------- the legend (Frame 19) ----------
  const COLOURS = {
    "orange": "#e36f25",      // Kitchen
    "light blue": "#53abe0",  // Garden/outdoors
    "yellow": "#f9dc4d",      // Public space
    "dark blue": "#4965af",   // Workplace/lab
    "red": "#ec494a",         // School/college
  };

  const HAT_FILES = {
    "beret": "svg/artist_beret.svg",
    "witch hat": "svg/scientist_witch_hat.svg",
    "mortarboard": "svg/educator_mortarboard.svg",
    "cap": "svg/student_cap.svg",
    "ribbed cap": "svg/figuring_it_out_ribbed_cap.svg",
  };

  // w = width (×D), bottom = hat's bottom edge from the face centre (×D), dx = nudge (×D)
  const HAT_FIT = {
    "beret":       { w: 1.05, bottom: -0.22, dx: 0.00 },
    "witch hat":   { w: 1.25, bottom: -0.22, dx: 0.05 },
    "mortarboard": { w: 1.30, bottom: -0.22, dx: 0.05 },
    "cap":         { w: 1.00, bottom: -0.24, dx: -0.09 },
    "ribbed cap":  { w: 1.25, bottom: -0.20, dx: 0.00 },
  };

  const TIE_FILES = { "particle": "svg/bowtie_particle.svg", "wave": "svg/bowtie_wave.svg" };
  const BOW_SIZE = 0.66; // every particle bow is the same size (× face size)

  // ---------- loading ----------
  async function load(p) {
    const A = { hats: {}, ties: {} };
    for (const k in HAT_FILES) A.hats[k] = await p.loadImage(HAT_FILES[k]);
    for (const k in TIE_FILES) A.ties[k] = await p.loadImage(TIE_FILES[k]);
    return A;
  }

  // ---------- googly eyes ----------
  // Each pupil rests somewhere random inside its eye (picked once) and can be knocked about:
  // it springs back to its resting spot with a little wobble, like a real googly eye.
  function makePupils() {
    const one = () => {
      const a = Math.random() * Math.PI * 2, d = 0.1 + Math.random() * 0.35;
      const rx = Math.cos(a) * d, ry = Math.sin(a) * d;
      return { rx, ry, x: rx, y: ry, vx: 0, vy: 0 };
    };
    return [one(), one()];
  }

  function stepPupils(f) {
    for (const q of f.pupils) {
      q.vx += (q.rx - q.x) * 0.08; q.vy += (q.ry - q.y) * 0.08 + 0.004; // spring home, a touch of gravity
      q.vx *= 0.86; q.vy *= 0.86;
      q.x += q.vx; q.y += q.vy;
      const m = Math.hypot(q.x, q.y), lim = 0.5;                        // stay inside the white
      if (m > lim) { q.x *= lim / m; q.y *= lim / m; q.vx *= -0.4; q.vy *= -0.4; }
    }
  }

  function nudge(f, vx, vy) {
    for (const q of f.pupils) { q.vx += vx * (0.7 + Math.random() * 0.6); q.vy += vy * (0.7 + Math.random() * 0.6); }
  }

  // ---------- one face ----------
  // Layer order, like the paper: face, tie, eyes, mouth, bits on the face, hats on top.
  function draw(p, A, f, x, y, D) {
    p.push();
    p.translate(x, y);
    p.rotate(p.radians(f.faceAngle || 0));   // a few faces were stuck on turned
    face(p, A, f, 0, 0, D);
    p.pop();
  }

  function face(p, A, f, x, y, D) {
    const BOW = D * BOW_SIZE, tdx = (f.tieDx || 0) * D, tdy = (f.tieDy || 0) * D;
    p.noStroke();
    p.fill(COLOURS[f.colour]);
    p.circle(x, y, D);

    if (f.tie === "wave" || f.tie === "both") wave(p, A, x + tdx, y + tdy, D);
    if (f.tie === "particle" || f.tie === "both") bow(p, A, x + tdx, y + D * 0.53 + tdy, BOW, 0);

    eyes(p, f, x, y, D);
    mouth(p, f, x, y, D);
    if (f.faceBow != null) bow(p, A, x, y + f.faceBow * D, BOW, 0);

    if (f.hat2) {
      const extra = f.hat2.split("+");
      extra.forEach((h, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        hat(p, A, h, x + side * D * 0.14, y - D * 0.04 * (i + 1), D, f.hatAngle || 0, side * 10);
      });
    }
    hat(p, A, f.hat, x, y + (f.hatDy || 0) * D, D, f.hatAngle || 0, f.hatSpin || 0);

    if (f.hatRibbon) hatRibbon(p, A, x, y, D, !!f.hatBow);
    if (f.hatBow === "top") bow(p, A, x, y - D * 0.68, BOW, 0);
    if (f.hatBow === "left") bow(p, A, x - D * 0.5, y - D * 0.42, BOW, -20);
    if (f.sideBow) { const s = f.sideBow === "left" ? -1 : 1; bow(p, A, x + s * D * 0.54, y - D * 0.15, BOW, s * 70); }
    if (f.sideRibbon) sideRibbon(p, A, f.sideRibbon, x, y, D);
  }

  function wave(p, A, x, y, D) {
    const img = A.ties.wave, w = D * 0.75, h = w * img.height / img.width;
    p.image(img, x - w * 0.2, y + D * 0.46 - h * 0.12, w, h);
  }

  function bow(p, A, x, y, w, angle) {
    const img = A.ties.particle, h = w * img.height / img.width;
    p.push(); p.translate(x, y); p.rotate(p.radians(angle));
    p.image(img, -w / 2, -h / 2, w, h);
    p.pop();
  }

  function eyes(p, f, x, y, D) {
    if (f.eyes === "none") return;
    const cx = x + (f.eyesDx || 0) * D, cy = y - D * 0.1, gap = 0.17 * (f.eyeGap || 1);
    let list;
    if (f.eyes === "one eye") list = [{ d: 0, r: D * 0.13 }];
    else if (f.eyes === "mixed") list = [{ d: -gap, r: D * 0.10 }, { d: gap, r: D * 0.155 }];
    else { const r = f.eyes === "big" ? D * 0.155 : D * 0.11; list = [{ d: -gap, r }, { d: gap, r }]; }

    const a = p.radians(f.eyesAngle || 0);
    list.forEach((e, i) => {
      const ex = cx + Math.cos(a) * e.d * D, ey = cy + Math.sin(a) * e.d * D, r = e.r;
      // plastic googly eye: darker outer edge, then a lighter inner rim
      p.stroke(175); p.strokeWeight(D * 0.012); p.fill(255); p.circle(ex, ey, r * 2);
      p.noFill(); p.stroke(228); p.strokeWeight(D * 0.018); p.circle(ex, ey, r * 1.68);
      p.noStroke(); p.fill(20);
      const q = f.pupils[i];
      p.circle(ex + q.x * r, ey + q.y * r, r);
    });
  }

  function mouth(p, f, x, y, D) {
    if (f.mouth === "none" || f.mouth === "other") return;
    p.push();
    p.translate(x + D * 0.04, y + D * 0.2 + (f.mouthDy || 0) * D);
    p.rotate(p.radians(f.mouthAngle || 0));
    p.noStroke(); p.fill(20);
    if (f.mouth === "oval") p.ellipse(0, 0, D * 0.26, D * 0.34);
    else if (f.mouth === "half-moon") p.arc(0, -D * 0.06, D * 0.36, D * 0.36, 0, p.PI, p.CHORD);
    else {
      // smile (a frown when turned 180°): black half-circle with a face-coloured bite taken out
      p.arc(0, -D * 0.08, D * 0.4, D * 0.3, 0, p.PI, p.CHORD);
      p.fill(COLOURS[f.colour]);
      p.arc(0, -D * 0.08 - 1, D * 0.42, D * 0.18, 0, p.PI, p.CHORD);
    }
    p.pop();
  }

  // angle = turned around the face centre; spin = turned around the hat's own centre
  function hat(p, A, name, x, y, D, angle, spin) {
    const img = A.hats[name], fit = HAT_FIT[name], w = D * fit.w, h = w * img.height / img.width;
    p.push();
    p.translate(x, y); p.rotate(p.radians(angle));
    p.translate(D * fit.dx, D * fit.bottom - h / 2); p.rotate(p.radians(spin));
    p.image(img, -w / 2, -h / 2, w, h);
    p.pop();
  }

  function hatRibbon(p, A, x, y, D, withBow) {
    const img = A.ties.wave, w = D * 0.5, h = w * img.height / img.width;
    p.push(); p.translate(x + D * (withBow ? 0.2 : 0.05), y - D * 0.6); p.rotate(p.radians(-30));
    p.image(img, -w * 0.3, -h / 2, w, h);
    p.pop();
  }

  function sideRibbon(p, A, side, x, y, D) {
    const img = A.ties.wave, w = D * 0.55, h = w * img.height / img.width, s = side === "left" ? -1 : 1;
    p.push(); p.translate(x + s * D * 0.42, y - D * 0.2); p.rotate(p.radians(s * 40));
    p.image(img, -w * 0.15, -h * 0.3, w, h);
    p.pop();
  }

  return { COLOURS, load, draw, makePupils, stepPupils, nudge };
})();
