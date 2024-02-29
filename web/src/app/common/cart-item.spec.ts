import { CartItem } from './cart-item';

describe('CartItem', () => {
  it('should create an instance', () => {
    expect(
      new CartItem({
        active: true,
        description: 'Test Description',
        id: '1',
        imageUrl: 'http://placehold.it/200x100',
        name: 'Test Product',
        dateCreated: new Date('2021-07-01T00:00:00.000Z'),
        lastUpdate: new Date('2021-07-01T00:00:00.000Z'),
        unitPrice: 100,
        sku: 'Test SKU',
        unitsInStock: 10,
      })
    ).toBeTruthy();
  });
});
