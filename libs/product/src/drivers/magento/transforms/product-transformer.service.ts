import { Injectable } from '@angular/core';

import { DaffProduct, DaffProductTypeEnum } from '../../../models/product';
import { MagentoProduct, MagentoProductTypeEnum } from '../models/magento-product';

/**
 * Transforms magento products into an object usable by daffodil.
 */
@Injectable({
  providedIn: 'root'
})
export class DaffMagentoProductTransformerService {

  /**
   * Transforms the magento MagentoProduct from the magento product query into a DaffProduct. 
   * @param response the response from a magento product query.
   */
  transform(response: any): DaffProduct {
    const product: MagentoProduct = response.products.items[0];
    return {
			type: this.transformProductType(product.__typename),
			id: product.sku,
      url: product.url_key,
			name: product.name,
			price: this.getPrice(product),
      images: [
        { url: product.image.url, id: '0', label: product.image.label},
        ...product.media_gallery_entries.map(image => {
          return {
            url: response.storeConfig.secure_base_media_url + 'catalog/product' + image.file,
            label: image.label,
            id: image.id.toString()
          }
        })
      ],
      description: product.description.html
    }
  }

  /**
   * Transforms many magento MagentoProducts from the magento product query into DaffProducts.
   */
  transformMany(products: any[]): DaffProduct[] {
    return products.map(this.transformList.bind(this));
  }

  private transformList(product: MagentoProduct): DaffProduct {
    return {
			type: this.transformProductType(product.__typename),
      id: product.sku,
      url: product.url_key,
      name: product.name,
			price: this.getPrice(product),
			images: [
        {url: product.image.url, id: '0', label: product.image.url}
      ]
    }
	}
	
	private transformProductType(type: string): DaffProductTypeEnum {
		switch(type) {
			case(MagentoProductTypeEnum.BundledProduct) :
				return DaffProductTypeEnum.Composite;
			case(MagentoProductTypeEnum.SimpleProduct) : 
				return DaffProductTypeEnum.Simple;
			default :
				return null;
		}
	}

	/**
	 * A function for null checking an object.
	 */
	private getPrice(product: MagentoProduct): string {
		return !product.price_range || 
			!product.price_range.maximum_price || 
			!product.price_range.maximum_price.regular_price || 
			!!product.price_range.maximum_price.regular_price.value
		? product.price_range.maximum_price.regular_price.value.toString() : '';
	}
}
