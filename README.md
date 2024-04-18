# Acknowledgement 

This work is an extention of the work of `Yunhai Zhang` that resides on https://github.com/zsf520/Automating_SLR. The code there is used in this repo for educational&research purposes only. 

# Short Demo

[Video](https://drive.google.com/file/d/1vioJWOljcYnq2YBTflH1gs0jA5Kh6C_W/view)

Defects like usage of `Newest available entry is from` instead of `Oldest available entry is from` (`10:08`) and there should had been an error displayed at `13:55` 

# Setup 

Note: You need to perform steps below only once, after that you can just use the generated executable to launch the application. You can move this executable to some other location in your computer and remove the repository if you are not going to develop the application further.  

1. Install `python3` and make sure that it is on your `PATH`(Even if it is already installed, please upgrade it to the latest version) 

2. For next steps use powershell in windows and your standard terminal in Linux&MacOS

3. Clone the repository 

4. Navigate to `automating-slr/src-python` directory   

5. Copy and run the following command to generate the binary for your OS&processor :

* Important Note: Sometimes using `eduroam` causes problems while cloning a git repository or installing python packages. If you encounter such problem, please execute following commands while using your private network.

## If you have chrome browser NOT installed and you want to use "Download" functionality:

### Windows:

```
pip3 install -r requirements.txt ; playwright install --with-deps chrome; pyinstaller --add-data="index.html;." --icon=colaps.ico --noconsole --onefile automating-slr.py
```

### Linux:

```
pip3 install -r requirements.txt && playwright install --with-deps chrome && pyinstaller --add-data="index.html:." --noconsole --onefile automating-slr.py
```

### MacOS:

```
pip3 install -r requirements.txt && playwright install --with-deps chrome && python3 py2app-macos-setup.py py2app
```

## If you have chrome browser already installed or you dont want to use "Download" functionality: 

### Windows:

```
pip3 install -r requirements.txt ; pyinstaller --add-data="index.html;." --icon=colaps.ico --noconsole --onefile automating-slr.py
```

### Linux:

```
pip3 install -r requirements.txt && pyinstaller --add-data="index.html:." --noconsole --onefile automating-slr.py
```

### MacOS:

```
pip3 install -r requirements.txt && python3 py2app-macos-setup.py py2app
```

6. The generated binary should now be placed in the `automating-slr/src-python/dist`. You can now use this binary to launch the application without having to perform any additional steps. 

# Configuration

* Your theme preference and build configurations are managed by `pickledDB` and stored in your home directory, in a file called `automating-slr-config.db`. In case of switching over to other machines in the future, you can still enjoy your existing builds by placing this file in that machine's home directory. 

# For possible development cycles in the future
* Install `NVM(node version manager)`:
[Windows](https://github.com/coreybutler/nvm-windows)
[Linux and MacOS](https://nodejs.org/en/download/package-manager)
* Install `node` version `21.7.1` by using `nvm install 21.7.1` and set the version by `nvm use 21.7.1`
* In `automating-slr`, install the packages via `npm install --legacy-peer-deps`
* To build, in `automating-slr`: `npm run build`(generates the standalone `html` in `automating-slr/src-python` which is going to be used while generating the binary)
* To spin up a frontend development server, in `automating-slr`: `npm run dev` 
* To spin up the flask server, comment out the following lines before running the `automating-slr.py` script with `python3 automating-slr.py`:
```python
if __name__ == '__main__':
    # multiprocessing.freeze_support()
    # frontend = resource_path("index.html")
    server_process = multiprocessing.Process(target=spin_up_server) 
    server_process.start()
    # webview.create_window('Automating SLR', frontend, fullscreen=True)
    # webview.start()
    # server_process.terminate()
```
