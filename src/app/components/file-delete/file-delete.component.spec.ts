import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileDeleteComponent } from './file-delete.component';

describe('FileDeleteComponent', () => {
  let component: FileDeleteComponent;
  let fixture: ComponentFixture<FileDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render delete button', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe('Delete');
  });

  it('should call deleteFile method when delete button is clicked', () => {
    spyOn(component, 'deleteFile');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.deleteFile).toHaveBeenCalled();
  });

  it('should have correct button styling classes', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button.classList.contains('bg-red-500')).toBeTruthy();
    expect(button.classList.contains('text-white')).toBeTruthy();
    expect(button.classList.contains('rounded-md')).toBeTruthy();
  });
});
