'use strict';

const Categories = require('../src/models/categories');
let categories = new Categories();
const supergoose = require('./supergoose');

describe('Categories model', () => {
  it('can post() a new category', () => {
    let obj = { name: 'Food' };
    return categories.post(obj)
      .then(category => {
        Object.keys(obj).forEach(key => {
          expect(category).toHaveProperty(key, obj[key]);
          expect(category[key]).toEqual(obj[key]);
        });

        expect(category).toMatchObject(obj);
        expect(category).toHaveProperty('id');
      });
  });

  it('can get() a category', () => {
    let obj = { name: 'Food' };
    return categories.post(obj)
      .then(category => {
        return categories.get(category.id)
          .then(name => {
            Object.keys(obj).forEach(key => {
              expect(name[key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can put() a category', () => {
    let obj = { name: 'Food' };
    return categories.post(obj)
      .then(category => {
        return categories.put(category.id, { name: 'Groceries' })
          .then(name => {
            return categories.get(name.id)
              .then(category => {
                Object.keys(obj).forEach(key => {
                  expect(category[key]).not.toEqual(obj[key]);
                  expect(category).toHaveProperty('name', 'Groceries');
                });
              });
          });
      });
  });

  it('can delete() a category', () => {
    let obj = { name: 'Food' };
    return categories.post(obj)
      .then(category => {
        return categories.delete(category.id)
          .then(() => {
            expect(categories).toEqual({});
          });
      });
  });
});