import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent {
  storedTheme: string = localStorage.getItem('theme') || '';
  isDarkTheme: boolean = false;

  constructor(private router: Router) {}
  checked: boolean = false;

  ngOnInit(): void {
    if (this.storedTheme == 'dark') {
      this.isDarkTheme = true;
      document.body.classList.add('dark-theme');
    }
  }

  todo() {
    console.log('a');

    this.router.navigateByUrl('/');
  }

  setTheme() {
    if (!this.isDarkTheme) {
      this.isDarkTheme = true;
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      this.isDarkTheme = false;
      console.log('a');
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
