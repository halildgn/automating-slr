# Acknowledgement 

This work is an extention of the work of `Yunhai Zhang` that resides on https://github.com/zsf520/Automating_SLR. The code there is used in this repo for educational&research purposes only. 

# Short Demo

[Video](https://drive.google.com/file/d/1vioJWOljcYnq2YBTflH1gs0jA5Kh6C_W/view)

Defects like usage of `Newest available entry is from` instead of `Oldest available entry is from` (`10:08`) and there should had been an error displayed at `13:55` 

# Installing dependencies:


1. Install `python3` and `pip` (Even if it is already installed, please upgrade it to the at least `python 3.12`) and make sure that they on your `PATH` or in Windows jargon they are added to the `environment variables`(meaning that you can execute `python` and `pip` related commands from your bash terminal or powershell(in case of Windows))

2. For next steps use powershell in Windows and your standard bash terminal in Linux&MacOS

3. Clone the repository(via `git clone https://gitlab.com/halildgn/automating-slr.git`) 

4. Navigate to `automating-slr/src-python` -> via `cd .\automating-slr\src-python\` on Windows powershell and via `cd automating-slr/src-python` on Linux&MacOS 

5. Copy and run the following command to install the dependencies:

* Important Note: Sometimes using `eduroam` causes problems while cloning a git repository or installing python packages. If you encounter such problem, please execute following commands while using your private network.

## If you have chrome browser NOT installed and you want to use "Download" functionality:

### Windows:

```
py -m pip install -r requirements.txt; py -m playwright install --with-deps chrome
```

### MacOS:

```
python3 -m pip install -r requirements.txt && python3 -m playwright install --with-deps chrome
```

### Linux:

```
python3 -m pip install -r requirements.txt && python3 -m playwright install --with-deps chrome
```

## If you have chrome browser already installed or you dont want to use "Download" functionality: 

### Windows:

```
py -m pip install -r requirements.txt
```

### MacOS:

```
python3 -m pip install -r requirements.txt
```

### Linux:

```
python3 -m pip install -r requirements.txt
```

# Configuration

* Your theme preference and build configurations are managed by `pickledDB` and stored in `automating-slr/src-python/config.db`. In case of switching over to other machines in the future, you can still enjoy your existing builds by placing this `config.db` file from old computer in the new computer's `automating-slr/src-python` directory. 

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
