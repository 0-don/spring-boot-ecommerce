import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import {
  HlmInputDirective,
  HlmInputErrorComponent,
  HlmInputFormErrorDirective,
} from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  SignalFormBuilder,
  SignalInputDirective,
  V,
  withErrorComponent,
} from 'ng-signal-forms';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { TranslateLoaderService } from '@/app/shared/service/translate-loader.service';
import { AuthService } from '@/app/shared/service/auth.service';

type FormType = ReturnType<RegisterComponent['prepareForm']>;

@Component({
  selector: 'app-register',
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
    FormsModule,
    SignalInputDirective,
    HlmInputFormErrorDirective,
    HlmSpinnerComponent,
  ],
  providers: [
    provideIcons({
      lucideCheck,
      lucideChevronDown,
      lucideDoorOpen,
      lucideLogIn,
    }),
    withErrorComponent(HlmInputErrorComponent),
  ],
  template: `
    <main class="flex min-h-[calc(100svh-10rem)]">
      <div class="m-auto max-w-[500px] md:w-2/5">
        <form (ngSubmit)="submit()" hlmCard>
          <div hlmCardHeader>
            <h3 hlmCardTitle>{{ 'auth.register.title' | translate }}</h3>
            <p hlmCardDescription>
              {{ 'auth.register.description' | translate }}
            </p>
          </div>
          @if (form) {
            <div hlmCardContent class="flex flex-col py-0">
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
                  name="paassword"
                  ngModel
                  [formField]="form.controls.password"
                />
              </label>

              <label class="block" hlmLabel>
                {{ 'auth.input.repeatPasswordLabel' | translate }}
                <input
                  class="w-full"
                  [placeholder]="
                    'auth.input.repeatPasswordPlaceholder' | translate
                  "
                  hlmInput
                  autocomplete="off"
                  name="passwordRepeat"
                  ngModel
                  [formField]="form.controls.passwordRepeat"
                />
              </label>
            </div>
          }

          <div hlmCardFooter class="justify-between">
            <a hlmBtn variant="ghost" routerLink="/login">
              {{ 'auth.loginButton' | translate }}
              <hlm-icon class="ml-1 h-4 w-4" name="lucideLogIn" />
            </a>
            <button
              hlmBtn
              [disabled]="loading() || !form?.valid()"
              type="submit"
            >
              <span
                >{{
                  (loading()
                    ? 'auth.register.registering'
                    : 'auth.registerButton'
                  ) | translate
                }}
              </span>
              @if (loading()) {
                <hlm-spinner class="ml-2" size="sm" />
              } @else {
                <hlm-icon class="ml-1 h-4 w-4" name="lucideDoorOpen" />
              }
            </button>
          </div>
        </form>
      </div>
    </main>
  `,
})
export class RegisterComponent {
  public state = signal({
    status: 'idle' as 'idle' | 'loading' | 'success' | 'error',
    error: null as unknown | null,
  });
  public loading = computed(() => this.state().status === 'loading');
  protected form?: FormType;
  private _sfb = inject(SignalFormBuilder);
  private _translate = inject(TranslateService);
  private _translateLoader = inject(TranslateLoaderService);
  private _auth = inject(AuthService);

  constructor() {
    this._translateLoader.loadTranslations(
      () => (this.form = this.prepareForm()),
    );
  }

  prepareForm() {
    const password = this._sfb.createFormField<string>('test', {
      validators: [
        {
          validator: V.required(),
          message: () =>
            this._translate.instant('auth.validate.passwordRequired'),
        },
        {
          validator: V.minLength(3),
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
    });

    return this._sfb.createFormGroup(() => ({
      username: this._sfb.createFormField<string>('test', {
        validators: [
          {
            validator: V.required(),
            message: () =>
              this._translate.instant('auth.validate.usernameRequired'),
          },
          {
            validator: V.minLength(3),
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
      password,
      passwordRepeat: this._sfb.createFormField<string>('test', {
        validators: [
          {
            validator: V.required(),
            message: () =>
              this._translate.instant('auth.validate.repeatPasswordRequired'),
          },
          {
            validator: V.minLength(3),
            message: ({ minLength }) =>
              this._translate.instant('auth.validate.repeatPasswordMin', {
                length: minLength,
              }),
          },
          {
            validator: V.maxLength(128),
            message: ({ maxLength }) =>
              this._translate.instant('auth.validate.repeatPasswordMax', {
                length: maxLength,
              }),
          },
          {
            validator: V.equalsTo(password.value),
            message: () =>
              this._translate.instant('auth.validate.repeatPasswordNoMatch'),
          },
        ],
      }),
    }));
  }

  submit(): void {
    if (!this.form) return;
    this.state.set({ ...this.state(), status: 'loading' });

    this._auth
      .register(this.form.value().username, this.form.value().password)
      .subscribe({
        next: (result) => {
          console.log(result);
          this.state.set({ ...this.state(), status: 'success' });
        },
        error: (error) =>
          this.state.set({ ...this.state(), status: 'error', error }),
      });
  }
}
