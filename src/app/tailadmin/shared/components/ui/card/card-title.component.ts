import { Component } from '@angular/core';

@Component({
  selector: 'app-card-title',
  imports: [],
  template: '<h3 class="text-base font-semibold text-gray-800 dark:text-white/90"><ng-content /></h3>'
})
export class CardTitleComponent {}
