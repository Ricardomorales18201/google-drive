// src/app/components/file-download/file-download.component.ts

import { Component, Input } from '@angular/core';
import { GoogleDriveService } from '../../services/google-drive.service';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html'
})
export class FileDownloadComponent {
  @Input() fileId!: string;

  constructor(private googleDriveService: GoogleDriveService) {}

  downloadFile() {
    this.googleDriveService.downloadFile(this.fileId).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded-file';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
