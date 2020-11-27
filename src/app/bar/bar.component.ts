import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  number = 0;
  success = false;
  color = '#e97171';

  constructor() { }

  ngOnInit() {
  }

}
