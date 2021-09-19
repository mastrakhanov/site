import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { PostsService } from '@app/shared/posts.service';
import { IPost } from '@app/shared/interface';
import { AlertService } from '@admin/shared/services/alert.service';


@Component({
  selector: 'app-edit-layout',
  templateUrl: './edit-layout.component.html',
  styleUrls: ['./edit-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditLayoutComponent implements OnInit {

  searchStr = '';

  postsNews$: Observable<IPost[]> = EMPTY;
  postsModels$: Observable<IPost[]> = EMPTY;

  checkModels$ = new BehaviorSubject<boolean>(false);
  checkNews$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly postService: PostsService,
    private readonly alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.postsModels$ = this.checkModels$
      .pipe(switchMap(() => this.postService.getAllModels()));

    this.postsNews$ = this.checkNews$
      .pipe(switchMap(() => this.postService.getAllNews()));
  }

  removeNew(id: string | undefined): void {
    if (id) {
      this.postService.removeNew(id)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.checkNews$.next(true);
            this.alertService.success('Новость успешно удалена');
          },
          error: (error) => {
            this.alertService.danger(`Новость не удалена. Ошибка: ${error.message}`);
          }
        });
    }
  }

  removeModel(id: string | undefined): void {
    if (id) {
      this.postService.removeModel(id)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.checkModels$.next(true);
            this.alertService.success('Модель успешно удалена');
          },
          error: (error) => {
            this.alertService.danger(`Модель не удалена. Ошибка: ${error.message}`);
          }
        });
    }
  }

}
