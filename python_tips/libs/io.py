import io
import requests
import zipfile

f = io.StringIO()
#f = io.BytesIO()
f.write('string io')
# f.write(b'string io')
f.seek(0)  # 先頭へ
print(f.read())  # string io


# read zip file
f = io.BytesIO()
url = 'https://drive.google.com/file/d/1qRibiuruk3u3dv531N5iHazkdzsmoxi6/view?usp=sharing'
res = requests.get(url)
f.write(res.content)
f.seek(0)
print(f.read().decode())
