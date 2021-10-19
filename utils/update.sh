#!/bin/bash

URL=$1

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
WORKDIR=`mktemp -d`

if [[ ! "$WORKDIR" || ! -d "$WORKDIR" ]]; then
  echo "Could not create temp dir"
  exit 1
fi

function cleanup {
  #rm -rf "$WORKDIR"
  rm "$DIR/dbparse.py" 2>/dev/null
}

trap cleanup EXIT

curl -L "$URL" | tar -xz - -C "$WORKDIR" --strip-components=1
if [ ! -f "$WORKDIR/dbparse.py" ]; then
  echo "Download or extraction failed. Check URL $URL"
  exit 1
fi
ln -s "$WORKDIR/dbparse.py" "$DIR/dbparse.py"
pushd "$WORKDIR"
pwd
python3 "$DIR/db2json.py" "$DIR/../regdb.json" "$WORKDIR/db.txt" 
popd
