import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public loader: boolean;

  constructor(private viewportScroller: ViewportScroller) {
    this.loader = true;
    this.showingLoader();
  }

  showingLoader() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  public scrollTo(elementId: string): void {
    console.log('Goto: ' + elementId);
    this.viewportScroller.scrollToAnchor(elementId);
  }

}
