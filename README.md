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
