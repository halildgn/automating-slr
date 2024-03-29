# Acknowledgement 

This work is an extention of the work of `Yunhai Zhang` that resides on https://github.com/zsf520/Automating_SLR. The code there is used in this repo for educational&research purposes only. 

# Setup 

1. Make sure that you have python3 installed and it is on your `PATH` 

2. For next steps use powershell in windows and your standard terminal in Linux&MacOS

3. Install pyinstaller with `pip install pyinstaller`

4. Clone the repo 

5. Navigate to `automating-slr/src-python` directory   

6. Run the following to generate the binary for your OS&processor :

### Windows:

```
pip install pyinstaller ; pip install -r requirements.txt ; pyinstaller --add-data="index.html;." --noconsole --onefile automating-slr.py
```

### Linux and MacOS:

```
pip install pyinstaller && pip install -r requirements.txt && pyinstaller --add-data="index.html:." --noconsole --onefile automating-slr.py
```

7. The generated binary should now be placed in the `automating-slr/src-python/dist`. You can now use this binary to launch the application without having to perform any additional steps(You can also distribute it to other machines with same OS&processor family but please see the warnings section below). 

#### Warning for being marked as a virus:
Since bad people abused python scripts to build malware executables, anti-virus softwares mark the unsigned executables as a virus. (signing the code costs at least 100$). When you generate the executable if you have any kind of virus warning, please deactivate your "protection" against this executable.
If you encounter this problem, please add this executable as an exclusion from your anti-virus software (you can see the source code anyway, there is no threat).  

#### The worst case if things dont work out for you:
Please navigate to `automating-slr/src-pyton` and launch the application via `python3 automating-slr.py`
