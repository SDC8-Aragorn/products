const db = require('../database/index.js')

jest.setTimeout(20000)

test('getProduct exists', () => {
  expect(db.getProduct).toBeTruthy()
})

test('getProduct is a function', () => {
  expect(typeof db.getProduct).toBe('function')
})

test('getProduct returns an array', done => {
  db.getProduct(50)
  .then(result => {
    expect(Array.isArray(result)).toBe(true)
    done()
  })
});

test('getProduct returned array contains two values', done => {
  db.getProduct(50)
  .then(result => {
    expect(result.length).toBe(2)
    done()
  })
});

test('getProduct first value has 6 properties', done => {
  db.getProduct(20)
  .then(result => {
    let props = Object.keys(result[0][0])
    expect(props.length).toBe(6)
    done()
  })
})

afterAll(() => {
  return db.close()
})