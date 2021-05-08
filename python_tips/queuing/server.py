# pip install zmq
import time

import zmq


context = zmq.Context()
# push
#sock = context.socket(zmq.PUSH)
# publish
sock = context.socket(zmq.PUB)
sock.bind("tcp://127.0.0.1:5690")

id = 0
while True:
    id += 1
    sock.send(("sub1:" + str(id)).encode())
    print("Sent: {}".format(id))
    time.sleep(1)
