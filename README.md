# Acknowledgement 

This work is an extention of the work of `Yunhai Zhang` that resides on https://github.com/zsf520/Automating_SLR. The code there is used in this repo for educational&research purposes only. 

# Setup 

1. Install `python3` and make sure that it is on your `PATH`(Even if it is already installed, please update it to the latest version) 

2. For next steps use powershell in windows and your standard terminal in Linux&MacOS

3. Clone the repository 

4. Navigate to `automating-slr/src-python` directory   

5. Run the following to generate the binary for your OS&processor :

### Windows:

```
pip3 install -r requirements.txt ; playwright install --with-deps chromium; pyinstaller --add-data="index.html;." --icon=colaps.ico --noconsole --onefile automating-slr.py
```

### Linux:

```
pip3 install -r requirements.txt && playwright install --with-deps chromium && pyinstaller --add-data="index.html:." --noconsole --onefile automating-slr.py
```

### MacOS:

```
pip3 install -r requirements.txt && playwright install --with-deps chromium && python3 py2app-macos-setup.py py2app
```

6. The generated binary should now be placed in the `automating-slr/src-python/dist`. You can now use this binary to launch the application without having to perform any additional steps(You can also distribute it to other machines with same OS&processor family but please see the warnings section below). 

# Configuration

* Your theme preference and build configurations are managed by `pickledDB` and stored in your home directory, in a file called `automating-slr-config.db`. In case of switching over to other machines in the future, you can still enjoy your existing builds by placing this file in that machine's home directory. 

# For possible development cycles in the future
* Install `nodejs`
* In `automating-slr`, install the packages via `npm install`
* To build, in `automating-slr`: `npm run build`(generates the standalone `html` in `automating-slr/src-python` which is going to be used while generating the binary)
* To spin up a frontend development server, in `automating-slr`: `npm run dev` 
* To spin up the flask server, comment out the following lines before running the `automating-slr.py` script:
```python
if __name__ == '__main__':
    # multiprocessing.freeze_support()
    # frontend = resource_path("index.html")
    server_process = multiprocessing.Process(target=spin_up_server) 
    server_process.start()
    # webview.create_window('Automating SLR', frontend, resizable=True)
    # webview.start()
    # server_process.terminate()
```
