#!/bin/bash
# Diese Script braucht 1 Argument (Path zu dem Ordner)
DIR=$1

for pathfile in $DIR/*.RW2; do
    
    fname_ext="${pathfile##*/}"
    echo "$fname_ext to jpg"
    fname="${fname_ext%.*}"
    outName="$DIR/$fname.jpg"
    dcraw -c $pathfile | cjpeg > $outName
done