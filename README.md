# Acknowledgement 

This work is an extention of the work of `Yunhai Zhang` that resides on https://github.com/zsf520/Automating_SLR. The code there is used in this repo for educational&research purposes only. 

# Setup 

1. Install pyinstaller following the instructions on `https://www.pyinstaller.org/en/stable/installation.html`

2. Use `pyinstaller --onefile index.py` to create a python binary.

3. Navigate to `src-python/dist` and copy the binary there into `src-tauri/binaries` and rename it to:
      `automating-slr-colaps-` + `output of following command for your operating system:`
    For Unix systems(Linux, MacOS, etc.):
      `rustc -Vv | grep host | cut -f2 -d' '`
    For Windows via Powershell:
      `rustc -Vv | Select-String "host:" | ForEach-Object {$_.Line.split(" ")[1]}`

As an example I have a linux system running and   `rustc -Vv | grep host | cut -f2 -d' '` gives me the output of `x86_64-unknown-linux-gnu`, so I renamed the binary to `automating-slr-colaps-x86_64-unknown-linux-gnu`  

4. Install tauri tools for your OS following the instructions:
    https://tauri.app/v1/guides/getting-started/prerequisites

5. Navigate to `automating-slr-colaps` and run `cargo tauri build` and wait for the binary to be generated. 

6. You can now keep that binary and use it for your OS&processor pair.
