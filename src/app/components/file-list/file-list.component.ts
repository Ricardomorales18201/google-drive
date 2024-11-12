// src/app/components/file-list/file-list.component.ts

import { Component, OnInit } from '@angular/core';
import { GoogleDriveService } from '../../services/google-drive.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class FileListComponent implements OnInit {
  files: any[] = [];
  trackById(index: number, file: any): string {
    return file.id;
  }
  
  constructor(private googleDriveService: GoogleDriveService) {}

  ngOnInit() {
    this.listFiles();
  }

  listFiles() {
    this.googleDriveService.listFiles().subscribe((response) => {
      this.files = response.files;
    });
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.googleDriveService.uploadFile(file).subscribe((response) => {
      console.log('File uploaded:', response);
      this.listFiles(); // Refresh the list after upload
    });
  }

  downloadFile(fileId: string) {
    this.googleDriveService.downloadFile(fileId).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded-file';
      a.click();
    });
  }

  deleteFile(fileId: string) {
    this.googleDriveService.deleteFile(fileId).subscribe(() => {
      console.log('File deleted');
      this.listFiles(); // Refresh the list after deletion
    });
  }
}
