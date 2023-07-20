import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NarrationPage } from './narration.page';

describe('NarrationPage', () => {
  let component: NarrationPage;
  let fixture: ComponentFixture<NarrationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NarrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
