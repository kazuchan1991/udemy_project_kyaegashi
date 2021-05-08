import collections


def chain_map():
    a = {'a': 'a', 'c': 'c', 'num': 0}
    b = {'b': 'b', 'c': 'cc'}
    c = {'b': 'bbb', 'c': 'ccc'}

    print(a)
    a.update(b)
    print(a)
    a.update(c)
    print(a)

    print('---- chain map ----')
    m = collections.ChainMap(a, b, c)
    print(m)
    print('--- m.maps --')
    print(m.maps)
    m.maps.reverse()
    print('--- m.maps.reverse()[0] ---')
    print(m.maps[0])
    m.maps.insert(0, {'c': 'cccc'})
    print('--- 0th insert ---')
    print(m.maps)

    del m.maps[0]
    print(m.maps)
    print('--- final m ---')
    print(m)
    print("m['c']: ", m['c'])


def default_dict():
    l = ['a', 'a', 'a', 'b', 'b', 'c']
    """
    d = {}
    for word in l:
        d.setdefault(word, 0)  # if word doesn't exist, set 0
        d[word] += 1
    print(d)
    """

    d = collections.defaultdict(int)
    for word in l:
        d[word] += 1
    print(d)

    d_set = collections.defaultdict(set)
    s = [('red', 1), ('blue', 2), ('red', 3), ('blue', 4), ('red', 1), ('blue', 4)]
    for k, v in s:
        d_set[k].add(v)
    print(d_set)


if __name__ in '__main__':
    # chain_map()
    default_dict()
