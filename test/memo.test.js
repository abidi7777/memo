/* eslint-disable no-underscore-dangle */

import sinon from 'sinon';

import $memo from '../src/memo';

QUnit.module('$memo');

QUnit.test('should throw error when callback is not a function', function shouldCallImmediately(assert) {
  assert.expect(1);
  assert.throws(() => $memo());
});

QUnit.test('shouldn\'t call callback on subsequent calls', function shouldCallImmediately(assert) {
  assert.expect(1);
  const cb = sinon.fake();
  const memoCb = $memo(cb);

  memoCb();
  memoCb();
  memoCb();
  memoCb();
  memoCb();

  assert.true(cb.calledOnce);
});

QUnit.test('should return the size of cache', function shouldCallImmediately(assert) {
  assert.expect(1);
  const cb = sinon.fake();
  const memoCb = $memo(cb);

  memoCb();
  memoCb();
  memoCb();
  memoCb();
  memoCb('test');

  assert.strictEqual(memoCb.__cache__.size(), 2);
});

QUnit.test('should return value for the given key from cache', function shouldCallImmediately(assert) {
  assert.expect(1);
  const cb = sinon.fake.returns(5);
  const memoCb = $memo(cb);

  memoCb('test');

  assert.strictEqual(memoCb.__cache__.get('test'), 5);
});

QUnit.test('should return if key exists in cache', function shouldCallImmediately(assert) {
  assert.expect(1);
  const cb = sinon.fake();
  const memoCb = $memo(cb);

  memoCb('test');

  assert.true(memoCb.__cache__.has('test'));
});

QUnit.test('should delete key from cache', function shouldCallImmediately(assert) {
  assert.expect(2);
  const cb = sinon.fake();
  const memoCb = $memo(cb);

  memoCb('test');
  memoCb('test1');

  assert.true(memoCb.__cache__.has('test'));

  memoCb.__cache__.delete('test');

  assert.false(memoCb.__cache__.has('test'));
});
