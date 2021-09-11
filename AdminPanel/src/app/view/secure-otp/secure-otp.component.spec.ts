import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureOTPComponent } from './secure-otp.component';

describe('SecureOTPComponent', () => {
  let component: SecureOTPComponent;
  let fixture: ComponentFixture<SecureOTPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureOTPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
