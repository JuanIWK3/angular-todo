import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ITaskList } from './model/task-list';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  storedTheme: string = localStorage.getItem('theme') || '';
  isDarkTheme: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.storedTheme == 'dark') {
      this.isDarkTheme = true;
      document.body.classList.add('dark-theme');
    }
  }
}
