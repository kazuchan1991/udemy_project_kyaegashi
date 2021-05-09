import socket

# tcp
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect(('127.0.0.1', 50007))
    s.sendall(b'hello')
    data = s.recv(1024)
    print(repr(data))

"""
# udp
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
    s.sendto(b'hello UDP', ('127.0.0.1', 50007))
"""
