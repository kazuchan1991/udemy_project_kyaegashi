import time
import random

import celery


app = celery.Celery(
    'tasks',
    broker='amqp://guest@localhost//',
    # backend='amqp://guest@localhost//'
)


@app.task
def build_server():
    print('need 10 sec to complete')
    time.sleep(10)
    server_id = random.randint(1, 100)
    print('setup server success for {}'.format(server_id))
    return server_id


@app.task
def build_servers():
    g = celery.group(build_server.s() for _ in range(3))
    return g()


@app.task
def callback(result):
    for server_id in result:
        print(server_id)
    print('cleanup..')
    time.sleep(3)
    return 'done all'


@app.task
def build_servers_with_cleanup():
    c = celery.chord(
        (build_server.s() for _ in range(3)), callback.s())
    return c()


@app.task
def setup_dns(server_id):
    print('setup dns for {}'.format(server_id))
    time.sleep(3)
    return 'done for {}'.format(server_id)


@app.task
def deploy_customer_server():
    chain = build_server.s() | setup_dns.s()
    return chain()
