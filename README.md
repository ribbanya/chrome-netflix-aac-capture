# Netflix AAC Capture Chrome Extension
Downloads AAC audio files directly from Netflix.

## Installation
1. Get the [latest release](https://github.com/ribbanya/chrome-netflix-aac-capture/releases).
1. Extract the zip somewhere permanent.
1. Click the … at the top right of Chrome.
1. Go to "More tools" > "Extensions."
1. Enable Developer Mode using the switch in the top right.
1. Click "Load unpacked" in the top left.
1. Select the folder you extracted the zip to, which contains `manifest.json`.
1. Close or refresh Netflix.

## Usage
1. With Netflix focused, open DevTools with `F12` or `Ctrl-Shift-I`.
1. Click on "Netflix AAC Capture" in the list of tabs at the top (you may need to click ≫ on the right).
1. Seek around in the show or watch it until links show up.
1. Click to download, or right click and "save as."
   - Note: due to Chrome security policies, you'll have to name the file yourself.
1. The files are [AAC](https://en.wikipedia.org/wiki/Advanced_Audio_Coding) in an [M4A](https://en.wikipedia.org/wiki/MPEG-4_Part_14#Filename_extensions) container, so use the `.m4a` extension.

## FAQ
1. Why does this need to be in the DevTools menu?
   - [It's the only way to see what Netflix is downloading](https://stackoverflow.com/a/18446617/5880994).
