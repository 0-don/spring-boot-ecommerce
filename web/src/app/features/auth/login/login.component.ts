import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  lucideCheck,
  lucideChevronDown,
  lucideDoorOpen,
  lucideLogIn,
} from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgIf } from '@angular/common';
import {
  SignalFormBuilder,
  SignalInputDirective,
  V,
  withErrorComponent,
} from 'ng-signal-forms';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { SpartanInputErrorDirective } from '../../../shared/input-error/input-error.directive';
import { InputErrorComponent } from '../../../shared/input-error/input-error.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HlmIconComponent,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,
    RouterLink,
    TranslateModule,
    ReactiveFormsModule,
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
  providers: [
    provideIcons({
      lucideCheck,
      lucideChevronDown,
      lucideDoorOpen,
      lucideLogIn,
    }),
    withErrorComponent(InputErrorComponent),
  ],
  template: `
    <main class="flex min-h-[calc(100svh-10rem)]">
      <div class="m-auto max-w-[500px] md:w-2/5">
        <form (ngSubmit)="submit()" hlmCard>
          <div hlmCardHeader>
            <h3 hlmCardTitle>{{ 'auth.login.title' | translate }}</h3>
            <p hlmCardDescription>
              {{ 'auth.login.description' | translate }}
            </p>
          </div>
          <div hlmCardContent class="py-0">
            <label class="block" hlmLabel>
              {{ 'auth.input.usernameLabel' | translate }}
              <input
                class="w-full"
                [placeholder]="'auth.input.usernamePlaceholder' | translate"
                hlmInput
                autocomplete="off"
                name="username"
                ngModel
                [formField]="form.controls.username"
              />
            </label>

            <label class="block" hlmLabel>
              {{ 'auth.input.passwordLabel' | translate }}
              <input
                class="w-full"
                [placeholder]="'auth.input.passwordPlaceholder' | translate"
                hlmInput
                autocomplete="off"
                name="password"
                ngModel
                [formField]="form.controls.password"
              />
            </label>
          </div>
          <div hlmCardFooter class="justify-between">
            <a hlmBtn variant="ghost" routerLink="/register">
              {{ 'auth.registerButton' | translate }}
              <hlm-icon class="ml-1 h-4 w-4" name="lucideDoorOpen" />
            </a>
            <button hlmBtn [disabled]="loading() || !form.valid" type="submit">
              <span
                >{{
                  (loading() ? 'auth.login.loggingIn' : 'auth.loginButton')
                    | translate
                }}
              </span>
              @if (loading()) {
                <hlm-spinner class="ml-2" size="sm" />
              } @else {
                <hlm-icon class="ml-1 h-4 w-4" name="lucideLogIn" />
              }
            </button>
          </div>
        </form>
      </div>
    </main>
  `,
})
export class LoginComponent {
  private _sfb = inject(SignalFormBuilder);
  private _translate = inject(TranslateService);

  public state = signal({
    status: 'idle' as 'idle' | 'loading' | 'success' | 'error',
    error: null as unknown | null,
  });

  public loading = computed(() => this.state().status === 'loading');

  form = this._sfb.createFormGroup(() => ({
    username: this._sfb.createFormField<string>('', {
      validators: [
        {
          validator: V.required(),
          message: () =>
            this._translate.instant('auth.validate.usernameRequired'),
        },
        {
          validator: V.minLength(4),
          message: ({ minLength }) =>
            this._translate.instant('auth.validate.usernameMin', {
              length: minLength,
            }),
        },
        {
          validator: V.maxLength(64),
          message: ({ maxLength }) =>
            this._translate.instant('auth.validate.usernameMax', {
              length: maxLength,
            }),
        },
      ],
    }),
    password: this._sfb.createFormField<string>('', {
      validators: [
        {
          validator: V.required(),
          message: () =>
            this._translate.instant('auth.validate.passwordRequired'),
        },
        {
          validator: V.minLength(6),
          message: ({ minLength }) =>
            this._translate.instant('auth.validate.passwordMin', {
              length: minLength,
            }),
        },
        {
          validator: V.maxLength(128),
          message: ({ maxLength }) =>
            this._translate.instant('auth.validate.passwordMax', {
              length: maxLength,
            }),
        },
      ],
    }),
  }));

  submit(): void {
    this.state.update((state) => ({ ...state, status: 'loading' }));
    setTimeout(() => {
      this.state.update((state) => ({ ...state, status: 'idle' }));
    }, 1000);
  }
}
