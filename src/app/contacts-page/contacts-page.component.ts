import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsPageComponent { }
