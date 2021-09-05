import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-constructor-page',
  templateUrl: './constructors-page.component.html',
  styleUrls: ['./constructors-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConstructorsPageComponent { }
