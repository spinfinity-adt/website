#!/bin/sh
# dev-only static server for previewing the site locally
cd /Users/aditi/Documents/website && exec /usr/bin/python3 -m http.server "${1:-8791}"
