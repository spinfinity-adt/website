#!/bin/sh
# dev-only static server for the wedding-cards project (lives outside this repo)
cd /Users/aditi/Documents/wedding-cards && exec /usr/bin/python3 -m http.server "${1:-8787}"
