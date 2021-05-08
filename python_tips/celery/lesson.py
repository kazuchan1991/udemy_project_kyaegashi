import test
import tasks

# --- async ----

# test
#result = test.add.delay(1, 2)

# single task
#result = tasks.build_server.delay()

# multiple tasks
#result = tasks.build_servers.delay()

# callback after all tasks
# !need backend configure
#result = tasks.build_servers_with_cleanup.delay()

# chain
result = tasks.deploy_customer_server.delay()


# --- sync ----
#result = tasks.build_server()

print('doing..')
print(result)
