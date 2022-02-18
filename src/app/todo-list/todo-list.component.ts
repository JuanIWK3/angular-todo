import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ITaskList } from '../model/task-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  tasks: Array<ITaskList> = JSON.parse(localStorage.getItem('tasks') || '[]');

  storedTheme: string | null = localStorage.getItem('theme-color');

  addTaskForm = this.formBuilder.group({
    name: '',
    checked: false,
  });

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  check(event: Event, i: number) {
    let checked = (event.target as HTMLInputElement).checked;

    this.tasks[i].checked = checked;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  deleteTask(event: number): void {
    this.tasks.splice(event, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  deleteAll() {
    const confirm = window.confirm('Delete all tasks?');
    if (confirm) {
      this.tasks = [];
      localStorage.removeItem('tasks');
    }
  }

  onSubmit() {
    if (
      this.addTaskForm.value.name !== '' &&
      this.addTaskForm.value.name !== null
    ) {
      this.tasks.push(this.addTaskForm.value);
      this.addTaskForm.reset();
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
}
