#!/bin/bash

# Build script for Chrome extension

echo "Building Chrome extension..."

# Build the Next.js app
npm run build

# Create extension directory
rm -rf extension
mkdir -p extension

# Copy the built files
cp -r out/* extension/

# Copy manifest and scripts
cp public/manifest.json extension/
cp public/background.js extension/
cp public/content.js extension/

# Copy icons if they exist
if [ -d "public/icons" ]; then
  cp -r public/icons extension/
fi

echo "Extension built successfully!"
echo "Load the 'extension' directory in Chrome to test the extension."
echo ""
echo "To load in Chrome:"
echo "1. Open chrome://extensions/"
echo "2. Enable 'Developer mode'"
echo "3. Click 'Load unpacked'"
echo "4. Select the 'extension' directory"
