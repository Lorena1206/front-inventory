import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenaComponent } from './sidena.component';

describe('SidenaComponent', () => {
  let component: SidenaComponent;
  let fixture: ComponentFixture<SidenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenaComponent]
    });
    fixture = TestBed.createComponent(SidenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
