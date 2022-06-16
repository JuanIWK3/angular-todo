import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Todo } from '../models/todo';
import { combineLatest, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  storedTheme: string | null = localStorage.getItem('theme-color');

  addTaskForm = this.formBuilder.group({
    title: '',
    completed: false,
  });

  initialTodos: Todo[] = JSON.parse(localStorage.getItem('tasks') || '[]');

  // todos = new BehaviorSubject<Todo[]>(this.initialTodos);

  constructor(private formBuilder: FormBuilder) {}

  get todos(): Observable<Todo[]> {
    return combineLatest([this.initialTodos]).pipe(
      tap(console.log),
      switchMap(() => {
        return of(this.initialTodos) as Observable<Todo[]>;
      })
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.initialTodos, event.previousIndex, event.currentIndex);
  }

  check(event: Event, i: number) {
    this.initialTodos[i].completed = !this.initialTodos[i].completed;
    localStorage.setItem('tasks', JSON.stringify(this.initialTodos));
  }

  deleteTask(index: number): void {
    this.initialTodos.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(this.initialTodos));
  }

  deleteAll() {
    const confirm = window.confirm('Delete all tasks?');
    if (confirm) {
      this.initialTodos = [];
      localStorage.removeItem('tasks');
    }
  }

  deleteCompleted() {
    const confirm = window.confirm('Delete all completed tasks?');
    if (confirm) {
      this.initialTodos = this.initialTodos.filter((todo) => !todo.completed);
      localStorage.setItem('tasks', JSON.stringify(this.initialTodos));
    }
  }

  onSubmit() {
    if (
      this.addTaskForm.value.title !== '' &&
      this.addTaskForm.value.title !== null
    ) {
      this.initialTodos.push(this.addTaskForm.value);
      this.addTaskForm.reset();
      localStorage.setItem('tasks', JSON.stringify(this.initialTodos));
    }
  }
}
