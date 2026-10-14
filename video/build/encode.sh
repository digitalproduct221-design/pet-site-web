#!/bin/bash
set -e
V="scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p"
C="-color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709"
for f in h v; do
  ffmpeg -v error -y -framerate 30 -i frames/$f/f%05d.png -i mix.wav -map 0:v -map 1:a -vf "$V" $C -c:v libx264 -preset slow -crf 16 -c:a aac -b:a 256k -movflags +faststart out/master-$f.mp4
done
ffmpeg -v error -y -framerate 30 -i frames/h/f%05d.png -i mix.wav -map 0:v -map 1:a -vf "$V" $C -c:v libx264 -preset slow -crf 25 -profile:v high -level 4.1 -maxrate 3M -bufsize 6M -c:a aac -b:a 128k -movflags +faststart ../../public/video/pet-presentation.mp4
