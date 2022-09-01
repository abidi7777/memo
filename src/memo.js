export default function memo(fx) {
  if (typeof fx !== 'function') {
    throw new TypeError('Expected a function');
  }

  const cache = new Map();

  const cachedFn = (...args) => {
    const key = args.join('_');

    if (cache.has(key)) { return cache.get(key); }

    cache.set(key, fx.apply(this, args));

    return cache.get(key);
  };

  // eslint-disable-next-line no-underscore-dangle
  cachedFn.__cache__ = {
    get(...args) {
      const key = args.join('_');

      return cache.get(key);
    },
    has(...args) {
      const key = args.join('_');

      return cache.has(key);
    },
    delete(...args) {
      const key = args.join('_');

      cache.delete(key);

      return this;
    },
    clear() {
      cache.clear();

      return this;
    },
    size() {
      return cache.size;
    },
  };

  return cachedFn;
}

if (typeof window !== 'undefined') {
  window.$memo = memo;
}
