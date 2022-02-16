import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tasks: Array<{ name: string }> = JSON.parse(
    localStorage.getItem('tasks') || '[]'
  );

  addTaskForm = this.formBuilder.group({
    name: '',
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    if (
      this.addTaskForm.value.name !== '' &&
      this.addTaskForm.value.name !== null
    ) {
      console.log(this.addTaskForm.value);
      this.tasks.push(this.addTaskForm.value);
      this.addTaskForm.reset();
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
}
