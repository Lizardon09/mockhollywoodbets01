import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccergamesComponent } from './soccergames.component';

describe('SoccergamesComponent', () => {
  let component: SoccergamesComponent;
  let fixture: ComponentFixture<SoccergamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoccergamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoccergamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
