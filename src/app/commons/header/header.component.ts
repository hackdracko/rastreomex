import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public loader: boolean;
  public menuOpen = false;

  constructor(private viewportScroller: ViewportScroller) {
    this.loader = true;
    this.showingLoader();
  }

  showingLoader() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  public toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  public scrollTo(elementId: string): void {
    this.menuOpen = false;
    this.viewportScroller.scrollToAnchor(elementId);
  }

}
