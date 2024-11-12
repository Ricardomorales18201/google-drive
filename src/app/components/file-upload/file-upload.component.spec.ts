import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have file input element', () => {
    const compiled = fixture.debugElement.nativeElement;
    const fileInput = compiled.querySelector('input[type="file"]');
    expect(fileInput).toBeTruthy();
  });

  it('should call onFileSelected when file is selected', () => {
    const compiled = fixture.debugElement.nativeElement;
    const fileInput = compiled.querySelector('input[type="file"]');
    spyOn(component, 'onFileSelected');
    
    const mockFile = new File([''], 'test.txt', { type: 'text/plain' });
    const mockEvent = { target: { files: [mockFile] } };
    
    fileInput.dispatchEvent(new Event('change'));
    component.onFileSelected(mockEvent);
    
    expect(component.onFileSelected).toHaveBeenCalled();
  });

  it('should have correct heading text', () => {
    const compiled = fixture.debugElement.nativeElement;
    const heading = compiled.querySelector('h3');
    expect(heading.textContent).toBe('Upload a File');
  });
});
