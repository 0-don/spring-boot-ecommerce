import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide';
import { BrnCommandImports } from '@spartan-ng/ui-command-brain';
import {
  BrnPopoverComponent,
  BrnPopoverTriggerDirective,
  BrnPopoverContentDirective,
} from '@spartan-ng/ui-popover-brain';
import { HlmButtonDirective } from '../../../../../../libs/ui/ui-button-helm/src';
import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
  HlmCardDescriptionDirective,
  HlmCardContentDirective,
  HlmCardFooterDirective,
} from '../../../../../../libs/ui/ui-card-helm/src';
import { HlmCommandImports } from '../../../../../../libs/ui/ui-command-helm/src';
import { HlmIconComponent } from '../../../../../../libs/ui/ui-icon-helm/src';
import { HlmInputDirective } from '../../../../../../libs/ui/ui-input-helm/src';
import { HlmLabelDirective } from '../../../../../../libs/ui/ui-label-helm/src';
import { HlmPopoverContentDirective } from '../../../../../../libs/ui/ui-popover-helm/src';

@Component({
  selector: 'app-login',
  providers: [provideIcons({ lucideCheck, lucideChevronDown })],
  standalone: true,
  imports: [
    BrnCommandImports,
    HlmCommandImports,
    HlmIconComponent,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    HlmPopoverContentDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
