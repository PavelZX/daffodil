import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DaffCartItem } from '@daffodil/cart';

@Component({
  selector: 'demo-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() item: DaffCartItem;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  redirectToProduct() {
    this.router.navigateByUrl('/product/' + this.item.product_id);
  }
}
