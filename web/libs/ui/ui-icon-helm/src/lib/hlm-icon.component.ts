import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { IconName, NgIconComponent } from '@ng-icons/core';
import { hlm } from '@spartan-ng/ui-core';
import { cva } from 'class-variance-authority';
import { ClassValue } from 'clsx';

const DEFINED_SIZES = ['xs', 'sm', 'base', 'lg', 'xl', 'none'] as const;

type DefinedSizes = (typeof DEFINED_SIZES)[number];

export const iconVariants = cva('inline-flex', {
  variants: {
    variant: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      base: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
      none: '',
    } satisfies Record<DefinedSizes, string>,
  },
  defaultVariants: {
    variant: 'base',
  },
});

export type IconSize = DefinedSizes | string;

const isDefinedSize = (size: IconSize): size is DefinedSizes => {
  return DEFINED_SIZES.includes(size as DefinedSizes);
};

const TAILWIND_H_W_PATTERN = /\b(h-\d+|w-\d+)\b/g;

@Component({
  selector: 'hlm-icon',
  standalone: true,
  imports: [NgIconComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-icon
      [class]="ngIconCls()"
      [size]="ngIconSize()"
      [name]="_name()"
      [color]="_color()"
      [strokeWidth]="_strokeWidth()"
    />
  `,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmIconComponent implements OnDestroy {
  public readonly _host = inject(ElementRef);
  public readonly _platformId = inject(PLATFORM_ID);

  public _mutObs?: MutationObserver;

  public readonly _hostClasses = signal<string>('');

  public readonly _name = signal<IconName | string>('');
  public readonly _size = signal<IconSize>('base');
  public readonly _color = signal<string | undefined>(undefined);
  public readonly _strokeWidth = signal<string | number | undefined>(undefined);
  public readonly userCls = signal<ClassValue>('');
  public readonly ngIconSize = computed(() =>
    isDefinedSize(this._size()) ? '100%' : (this._size() as string)
  );
  public readonly ngIconCls = signal<ClassValue>('');

  public readonly _computedClass = computed(() => {
    const size: IconSize = this._size();
    const variant = isDefinedSize(size) ? size : 'none';
    const hostClasses =
      variant === 'none'
        ? this._hostClasses().replace(TAILWIND_H_W_PATTERN, '')
        : this._hostClasses();

    return hlm(iconVariants({ variant }), this.userCls(), hostClasses);
  });

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      this._mutObs = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach((mutation: MutationRecord) => {
          if (mutation.attributeName !== 'class') return;
          this._hostClasses.set(
            (mutation.target as Node & { className?: string })?.className ?? ''
          );
        });
      });
      this._mutObs.observe(this._host.nativeElement, {
        attributes: true,
      });
    }
  }

  ngOnDestroy() {
    this._mutObs?.disconnect();
    this._mutObs = undefined;
  }

  @Input()
  set name(value: IconName | string) {
    this._name.set(value);
  }

  @Input()
  set size(value: IconSize) {
    this._size.set(value);
  }

  @Input()
  set color(value: string | undefined) {
    this._color.set(value);
  }

  @Input()
  set strokeWidth(value: string | number | undefined) {
    this._strokeWidth.set(value);
  }

  @Input()
  set ngIconClass(cls: ClassValue) {
    this.ngIconCls.set(cls);
  }

  @Input()
  set class(cls: ClassValue) {
    this.userCls.set(cls);
  }
}
