import zmq

context = zmq.Context()
# pull
#sock = context.socket(zmq.PULL)
# subscribe
sock = context.socket(zmq.SUB)
sock.setsockopt(zmq.SUBSCRIBE, b'sub1:')
sock.connect("tcp://127.0.0.1:5690")

while True:
    message = sock.recv()
    print("Recieved: {}".format(message.decode()))
