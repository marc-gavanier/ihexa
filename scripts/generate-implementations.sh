#!/bin/bash
set -e

ENV="${ENV:-dev}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FEATURES_DIR="$SCRIPT_DIR/../src/features"

count=0

for impl_dir in "$FEATURES_DIR"/*/abilities/*/implementations; do
  [ -d "$impl_dir" ] || continue

  source_file="$impl_dir/index.$ENV.ts"
  target_file="$impl_dir/index.ts"

  if [ ! -f "$source_file" ]; then
    available=$(ls "$impl_dir"/index.*.ts 2>/dev/null | xargs -n1 basename | sed 's/index\.//;s/\.ts//' | tr '\n' ' ')
    echo "Error: $source_file not found. Available: $available" >&2
    exit 1
  fi

  cp "$source_file" "$target_file"
  count=$((count + 1))
done

echo "Copied index.$ENV.ts → index.ts for $count ability(ies)"
