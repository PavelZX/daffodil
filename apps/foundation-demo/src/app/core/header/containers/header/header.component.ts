import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { OpenSidebar, ToggleSidebar } from '../../../sidebar/actions/sidebar.actions';

@Component({
  selector: 'foundation-header-container',
  templateUrl: './header.component.html'
})
export class FoundationHeaderContainer {
  constructor(private store: Store<{}>) { }

  openSidebar() {
    this.store.dispatch(new ToggleSidebar());
  }
}
