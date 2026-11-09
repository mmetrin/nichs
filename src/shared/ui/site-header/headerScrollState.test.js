import assert from 'node:assert/strict'
import test from 'node:test'
import { createHeaderScrollState } from './headerScrollState.js'

const options = { topBoundary: 88 }

test('small alternating scroll movements do not reveal a hidden header', () => {
  const update = createHeaderScrollState(720)
  for (const y of [706, 720, 706, 720, 708, 722]) {
    assert.equal(update(y, options), true)
  }
})

test('sustained upward scrolling reveals once and a deliberate downward reversal hides', () => {
  const update = createHeaderScrollState(720)
  assert.equal(update(700, options), true)
  assert.equal(update(688, options), false)
  assert.equal(update(660, options), false)
  assert.equal(update(680, options), false)
  assert.equal(update(707, options), false)
  assert.equal(update(708, options), true)
})

test('small alternating movements do not hide an already visible header', () => {
  const update = createHeaderScrollState(720)
  assert.equal(update(680, options), false)
  for (const y of [694, 680, 694, 680, 696]) assert.equal(update(y, options), false)
})

test('resting at the same scroll position does not change visibility', () => {
  const update = createHeaderScrollState(720)
  assert.equal(update(680, options), false)
  for (let i = 0; i < 120; i++) assert.equal(update(680, options), false)
})

test('the static header takes over at the top without boundary flicker', () => {
  const update = createHeaderScrollState(200)
  assert.equal(update(160, options), false)
  assert.equal(update(88, options), true)
  for (const y of [100, 87, 110, 89, 0]) assert.equal(update(y, options), true)
})

test('menu or focus locks visibility and discards scroll accumulated while locked', () => {
  const update = createHeaderScrollState(720)
  assert.equal(update(680, options), false)
  assert.equal(update(900, { ...options, keepVisible: true }), false)
  assert.equal(update(900, options), false)
  assert.equal(update(920, options), false)
  assert.equal(update(948, options), true)
})

test('a hidden header is not revealed by a menu lock or a resized boundary', () => {
  const update = createHeaderScrollState(720)
  assert.equal(update(720, { ...options, keepVisible: true }), true)
  assert.equal(update(720, { topBoundary: 72 }), true)
})
