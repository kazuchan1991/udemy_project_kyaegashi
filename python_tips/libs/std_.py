import sys
import logging
import contextlib

#x = input('Enter: ')
# print(x)

# stdin
# for line in sys.stdin:
#    print(line)

# stdout
# sys.stdout.write('hello')

# logging
with open('stdout.log', 'w') as f:
    with contextlib.redirect_stdout(f):
        print('Hello!')

# stderr
# logging.error('error')
# sys.stderr.write('error')

with open('stderr.log', 'w') as f:
    with contextlib.redirect_stderr(f):
        logging.error('Error!')
