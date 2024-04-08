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

#### Warning for being marked as a virus:
When you build the binary/executable yourself by following the steps above, you will probably not encounter with any problems. If you try to share this executable with the people that use same OS&processor family(normally this is a very common and totally fine procedure), sometimes this executable could be marked as a virus by the other person's computer.  
Since bad people abused python scripts to build malware executables, anti-virus softwares mark the unsigned executables as a virus. (signing the code costs at least 100$). When you generate the executable if you have any kind of virus warning, please deactivate your "protection" against this executable.
If you encounter this problem, please add this executable as an exclusion from your anti-virus software (you can see the source code anyway, there is no threat).  

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

##### Things to be aware of
1. Changing theme(dark/light) during the work is going to re-render the DOM elements(the filled fields are going to be emptied). Please only change it before working on stuff.  
