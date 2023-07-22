import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntegrantesPage } from './integrantes.page';

describe('IntegrantesPage', () => {
  let component: IntegrantesPage;
  let fixture: ComponentFixture<IntegrantesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IntegrantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
