import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BabiesComponent } from './babies.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('BabiesComponent', () => {
  let component: BabiesComponent;
  let fixture: ComponentFixture<BabiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BabiesComponent],
      imports: [HttpClientTestingModule]
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
});
