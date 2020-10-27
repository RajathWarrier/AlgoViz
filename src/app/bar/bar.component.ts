import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  number = 0;
  width = `${this.number * 10}px`;
  selected: boolean;
  color: string;

  constructor(value: number) {
    this.number = value;
    this.selected = false;
  }

  ngOnInit() {
  }

}
