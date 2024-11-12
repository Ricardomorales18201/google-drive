// src/app/app.component.ts

import { Component } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { FileListComponent } from './components/file-list/file-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AuthComponent,
    FileListComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'take-home-test';

 }
