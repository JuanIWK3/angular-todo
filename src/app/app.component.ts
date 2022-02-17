import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tasks: Array<{ name: string; checked: boolean }> = JSON.parse(
    localStorage.getItem('tasks') || '[]'
  );

  addTaskForm = this.formBuilder.group({
    name: '',
    checked: false,
  });

  constructor(private formBuilder: FormBuilder) {}

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
