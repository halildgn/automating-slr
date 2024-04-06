import os
import py2app
import shutil

from distutils.core import setup

if os.path.exists('build'):
    shutil.rmtree('build')

if os.path.exists('dist/automating-slr.app'):
    shutil.rmtree('dist/automating-slr.app')

ENTRY_POINT = ['automating-slr.py']

DATA_FILES = ['index.html']
OPTIONS = {
    'argv_emulation': False,
    'strip': False,
    'iconfile': 'colaps.ico',
    'packages': ['WebKit', 'Foundation', 'webview'],
    'plist': {
        'NSRequiresAquaSystemAppearance': False
    },
    'resources': DATA_FILES
}

setup(
    app=ENTRY_POINT,
    options={'py2app': OPTIONS},
    setup_requires=['py2app'],
)
