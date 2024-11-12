import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileListComponent } from './file-list.component';
import { DatePipe } from '@angular/common';

describe('FileListComponent', () => {
  let component: FileListComponent;
  let fixture: ComponentFixture<FileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileListComponent ],
      providers: [ DatePipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display file list table headers correctly', () => {
    const compiled = fixture.nativeElement;
    const headers = compiled.querySelectorAll('th');
    expect(headers[0].textContent.trim()).toBe('File Name');
    expect(headers[1].textContent.trim()).toBe('Last Modified');
    expect(headers[2].textContent.trim()).toBe('Actions');
  });

  it('should render file items correctly', () => {
    const testFiles = [
      { id: '1', name: 'test1.txt', modifiedTime: new Date().toISOString() },
      { id: '2', name: 'test2.pdf', modifiedTime: new Date().toISOString() }
    ];
    component.files = testFiles;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const fileRows = compiled.querySelectorAll('tbody tr');
    expect(fileRows.length).toBe(2);
    expect(fileRows[0].querySelector('td').textContent.trim()).toBe('test1.txt');
  });

  it('should have working download and delete buttons for each file', () => {
    const testFile = { id: '1', name: 'test.txt', modifiedTime: new Date().toISOString() };
    component.files = [testFile];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent.trim()).toBe('Download');
    expect(buttons[1].textContent.trim()).toBe('Delete');
  });

  it('should handle file upload event', () => {
    spyOn(component, 'uploadFile');
    const compiled = fixture.nativeElement;
    const fileInput = compiled.querySelector('input[type="file"]');
    
    const mockEvent = { target: { files: [new File([''], 'test.txt')] } };
    fileInput.dispatchEvent(new Event('change'));
    
    expect(component.uploadFile).toHaveBeenCalled();
  });

  it('should track files by id', () => {
    const testFile = { id: '1', name: 'test.txt', modifiedTime: new Date().toISOString() };
    const trackByResult = component.trackById(0, testFile);
    expect(trackByResult).toBe('1');
  });
});
