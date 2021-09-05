import { Component, Inject, OnInit } from '@angular/core';
import {LOCAL_STORAGE, WINDOW} from '@ng-web-apis/common';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  year: number;

  constructor(@Inject(WINDOW) private readonly window: Window) { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

  public onTop(): void {
    const scrollToTop = this.window.setInterval(() => {
      const pos = this.window.pageYOffset;
      if (pos > 0) {
        this.window.scrollTo(0, pos - 30);
      } else {
        this.window.clearInterval(scrollToTop);
      }
    }, 5);
  }

}
