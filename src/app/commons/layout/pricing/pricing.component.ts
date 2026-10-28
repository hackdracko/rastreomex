import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements AfterViewInit {

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    // Bootstrap's own "data-bs-ride" auto-init only scans the DOM once on
    // window load; en Angular (CSR) el carrusel todavia no existe en ese
    // momento, asi que lo inicializamos a mano para que el autoplay si arranque.
    if (isPlatformBrowser(this.platformId)) {
      const el = this.elementRef.nativeElement.querySelector('#pricingCarousel');
      if (el) {
        new bootstrap.Carousel(el, { interval: 4000, pause: 'hover', ride: true });
      }
    }
  }

}
