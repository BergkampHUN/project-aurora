import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiteTestComponent } from './mite-test.component';

describe('MiteTestComponent', () => {
  let component: MiteTestComponent;
  let fixture: ComponentFixture<MiteTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiteTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiteTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
