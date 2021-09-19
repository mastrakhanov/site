import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Autoplay, SwiperOptions } from 'swiper';
import SwiperCore, { Pagination } from 'swiper';


SwiperCore.use([Pagination, Autoplay]);

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { clickable: true }
  };

}
