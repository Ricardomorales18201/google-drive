import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {
  private readonly apiUrl = 'https://www.googleapis.com/drive/v3/files';
  private readonly uploadUrl = 'https://www.googleapis.com/upload/drive/v3/files';
  private readonly authUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  private accessToken = '';
  private clientId = '1034212073638-fg43knh5vovkrqsle356altckefp0euc.apps.googleusercontent.com';

  constructor(private http: HttpClient) {}

  signIn(): Observable<void> {
    const redirectUri = window.location.origin;
    const scope = 'https://www.googleapis.com/auth/drive.file';
    const authUrl = `${this.authUrl}?client_id=${this.clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
    
    window.location.href = authUrl;
    return from(Promise.resolve());
  }

  signOut(): Observable<void> {
    this.accessToken = '';
    return from(Promise.resolve());
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    });
  }

  listFiles(): Observable<any> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams()
      .set('fields', 'files(id, name, mimeType, modifiedTime)')
      .set('pageSize', '10');
    return this.http.get(this.apiUrl, { headers, params });
  }

  uploadFile(file: File, folderId?: string): Observable<any> {
    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: folderId ? [folderId] : []
    };

    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    formData.append('file', file);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`
    });

    return this.http.post(`${this.uploadUrl}?uploadType=multipart`, formData, { headers });
  }

  downloadFile(fileId: string): Observable<Blob> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}/${fileId}?alt=media`;
    return this.http.get(url, { headers, responseType: 'blob' });
  }

  deleteFile(fileId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}/${fileId}`;
    return this.http.delete(url, { headers });
  }
}
