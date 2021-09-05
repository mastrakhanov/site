import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-main-layout-page',
  templateUrl: './main-layout-page.component.html',
  styleUrls: ['./main-layout-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutPageComponent { }
