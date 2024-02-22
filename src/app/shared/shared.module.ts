import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponentComponent } from './components/loading-component/loading-component.component';

@NgModule({
  declarations: [LoadingComponentComponent],
  imports: [CommonModule],
  exports: [LoadingComponentComponent],
})
export class SharedModule {}
