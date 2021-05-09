import urllib.request
import urllib.parse
import json
import requests

BASE_GET_URL = 'http://httpbin.org/get'
BASE_POST_URL = 'http://httpbin.org/post'
BASE_PUT_URL = 'http://httpbin.org/put'
BASE_DELETE_URL = 'http://httpbin.org/delete'


def main(lib, method):
    payload = {'key1': 'val1', 'key2': 'val2'}
    if lib == 'urllib':
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
    elif lib == 'requests':
        # get
        #r = requests.get(BASE_GET_URL, params=payload)
        # post
        r = requests.post(BASE_POST_URL, data=payload, timeout=1.0)
        # put
        #r = requests.put(BASE_PUT_URL, data=payload)
        # delete
        #r = requests.delete(BASE_DELETE_URL, data=payload)
        print(r.status_code)  # 200: success
        print(r.text)
        print(r.json())


if __name__ == '__main__':
    main(lib='requests', method='POST')
