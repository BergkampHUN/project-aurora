import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiteTestComponent } from './mite-test/mite-test.component';

const routes: Routes = [
  {
    path: 'test',
    component: MiteTestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
