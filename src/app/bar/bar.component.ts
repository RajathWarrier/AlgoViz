import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  number = 0;
  width = `${this.number * 10}px`;
  success: boolean;
  color: string;

  constructor(value: number) {
    this.number = value;
    this.success = false;
    this.color = '#e97171';
  }

  ngOnInit() {
  }

}
