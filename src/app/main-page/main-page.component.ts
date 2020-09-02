import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // @ts-ignore
    $(function() {
      // @ts-ignore
      $('.main-content__slider').unslider({
        autoplay: true,
        speed: 750,
        delay: 5000,
        arrows: false
      });
    });
  }

}
