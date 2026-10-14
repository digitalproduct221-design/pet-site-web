#!/bin/bash
# rend film-h et film-v en 4 morceaux parallèles chacun
cd "$(dirname "$0")"
FPS=30; N=$(python3 -c "import json,math;print(math.ceil(json.load(open('timeline.json'))['total']*30))")
for fmt in h v; do
  rm -rf frames/$fmt; mkdir -p frames/$fmt
  for k in 0 1 2 3; do
    a=$((N*k/4)); b=$((N*(k+1)/4)); port=$((9340+k))
    [ $fmt = v ] && port=$((9350+k))
    node render.mjs film-$fmt.html frames/$fmt $FPS $a $b $port &
  done
done
wait
echo "frames: $(ls frames/h | wc -l) $(ls frames/v | wc -l) / $N"
