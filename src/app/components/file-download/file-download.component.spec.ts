import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileDownloadComponent } from './file-download.component';

describe('FileDownloadComponent', () => {
  let component: FileDownloadComponent;
  let fixture: ComponentFixture<FileDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render download button', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe('Download');
  });

  it('should call downloadFile method when button is clicked', () => {
    spyOn(component, 'downloadFile');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.downloadFile).toHaveBeenCalled();
  });

  it('should have correct button styling classes', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button.classList.contains('text-white')).toBeTruthy();
    expect(button.classList.contains('bg-blue-500')).toBeTruthy();
    expect(button.classList.contains('rounded-md')).toBeTruthy();
  });
});
