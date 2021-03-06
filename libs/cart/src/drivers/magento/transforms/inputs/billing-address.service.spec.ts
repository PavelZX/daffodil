import { TestBed } from '@angular/core/testing';

import {
  MagentoCartAddressInputFactory,
  DaffCartAddressFactory
} from '@daffodil/cart/testing';

import { DaffMagentoCartAddressInputTransformer } from './cart-address.service';
import { DaffMagentoBillingAddressInputTransformer } from './billing-address.service';

describe('Driver | Magento | Cart | Transformer | MagentoBillingAddressInput', () => {
  let service: DaffMagentoBillingAddressInputTransformer;

  let daffCartAddressFactory: DaffCartAddressFactory;
  let magentoCartAddressInputFactory: MagentoCartAddressInputFactory;

  let mockDaffBillingAddress;
  let mockMagentoCartAddressInput;

  let cartAddressTransformerSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DaffMagentoBillingAddressInputTransformer,
        {
          provide: DaffMagentoCartAddressInputTransformer,
          useValue: jasmine.createSpyObj('DaffMagentoCartAddressInputTransformer', ['transform'])
        }
      ]
    });

    service = TestBed.get(DaffMagentoBillingAddressInputTransformer);

    cartAddressTransformerSpy = TestBed.get(DaffMagentoCartAddressInputTransformer);

    daffCartAddressFactory = TestBed.get(DaffCartAddressFactory);
    magentoCartAddressInputFactory = TestBed.get(MagentoCartAddressInputFactory);

    mockDaffBillingAddress = daffCartAddressFactory.create();
    mockMagentoCartAddressInput = magentoCartAddressInputFactory.create();

    cartAddressTransformerSpy.transform.and.returnValue(mockMagentoCartAddressInput);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('transform | transforming a shipping address input', () => {
    let transformedBillingAddress;
    let addressId;

    beforeEach(() => {
      addressId = '15';

      mockDaffBillingAddress.address_id = addressId;

      transformedBillingAddress = service.transform(mockDaffBillingAddress);
    });

    it('should return an object with the correct values', () => {
      expect(transformedBillingAddress.customer_address_id).toEqual(addressId);
    });

    it('should call the cart address transformer with the address', () => {
      expect(cartAddressTransformerSpy.transform).toHaveBeenCalledWith(mockDaffBillingAddress);
    });
  });
});
