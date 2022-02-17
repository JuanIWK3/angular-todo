import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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
