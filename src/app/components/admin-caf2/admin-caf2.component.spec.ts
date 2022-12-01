import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCaf2Component } from './admin-caf2.component';

describe('AdminCaf2Component', () => {
  let component: AdminCaf2Component;
  let fixture: ComponentFixture<AdminCaf2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCaf2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCaf2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
