import contextlib


def job():
    try:
        print('do something')
        raise Exception('error')
        return True
    except Exception:
        return False


def cleanup_1():
    print('1st cleanup')


def cleanup_2():
    print('2nd cleanup')


with contextlib.ExitStack() as stack:
    stack.callback(cleanup_1)
    stack.callback(cleanup_2)

    @stack.callback
    def cleanup_3():
        print('3rd cleanup')

    is_ok = job()
    print('do more tasks')

    # do nothing when is_ok == True
    if is_ok:
        stack.pop_all()
