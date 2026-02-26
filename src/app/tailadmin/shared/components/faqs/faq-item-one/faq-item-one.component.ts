import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-faq-item-one',
  imports: [CommonModule],
  template: '<div class="rounded-lg border border-gray-200 p-4 dark:border-gray-800"><h4 class="font-medium">{{ title }}</h4><p class="mt-2 text-sm text-gray-500">{{ content }}</p></div>'
})
export class FaqItemOneComponent {
  @Input() title = '';
  @Input() content = '';
  @Input() isOpen = false;
  @Input() toggleAccordion: (() => void) | null = null;
}
