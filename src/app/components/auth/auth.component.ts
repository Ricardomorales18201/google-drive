import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GoogleDriveService } from '../../services/google-drive.service';
import { Observable, from } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class AuthComponent implements OnInit {
  isAuthenticated = false;
  private readonly apiUrl = 'https://www.googleapis.com/drive/v3/files';
  private readonly uploadUrl = 'https://www.googleapis.com/upload/drive/v3/files';
  private readonly authUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  private accessToken = '';
  private clientId = 'YOUR_GOOGLE_CLIENT_ID';
  files: any[] = [];

  constructor(
    private googleDriveService: GoogleDriveService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Only initialize in the browser
      this.initializeAccessTokenFromUrl();
    }
  }

  authenticate() {
    this.googleDriveService.signIn().subscribe(() => {
      this.isAuthenticated = true;
      this.loadFiles();
    });
  }

  private loadFiles() {
    this.googleDriveService.listFiles().subscribe(
      response => {
        this.files = response.files;
        console.log('Files loaded:', this.files);
      },
      error => {
        console.error('Error loading files:', error);
      }
    );
  }

  signIn(): Observable<void> {
    if (isPlatformBrowser(this.platformId)) {
      const redirectUri = window.location.origin;
      const scope = 'https://www.googleapis.com/auth/drive.file';
      const authUrl = `${this.authUrl}?client_id=${this.clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
      window.location.href = authUrl;
    }
    return from(Promise.resolve());
  }

  async signOut() {
    try {
      await this.googleDriveService.signOut();
      if (isPlatformBrowser(this.platformId)) {
        window.location.href = '/';
      }
      this.isAuthenticated = false;
      this.files = [];
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  }

  private initializeAccessTokenFromUrl() {
    if (isPlatformBrowser(this.platformId)) {
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        if (accessToken) {
          this.googleDriveService.setAccessToken(accessToken);
          this.isAuthenticated = true;
          this.loadFiles();
        }
      }
    }
  }
}
