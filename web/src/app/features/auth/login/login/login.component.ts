import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide';

import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import { HlmButtonDirective } from '../../../../../../libs/ui/ui-button-helm/src/lib/hlm-button.directive';
import { HlmCardContentDirective } from '../../../../../../libs/ui/ui-card-helm/src/lib/hlm-card-content.directive';
import { HlmCardDescriptionDirective } from '../../../../../../libs/ui/ui-card-helm/src/lib/hlm-card-description.directive';
import { HlmCardFooterDirective } from '../../../../../../libs/ui/ui-card-helm/src/lib/hlm-card-footer.directive';
import { HlmCardHeaderDirective } from '../../../../../../libs/ui/ui-card-helm/src/lib/hlm-card-header.directive';
import { HlmCardTitleDirective } from '../../../../../../libs/ui/ui-card-helm/src/lib/hlm-card-title.directive';
import { HlmCardDirective } from '../../../../../../libs/ui/ui-card-helm/src/lib/hlm-card.directive';
import { HlmIconComponent } from '../../../../../../libs/ui/ui-icon-helm/src/lib/hlm-icon.component';
import { HlmInputDirective } from '../../../../../../libs/ui/ui-input-helm/src/lib/hlm-input.directive';
import { HlmLabelDirective } from '../../../../../../libs/ui/ui-label-helm/src/lib/hlm-label.directive';
import { HlmPopoverContentDirective } from '../../../../../../libs/ui/ui-popover-helm/src/lib/hlm-popover-content.directive';

type Framework = { label: string; value: string };

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    // BrnCommandImports,
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
  providers: [provideIcons({ lucideCheck, lucideChevronDown })],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public frameworks = [
    {
      label: 'AnalogJs',
      value: 'analogjs',
    },
    {
      label: 'Angular',
      value: 'angular',
    },
    {
      label: 'Vue',
      value: 'vue',
    },
    {
      label: 'Nuxt',
      value: 'nuxt',
    },
    {
      label: 'React',
      value: 'react',
    },
    {
      label: 'NextJs',
      value: 'nextjs',
    },
  ];

  public currentFramework = signal<Framework | undefined>(undefined);
  public state = signal<'closed' | 'open'>('closed');

  stateChanged(state: 'open' | 'closed') {
    this.state.set(state);
  }

  commandSelected(framework: Framework) {
    this.state.set('closed');
    if (this.currentFramework()?.value === framework.value) {
      this.currentFramework.set(undefined);
    } else {
      this.currentFramework.set(framework);
    }
  }
}
