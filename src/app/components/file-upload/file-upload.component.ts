// src/app/components/file-upload/file-upload.component.ts

import { Component } from '@angular/core';
import { GoogleDriveService } from '../../services/google-drive.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent {
  constructor(private googleDriveService: GoogleDriveService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.googleDriveService.uploadFile(file).subscribe((response) => {
        console.log('File uploaded:', response);
        alert('File uploaded successfully!');
      });
    }
  }
}
