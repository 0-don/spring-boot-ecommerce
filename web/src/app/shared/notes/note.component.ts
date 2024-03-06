import { NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import {
  SignalFormBuilder,
  SignalInputDirective,
  V,
  withErrorComponent,
} from 'ng-signal-forms';
import { catchError, of, Subject } from 'rxjs';
import { SpartanInputErrorDirective } from '../input-error/input-error.directive';
import { InputErrorComponent } from '../input-error/input-error.component';

@Component({
  selector: 'spartan-notes-example',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink,
    SignalInputDirective,
    SpartanInputErrorDirective,
    HlmButtonDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmSpinnerComponent,
  ],
  providers: [withErrorComponent(InputErrorComponent)],
  host: {
    class: 'block p-2 sm:p-4 pb-16',
  },
  template: `
    <form class="flex flex-col items-end py-2">
      <label hlmLabel class="w-full">
        Title
        <input
          class="mt-1.5 w-full"
          placeholder="Buy groceries"
          hlmInput
          autocomplete="off"
          name="newTitle"
          ngModel
          [formField]="form.controls.title"
        />
      </label>

      <label hlmLabel class="w-full">
        Content
        <textarea
          class="mt-1.5 h-fit w-full"
          placeholder="2x eggs, 1x milk,..."
          hlmInput
          autocomplete="off"
          name="newContent"
          ngModel
          rows="4"
          [formField]="form.controls.content"
        ></textarea>
      </label>

      <button
        hlmBtn
        [disabled]="createLoad()"
        variant="secondary"
        (click)="createNote()"
      >
        <span>{{ createLoad() ? 'Creating' : 'Create' }} Note</span>
        <hlm-spinner *ngIf="createLoad()" class="ml-2" size="sm" />
      </button>
    </form>
  `,
})
export default class NotesExamplePageComponent {
  private _sfb = inject(SignalFormBuilder);
  private _refreshNotes$ = new Subject<void>();
  private _notes$ = this._refreshNotes$.pipe(
    catchError((err) => {
      this.state.update((state) => ({
        ...state,
        notes: [],
        status: 'error',
        error: err,
      }));
      return of([]);
    }),
  );

  public state = signal({
    status: 'idle',
    notes: [],
    error: null,
    updatedFrom: 'initial',
  });

  public createLoad = computed(
    () =>
      this.state().status === 'loading' &&
      this.state().updatedFrom === 'create',
  );

  public form = this._sfb.createFormGroup(() => ({
    title: this._sfb.createFormField<string>('', {
      validators: [
        {
          validator: V.required(),
          message: () => 'Make sure to give your note a title',
        },
      ],
    }),
    content: this._sfb.createFormField('', {
      validators: [
        {
          validator: V.required(),
          message: () => 'Add some content to your note',
        },
      ],
    }),
  }));

  constructor() {
    this._notes$.subscribe();
  }

  public createNote() {
    if (this.form.state() !== 'VALID') {
      this.form.markAllAsTouched();
      return;
    }
    const { title, content } = this.form.value();

    this.form.reset();
  }
}
