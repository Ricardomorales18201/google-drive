// src/app/components/file-delete/file-delete.component.ts

import { Component, Input } from '@angular/core';
import { GoogleDriveService } from '../../services/google-drive.service';

@Component({
  selector: 'app-file-delete',
  templateUrl: './file-delete.component.html'
})
export class FileDeleteComponent {
  deleteSuccess(deleteSuccess: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  @Input() fileId!: string;

  constructor(private googleDriveService: GoogleDriveService) {}

  deleteFile() {
    this.googleDriveService.deleteFile(this.fileId).subscribe(() => {
      console.log('File deleted');
      alert('File deleted successfully!');
    });
  }
}
