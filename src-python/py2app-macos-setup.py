"""
Usage:
    `python setup.py py2app`
"""

from setuptools import setup

ENTRY_POINT = ['automating-slr.py']

DATA_FILES = [('index.html')]
OPTIONS = {
    'argv_emulation': False,
    'strip': True,
    #'iconfile': 'icon.icns', # uncomment to include an icon
    'includes': ['WebKit', 'Foundation', 'webview'],
}

setup(
    app=ENTRY_POINT,
    data_files=DATA_FILES,
    options={'py2app': OPTIONS},
    setup_requires=['py2app'],
)
