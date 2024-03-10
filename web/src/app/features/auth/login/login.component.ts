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

type FormType = ReturnType<LoginComponent['prepareForm']>;

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
            <h3 hlmCardTitle>{{ 'auth.login.title' | translate }}</h3>
            <p hlmCardDescription>
              {{ 'auth.login.description' | translate }}
            </p>
          </div>

          @if (form) {
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
          }

          <div hlmCardFooter class="justify-between">
            <a hlmBtn variant="ghost" routerLink="/register">
              {{ 'auth.registerButton' | translate }}
              <hlm-icon class="ml-1 h-4 w-4" name="lucideDoorOpen" />
            </a>
            <button
              hlmBtn
              [disabled]="loading() || !form?.valid()"
              type="submit"
            >
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
  protected state = signal({
    status: 'idle' as 'idle' | 'loading' | 'success' | 'error',
    error: null as unknown | null,
  });
  protected loading = computed(() => this.state().status === 'loading');
  protected form?: FormType;
  private _sfb = inject(SignalFormBuilder);
  private _translate = inject(TranslateService);
  private _translateLoader = inject(TranslateLoaderService);
  private _authService = inject(AuthService);

  constructor() {
    this._translateLoader.loadTranslations(
      () => (this.form = this.prepareForm()),
    );
  }

  prepareForm() {
    return this._sfb.createFormGroup(() => ({
      username: this._sfb.createFormField<string>('don', {
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
      password: this._sfb.createFormField<string>('don', {
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
      }),
    }));
  }

  async submit(): Promise<void> {
    if (!this.form) return;
    console.log(this.form, this.form?.valid());
    this.state.set({ ...this.state(), status: 'loading' });

    this._authService
      .login(this.form.value().username, this.form.value().password)
      .subscribe({
        next: (auth) => {
          this._authService.keycloak.getKeycloakInstance().token =
            auth.access_token;
          this._authService.keycloak.getKeycloakInstance().refreshToken =
            auth.refresh_token;
          this._authService.keycloak.getKeycloakInstance().sessionId =
            auth.session_state;
          this._authService.keycloak.getKeycloakInstance().authenticated = true;

          this._authService.keycloak.getKeycloakInstance().init({
            token: auth.access_token,
            refreshToken: auth.refresh_token,
          });

          this.state.set({ ...this.state(), status: 'success' });
          this._authService.isAuthenticated.set(true);
        },
        error: (error) => {
          this.state.set({ ...this.state(), status: 'error', error });
          this._authService.keycloak.getKeycloakInstance().authenticated =
            false;
          this._authService.isAuthenticated.set(false);
        },
      });
  }
}
