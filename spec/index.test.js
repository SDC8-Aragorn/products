const db = require('../database/index.js')

test('1. getProduct exists', () => {
  expect(db.getProduct).toBeTruthy()
})

test('2. getProduct is a function', () => {
  expect(typeof db.getProduct).toBe('function')
})

test('3. getProduct returns an array', done => {
  db.getProduct(50)
  .then(result => {
    expect(Array.isArray(result)).toBe(true)
    done()
  })
});

test('4. getProduct returned array contains two values', done => {
  db.getProduct(50)
  .then(result => {
    expect(result.length).toBe(2)
    done()
  })
});

test('5 .getProduct first value has 6 properties', done => {
  db.getProduct(20)
  .then(result => {
    let props = Object.keys(result[0][0])
    expect(props.length).toBe(6)
    done()
  })
})

test('1 .getProducts exists', () => {
  expect(db.getProducts).toBeTruthy()
})

test('2 .getProducts is a function', () => {
  expect(typeof db.getProducts).toBe('function')
})

test('3. getProducts returns an object', done => {
  db.getProducts(50)
  .then(result => {
    expect(Array.isArray(result)).toBe(true)
    done()
  })
});

test('4. getProducts returns 5 values', done => {
  db.getProducts(50)
  .then(result => {
    expect(result.length).toBe(5)
    done()
  })
});

test('1. getStyles exists', () => {
  expect(db.getStyles).toBeTruthy()
})

test('2. getStyles is a function', () => {
  expect(typeof db.getStyles).toBe('function')
})

test('3. getStyles returns an object', done => {
  db.getStyles(50)
  .then(result => {
    expect(typeof result).toBe('object')
    done()
  })
});

test('4. getStyles return has a product_id property', done => {
  db.getStyles(50)
  .then(result => {
    expect(result.product_id).toBeTruthy()
    done()
  })
})

test('5. getStyles return has a results property', done => {
  db.getStyles(50)
  .then(result => {
    expect(result.results).toBeTruthy()
    done()
  })
})

test('1 .getRelated exists', () => {
  expect(db.getRelated).toBeTruthy()
})

test('2 .getRelated is a function', () => {
  expect(typeof db.getRelated).toBe('function')
})

test('3. getRelated returns an array', done => {
  db.getRelated(50)
  .then(result => {
    expect(Array.isArray(result)).toBe(true)
    done()
  })
});

afterAll(() => {
  return db.close()
})