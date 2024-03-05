import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
import { TranslateModule } from '@ngx-translate/core';

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
  ],
  providers: [
    provideIcons({
      lucideCheck,
      lucideChevronDown,
      lucideDoorOpen,
      lucideLogIn,
    }),
  ],
  template: `
    <main class="flex min-h-[calc(100svh-10rem)]">
      <div class="m-auto max-w-[500px] md:w-2/5">
        <form (formdata)="(form)" hlmCard>
          <div hlmCardHeader>
            <h3 hlmCardTitle>{{ 'auth.login.title' | translate }}</h3>
            <p hlmCardDescription>
              {{ 'auth.login.description' | translate }}
            </p>
          </div>
          <p hlmCardContent class="flex flex-col space-y-5">
            <label class="block" hlmLabel>
              {{ 'auth.login.usernameLabel' | translate }}
              <input
                class="mt-1.5 w-full"
                [placeholder]="'auth.login.usernamePlaceholder' | translate"
                hlmInput
              />
            </label>

            <label class="block" hlmLabel>
              {{ 'auth.login.passwordLabel' | translate }}
              <input
                class="mt-1.5 w-full"
                [placeholder]="'auth.login.passwordPlaceholder' | translate"
                hlmInput
              />
            </label>
          </p>
          <div hlmCardFooter class="justify-between">
            <a hlmBtn variant="ghost" routerLink="/register">
              {{ 'auth.registerButton' | translate }}
              <hlm-icon class="ml-1 h-4 w-4" name="lucideDoorOpen" />
            </a>
            <button hlmBtn type="submit">
              {{ 'auth.loginButton' | translate }}
              <hlm-icon class="ml-1 h-4 w-4" name="lucideLogIn" />
            </button>
          </div>
        </form>
      </div>
    </main>
  `,
})
export class LoginComponent {
  form: FormGroup = new FormGroup({});
}
