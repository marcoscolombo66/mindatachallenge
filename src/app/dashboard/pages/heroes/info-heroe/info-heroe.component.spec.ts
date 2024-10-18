import { ComponentFixture, TestBed } from '@angular/core/testing';
import InfoComponent from '@dashboard/pages/heroes/info-heroe/info-heroe.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('HeroesComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoComponent, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
