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
            <h3 hlmCardTitle>{{ 'auth.register.title' | translate }}</h3>
            <p hlmCardDescription>
              {{ 'auth.register.description' | translate }}
            </p>
          </div>
          <p hlmCardContent class="flex flex-col space-y-5">
            <label class="block" hlmLabel>
              {{ 'auth.register.usernameLabel' | translate }}
              <input
                class="mt-1.5 w-full"
                [placeholder]="'auth.register.usernamePlaceholder' | translate"
                hlmInput
              />
            </label>

            <label class="block" hlmLabel>
              {{ 'auth.register.passwordLabel' | translate }}
              <input
                class="mt-1.5 w-full"
                [placeholder]="'auth.register.passwordPlaceholder' | translate"
                hlmInput
              />
            </label>

            <label class="block" hlmLabel>
              {{ 'auth.register.passwordRepeatLabel' | translate }}
              <input
                class="mt-1.5 w-full"
                [placeholder]="
                  'auth.register.passwordRepeatPlaceholder' | translate
                "
                hlmInput
              />
            </label>
          </p>
          <div hlmCardFooter class="justify-between">
            <a hlmBtn variant="ghost" routerLink="/login"
              >{{ 'auth.loginButton' | translate }}
              <hlm-icon class="ml-1 h-4 w-4" name="lucideLogIn" />
            </a>
            <button hlmBtn type="submit">
              {{ 'auth.registerButton' | translate }}
              <hlm-icon class="ml-1 h-4 w-4" name="lucideDoorOpen" />
            </button>
          </div>
        </form>
      </div>
    </main>
  `,
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({});
}
