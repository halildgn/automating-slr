# Acknowledgement 

This work is an extention of the work of `Yunhai Zhang` that resides on https://github.com/zsf520/Automating_SLR. The code there is used in this repo for educational&research purposes only. 

# Setup 

1. Make sure that you have python3 installed and it is on your `PATH` 

2. For next steps use powershell in windows and your standard terminal in Linux&MacOS

3. Clone the repo 

4. Navigate to `automating-slr/src-python` directory   

5. Run the following to generate the binary for your OS&processor :

### Windows:

```
pip3 install -r requirements.txt ; pyinstaller --add-data="index.html;." --noconsole --onefile automating-slr.py
```

### Linux:

```
pip3 install -r requirements.txt && pyinstaller --add-data="index.html:." --noconsole --onefile automating-slr.py
```

### MacOS:

```
pip3 install -r requirements.txt && python3 py2app-macos-setup.py py2app
```

6. The generated binary should now be placed in the `automating-slr/src-python/dist`. You can now use this binary to launch the application without having to perform any additional steps(You can also distribute it to other machines with same OS&processor family but please see the warnings section below). 

#### Warning for being marked as a virus:
When you build the binary/executable yourself by following the steps above, you will probably not encounter with any problems. If you try to share this executable with the people that use same OS&processor family(normally this is a very common and totally fine procedure), sometimes this executable could be marked as a virus by the other person's computer.  
Since bad people abused python scripts to build malware executables, anti-virus softwares mark the unsigned executables as a virus. (signing the code costs at least 100$). When you generate the executable if you have any kind of virus warning, please deactivate your "protection" against this executable.
If you encounter this problem, please add this executable as an exclusion from your anti-virus software (you can see the source code anyway, there is no threat).  

#### The worst case if things dont work out for you:
Please navigate to `automating-slr/src-pyton` and launch the application via `python3 automating-slr.py`

# For the possible future development cycles
* Install `nodejs`
* In `automating-slr`, install the packages via `npm install`
* To spin up a development server, in `automating-slr`: `npm run dev` 
* To build, in `automating-slr`: `npm run build`(generates a standalone `html` in `automating-slr/src-python`
