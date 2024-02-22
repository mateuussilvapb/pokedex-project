import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponentComponent } from './components/loading-component/loading-component.component';
import { PokeHeaderComponent } from './components/poke-header/poke-header.component';

@NgModule({
  declarations: [LoadingComponentComponent, PokeHeaderComponent],
  imports: [CommonModule],
  exports: [LoadingComponentComponent, PokeHeaderComponent],
})
export class SharedModule {}
