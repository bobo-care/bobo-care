import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BabiesComponent } from './babies.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BabiesService } from '../../services/babies.service';
import { of } from 'rxjs';

describe('BabiesComponent', () => {
  let component: BabiesComponent;
  let fixture: ComponentFixture<BabiesComponent>;
  const babiesServiceSpy = jasmine.createSpyObj<BabiesService>(['getBabies']);
  babiesServiceSpy.getBabies.and.callFake(() => of({}));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BabiesComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: BabiesService,
          useValue: babiesServiceSpy
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BabiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch babies', () => {
    expect(babiesServiceSpy.getBabies).toHaveBeenCalled();
  });
});
