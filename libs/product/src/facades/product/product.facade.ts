import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DaffStoreFacade } from '@daffodil/core';

import { Store, select, Action } from '@ngrx/store';

import { DaffProduct } from '../../models/product';
import * as fromProduct from '../../reducers/index';
import { DaffProductModule } from '../../product.module';

@Injectable({
  providedIn: DaffProductModule
})
export class DaffProductFacade implements DaffStoreFacade<Action> {
  loading$: Observable<boolean>;
  product$: Observable<DaffProduct>;

  constructor(private store: Store<fromProduct.State>) {
    this.loading$ = this.store.pipe(select(fromProduct.selectSelectedProductLoadingState));
    this.product$ = this.store.pipe(select(fromProduct.selectSelectedProduct));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}