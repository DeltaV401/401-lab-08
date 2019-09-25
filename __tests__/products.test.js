'use strict';

const Products = require('../src/models/products');
let products = new Products();
const supergoose = require('./supergoose');

describe('Products model', () => {
  it('can post() a new product', () => {
    let obj = { name: 'Bread', price: 2.99 };
    return products.post(obj)
      .then(product => {
        Object.keys(obj).forEach(key => {
          expect(product).toHaveProperty(key, obj[key]);
          expect(product[key]).toEqual(obj[key]);
        });

        expect(product).toMatchObject(obj);
        expect(product).toHaveProperty('id');
      });
  });

  it('can get() a product', () => {
    let obj = { name: 'Bread', price: 2.99 };
    return products.post(obj)
      .then(product => {
        return products.get(product.id)
          .then(name => {
            Object.keys(obj).forEach(key => {
              expect(name[key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can put() a product', () => {
    let obj = { name: 'Bread', price: 2.99 };
    return products.post(obj)
      .then(product => {
        return products.put(product.id, { name: 'Wheat Bread', price: 3.49 })
          .then(name => {
            return products.get(name.id)
              .then(product => {
                Object.keys(obj).forEach(key => {
                  expect(product[key]).not.toEqual(obj[key]);
                  expect(product).toHaveProperty('name', 'Wheat Bread');
                  expect(product).toHaveProperty('price', 3.49);
                });
              });
          });
      });
  });

  it('can delete() a product', () => {
    let obj = { name: 'Bread', price: 2.99 };
    return products.post(obj)
      .then(product => {
        return products.delete(product.id)
          .then(() => {
            expect(products).toEqual({});
          });
      });
  });
});