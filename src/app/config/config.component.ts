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
  sunIcon = '../../assets/icons/sun.svg';
  moonIcon = '../../assets/icons/moon.svg';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.storedTheme == 'dark') {
      this.isDarkTheme = true;
      document.body.classList.add('dark-theme');
    }
  }

  setTheme() {
    if (localStorage.getItem('theme') !== 'dark') {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      this.isDarkTheme = true;
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.removeItem('theme');
      this.isDarkTheme = false;
    }
  }
}
