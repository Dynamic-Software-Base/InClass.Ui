import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ai-sidebar-history',
  imports: [],
  template: '<div class="hidden">AI history placeholder</div>'
})
export class AiSidebarHistoryComponent {
  @Input() isSidebarOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();
}
