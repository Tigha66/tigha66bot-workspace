#!/bin/bash
# Generate QR codes for all 10 websites

websites=(
  "https://minty-moment-bq3v.here.now/"
  "https://orchid-zephyr-jbwx.here.now/"
  "https://lunar-moment-bqte.here.now/"
  "https://russet-quasar-s3hq.here.now/"
  "https://chilly-marsh-tx9e.here.now/"
  "https://bold-cipher-vxhv.here.now/"
  "https://waxen-ginger-3wga.here.now/"
  "https://brave-trellis-jtvw.here.now/"
  "https://misty-cedar-afph.here.now/"
  "https://emerald-quiche-4g6d.here.now/"
)

names=(
  "rcj-cleaning"
  "victorias-housekeeping"
  "cotton-brothers"
  "mh-mechanic"
  "dog-ipanema"
  "emilys-maids"
  "alex-auto"
  "titos-grooming"
  "bubbles-grooming"
  "dokis-grooming"
)

for i in "${!websites[@]}"; do
  url="${websites[$i]}"
  name="${names[$i]}"
  echo "Generating QR for $name..."
  curl -s "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=$url" -o "${name}-qr.png"
done

echo "✅ All 10 QR codes generated!"
