import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { GoogleDriveService } from '../../services/google-drive.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let googleDriveServiceSpy: jasmine.SpyObj<GoogleDriveService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GoogleDriveService', ['signIn', 'signOut', 'listFiles', 'setAccessToken']);
    spy.signIn.and.returnValue(of(void 0));
    spy.signOut.and.returnValue(of(void 0));
    spy.listFiles.and.returnValue(of({ files: [] }));

    await TestBed.configureTestingModule({
      imports: [AuthComponent, CommonModule],
      providers: [
        { provide: GoogleDriveService, useValue: spy }
      ]
    }).compileComponents();

    googleDriveServiceSpy = TestBed.inject(GoogleDriveService) as jasmine.SpyObj<GoogleDriveService>;
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isAuthenticated as false', () => {
    expect(component.isAuthenticated).toBeFalse();
  });

  it('should authenticate user when authenticate() is called', () => {
    component.authenticate();
    expect(googleDriveServiceSpy.signIn).toHaveBeenCalled();
  });

  it('should set isAuthenticated to true after successful authentication', () => {
    component.authenticate();
    fixture.detectChanges();
    expect(component.isAuthenticated).toBeTrue();
  });

  it('should load files after authentication', () => {
    component.authenticate();
    expect(googleDriveServiceSpy.listFiles).toHaveBeenCalled();
  });

  it('should clear authentication state on signOut', async () => {
    component.isAuthenticated = true;
    component.files = [{ id: '1', name: 'test.txt' }];
    
    await component.signOut();
    
    expect(component.isAuthenticated).toBeFalse();
    expect(component.files.length).toBe(0);
  });

  it('should handle OAuth redirect with access token', () => {
    const mockHash = '#access_token=test_token';
    spyOnProperty(window, 'location').and.returnValue({ hash: mockHash } as Location);
    
    component.ngOnInit();
    
    expect(component.isAuthenticated).toBeTrue();
    expect(googleDriveServiceSpy.setAccessToken).toHaveBeenCalledWith('test_token');
  });
});