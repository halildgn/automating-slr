# Acknowledgement 

This work is an extention of the work of `Yunhai Zhang` that resides on https://github.com/zsf520/Automating_SLR. The code there is used in this repo for educational&research purposes only. 

# Remark 

Queries that are generated for `scopus` and `ebsco` libraries are quick prototypes and they haven't been tested during `Yunhai Zhang`'s research.

# Introduction 

<video width="320" height="240" controls>
<source src="https://drive.google.com/file/d/14ftPF3AKGU2_TITwsdPz4_aWJmUQOdDb/preview" type="video/mp4">
Your browser does not support the video tag.
</video>

# Installing dependencies:

1. Install `git`, `python3` and `pip` (Even if it is already installed, it is strongly recommended to upgrade to at least`python 3.12`) and make sure that they on your `PATH` or in Windows jargon they are added to the `environment variables`(meaning that you can execute `python` and `pip` related commands from your bash terminal or powershell(in case of Windows))

2. For next steps use `Git Bash`(already installed with `git`, you can paste commands via right clicking and clicking on paste, `ctrl+v` wouldn't work) in Windows and your standard bash terminal in Linux&MacOS

3. Clone the repository(via `git clone https://gitlab.com/halildgn/automating-slr.git`) 

4. Navigate to `automating-slr/src-python` via `cd automating-slr/src-python` 

5. Copy and run the following command to install the dependencies:

* Important Note: Sometimes using `eduroam` causes problems while cloning a git repository or installing python packages. If you encounter such problem, please execute following commands while using your private network.

### Windows:

```
py -m pip install -r requirements.txt && py -m playwright install --with-deps chrome
```

### MacOS and Linux:

```
python3 -m pip install -r requirements.txt && python3 -m playwright install --with-deps chrome
```

# Running the App
After installing the dependencies, in `automating-slr/src-python` run via `py automating-slr.py` on Windows and via `python3 automating-slr.py` on MacOS&Linux

# Configuration

* Your theme preference and build configurations are managed by `pickledDB` and stored in `automating-slr/src-python/config.db`. In case of switching over to other machines in the future, you can still enjoy your existing builds by placing this `config.db` file from old computer in the new computer's `automating-slr/src-python` directory. 

# Backup Option/Last Resort

If you had problems while running the GUI with `webui2` or you would like to launch the GUI inside your webbrowser, you import the `webbrowser` module(it is included in python by default, no need to install) and change the `main` of `src-python/automating-slr.py` as following: 
```python
import webbrowser
```
```python
if __name__ == '__main__':
#   needed when freezing the app:
#   multiprocessing.freeze_support()
    frontend = cast(str,resource_path("index.html"))
    server_process = multiprocessing.Process(target=spin_up_server) 
    server_process.start()
    webbrowser.open(frontend, new=1 , autoraise=True )
```

# To make the app deployable
1. Adjust the content of `main` with the following and in the python modules, instead of directly saving files to the remote server(since the server is going to run on another computer, we don't want to save files to that computer but we would like retrieve them instead), send those back to the client as response.
2. Adjust the content of the frontend, so that the response from the server(the file) is saved, also instead of making use of server to manage the builds&theme-preference, use `localStorage` instead(since we don't want to save our configs to the remote server) -> see the commit [here](https://gitlab.com/halildgn/automating-slr/-/commit/1470e149c61a5f2de333010586fe5efcd638382a) 
3. Deploy the server via vm or container and deploy the frontend(static html) to some static site hosting service like "gitlab pages".  
```python
if __name__ == '__main__':
    server_process = multiprocessing.Process(target=spin_up_server) 
    server_process.start()
```

# For possible development cycles in the future
* Install `NVM(node version manager)`:
[Windows](https://github.com/coreybutler/nvm-windows)
[Linux and MacOS](https://nodejs.org/en/download/package-manager)
* Install `node` version `21.7.1` by using `nvm install 21.7.1` and set the version by `nvm use 21.7.1`
* In `automating-slr`, install the packages via `npm install --legacy-peer-deps`
* To build, in `automating-slr`: `npm run build`(generates the standalone `html` in `automating-slr/src-python` which is going to be used while generating the binary)
* To spin up a frontend development server, in `automating-slr`: `npm run dev` 
* To spin up the flask server, comment out the following lines before running the `automating-slr.py` script with `py automating-slr.py` on Windows and `python3 automating-slr.py` on MacOS&Linux:
```python
if __name__ == '__main__':
#   needed when freezing the app:
#   multiprocessing.freeze_support()
#   frontend = cast(str,resource_path("index.html"))
    server_process = multiprocessing.Process(target=spin_up_server) 
    server_process.start()
#   app_window = webui.window()
#   app_window.show(frontend)
```
