import contextlib


@contextlib.contextmanager
def tag(name):
    print('<{}>'.format(name))
    yield
    print('</{}>'.format(name))


class Tag(contextlib.ContextDecorator):
    def __init__(self, name):
        self.name = name
        self.start_tag = '<{}>'.format(name)
        self.end_tag = '</{}>'.format(name)

    def __enter__(self):
        print(self.start_tag)

    def __exit__(self, exc_type, exc_value, exc_tb):
        #print(exc_type, exc_value, exc_tb)
        print(self.end_tag)


@tag('h2')
def f(content):
    print(content)


def g():
    print('--- func g() ----')
    with tag('h2'):
        print('test')


if __name__ == '__main__':

    """
    with tag('h2'):
        print('test')
    """

    # contextmanager
    # f('test')
    # g()

    # contextDecorator
    with Tag('h2'):
        #raise Exception('error')
        print('test')
