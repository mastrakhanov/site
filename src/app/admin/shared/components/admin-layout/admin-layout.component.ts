import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@admin/shared/services/auth.service';


@Component({
  selector: 'app-adminlayout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayoutComponent {

  constructor(
    public readonly auth: AuthService,
    private readonly router: Router
  ) { }

  logout(event: Event): void {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin', 'login']);
  }

}
