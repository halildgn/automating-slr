# Acknowledgement 

This work is an extention of the work of `Yunhai Zhang` that resides on https://github.com/zsf520/Automating_SLR. The code there is used in this repo for educational&research purposes only. 

# Setup 

1. Make sure that you have python3 installed

2. For next steps use powershell in windows and your standard terminal in Linux&MacOS

3. Install pyinstaller with `pip install pyinstaller`

4. Clone the repo 

5. Navigate to `automating-slr/src-python` directory   

6. Run the following to generate the binary for your OS&processor :

### Windows:

```
pip install -r requirements.txt ; pyinstaller --add-data="index.html;." --noconsole --onefile automating-slr.py
```

or 

```
pip install -r requirements.txt && pyinstaller --add-data="index.html;." --noconsole --onefile automating-slr.py
```

### Linux and MacOS:

```
pip install -r requirements.txt && pyinstaller --add-data="index.html:." --noconsole --onefile automating-slr.py
```

7. The generated binary should now be placed in the `automating-slr/src-python/dist`  

#### Warning for Windows users:
Virus programs mark pretty much all unsigned executables as virus

Recently microsoft started flagging pretty much all unsigned executables as virus(signing the code costs at least 100$). When you generate the executable if you have any kind of virus warning, please deactivate your "protection" against this executable.
Please see the [Example](https://answers.microsoft.com/en-us/windows/forum/all/windows-defender-thinks-my-exe-file-is-a-virus/6f2562f3-772d-4696-bc29-43dbac8185f2)

1. If you build the exe in your machine from the source code by following the instructions above, the generated binary(exe) is probably not going to be marked as a virus. However , if you try to transfer the binary to other windows machines(normally this is the purpose of the compilation, code is compiled once for the OS&Processor family pair and you can just run it on other computers, since almost all windows machines have x86-64 , it would normally run on all of them without needing to perform the steps above for every machine after compiling once) it is probably flagged as a virus.

[Again, how to disable the windows antivirus](https://support.microsoft.com/en-us/windows/add-an-exclusion-to-windows-security-811816c0-4dfd-af4a-47e4-c301afe13b26#:~:text=Go%20to%20Start%20%3E%20Settings%20%3E%20Update,%2C%20file%20types%2C%20or%20process)


You could also go to https://www.microsoft.com/en-us/wdsi/filesubmission , submit your file(s), and choose "Incorrectly detected" as you do. They may just whitelist your specific submission, but hopefully it also nudges future iterations of the machine learning model in the right direction.


Since too many users made malware by freezing(making executable) python via tools that compile python code into exe, virus programs often detect them as such.

#### MACOS: 
Users will need to disable gatekeeper functionality in System Preferences in order to run unsigned apps.
