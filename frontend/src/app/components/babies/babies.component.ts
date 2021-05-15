import { Component, OnInit } from '@angular/core';
import { BabiesService } from '../../services/babies.service';

@Component({
  selector: 'app-babies',
  templateUrl: './babies.component.html',
  styleUrls: ['./babies.component.scss']
})
export class BabiesComponent implements OnInit {

  public babies: unknown;

  constructor(private babiesService: BabiesService) { }

  ngOnInit(): void {
    this.babiesService.getBabies().subscribe((response: unknown) => this.babies = response);
  }

}
