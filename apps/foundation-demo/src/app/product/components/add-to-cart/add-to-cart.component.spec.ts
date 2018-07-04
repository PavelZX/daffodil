import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartComponent } from './add-to-cart.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

@Component({template: '<add-to-cart (addToCart)="eventCatcher()"></add-to-cart>'})
class AddToCartWrapperTest {
  eventCatcher;
}

describe('AddToCartComponent', () => {
  let component: AddToCartWrapperTest;
  let fixture: ComponentFixture<AddToCartWrapperTest>;
  let addToCartComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ 
        AddToCartWrapperTest,
        AddToCartComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartWrapperTest);
    component = fixture.componentInstance;
    component.eventCatcher = () => {};
    fixture.detectChanges();

    addToCartComponent = fixture.debugElement.query(By.css('add-to-cart'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when add to cart button is clicked', () => {

    beforeEach(() => {
      spyOn(addToCartComponent.componentInstance, 'emitAddToCart');

      addToCartComponent.query(By.css('button')).nativeElement.click();      
    });
    
    it('should call emitAddToCart', () => {
      expect(addToCartComponent.componentInstance.emitAddToCart).toHaveBeenCalled();
    });
  });

  describe('emitAddToCart', () => {
    
    it('should call addToCart.emit', () => {
      spyOn(addToCartComponent.componentInstance.addToCart, 'emit');

      addToCartComponent.componentInstance.emitAddToCart();

      expect(addToCartComponent.componentInstance.addToCart.emit).toHaveBeenCalled();
    });
  });
});