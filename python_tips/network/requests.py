import urllib.request
import urllib.parse
import json
import requests

BASE_GET_URL = 'http://httpbin.org/get'
BASE_POST_URL = 'http://httpbin.org/post'

method = 'POST'
payload = {'key1': 'val1', 'key2': 'val2'}

if len(payload) != 0 and method == 'GET':
    url = BASE_GET_URL + '?' + urllib.parse.urlencode(payload)
elif method == 'POST':
    url = BASE_POST_URL
else:
    url = BASE_GET_URL

"""
# get
with urllib.request.urlopen(url) as f:
    res = json.loads(f.read().decode())
    print(res)
"""

# post
payload = json.dumps(payload).encode()
req = urllib.request.Request(
    url,
    data=payload,
    method='POST'
)
with urllib.request.urlopen(req) as f:
    res = json.loads(f.read().decode())
    print(res)


# ------- requests ---------
