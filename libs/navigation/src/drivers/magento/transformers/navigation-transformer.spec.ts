import { TestBed } from '@angular/core/testing';

import { CategoryNode } from '../interfaces/category-node';
import { DaffMagentoNavigationTransformerService } from './navigation-transformer';
import { DaffNavigationTree } from '../../../models/navigation-tree';

describe('Driver | Magento | Navigation | Transformers | DaffMagentoNavigationTransformerService', () => {
  let service: DaffMagentoNavigationTransformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DaffMagentoNavigationTransformerService
      ]
    })
    service = TestBed.get(DaffMagentoNavigationTransformerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should transform a CategoryNode into a DaffNavigationTree', () => {
    const categoryNode: CategoryNode = {
      id: '1',
      name: 'Root Category',
      include_in_menu: true,
      products: {
        total_count: 10
      },
      children_count: 0,
      children: [{
        id: '2',
        include_in_menu: false,
        name: 'Subcategory',
        products: {
          total_count: 10
        },
        children_count: 0,
        children: []
      }]
    }

    const navigation: DaffNavigationTree = {
      id: '1',
      name: 'Root Category',
      path: '1',
      total_products: 10,
      children: [],
      children_count: 0,
    }

    expect(service.transform(categoryNode)).toEqual(navigation);
  });

  it('should filter out categories (and necessarily their children) that are include_in_menu false', () => {
    const categoryNode: CategoryNode = {
      id: '1',
      name: 'Root Category',
      include_in_menu: true,
      products: {
        total_count: 10
      },
      children_count: 1,
      children: [{
        id: '2',
        include_in_menu: true,
        name: 'Subcategory',
        products: {
          total_count: 10
        },
        children_count: 0,
        children: []
      }]
    };

    const navigation: DaffNavigationTree = {
      id: '1',
      name: 'Root Category',
      path: '1',
      total_products: 10,
      children: [{
        id: '2',
        name: 'Subcategory',
        path: '2',
        total_products: 10,
        children: [],
        children_count: 0,
      }],
      children_count: 1,
    }

    expect(service.transform(categoryNode)).toEqual(navigation);
  })
  
});
