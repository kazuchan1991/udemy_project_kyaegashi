import time
from celery import Celery

app = Celery(
    'tasks',
    broker='amqp://guest@localhost//'
)


@app.task
def add(x, y):
    print('10sec needed')
    time.sleep(10)
    return x + y
