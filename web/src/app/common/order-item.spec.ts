import { OrderItem } from './order-item';

describe('OrderItem', () => {
  it('should create an instance', () => {
    expect(
      new OrderItem({
        id: '1',
        name: 'Test Product',
        imageUrl: 'http://placehold.it/200x100',
        unitPrice: 100,
        quantity: 1,
      })
    ).toBeTruthy();
  });
});
