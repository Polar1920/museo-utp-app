import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticuloPage } from './articulo.page';

describe('ArticuloPage', () => {
  let component: ArticuloPage;
  let fixture: ComponentFixture<ArticuloPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ArticuloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
