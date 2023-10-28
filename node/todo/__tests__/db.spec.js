const db = require('../db.js');
const fs = require('fs');
jest.mock('fs');

describe('db', () => {
  it('can read', async () => {
    const obj = [{ title: 'hi', done: true }];
    fs.setMock('/xxx', null, JSON.stringify(obj))
    const list = await db.read('/xxx')
    expect(list).toStrictEqual(obj);
  })
  it('can wtite', () => {
    expect(db.write instanceof Function).toBe(true);
  })
})