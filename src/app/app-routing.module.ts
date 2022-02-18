import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './config/config.component';
import { TaskConfigComponent } from './task-config/task-config.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [{ path: '', component: TodoListComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
