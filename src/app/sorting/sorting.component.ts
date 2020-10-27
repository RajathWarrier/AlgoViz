import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BarComponent } from '../bar/bar.component';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})

export class SortingComponent implements OnInit {
  size = 70;
  barList: BarComponent[] = [];
  constructor() { }

  ngOnInit() {
    this.changeList();
  }

  changeList() {
    for (let i = 0; i < this.size; i++) {
      const barComponent = new BarComponent(Math.floor(Math.random() * (this.size + 1)));
      this.barList.push(barComponent);
    }
  }
  // ALL SORTING LOGICS

  // Insertion Sort

  insertionSort(i: number, j: number) {
    if (i >= this.size) {
      this.barList[i - 1].color = '#3797a4';
      return;
    }
    if (i === 1) {
      this.barList[0].color = '#3797a4';
    }
    if (j <= 0 || this.barList[j].number >= this.barList[j - 1].number) {
      this.barList[i].color = '#3797a4';
      setTimeout(() => this.insertionSort(++i, i), 7.5);
    } else {
      const temp  = this.barList[j].number;
      this.barList[j].number = this.barList[j - 1].number;
      this.barList[j - 1].number = temp;
      setTimeout(() => this.insertionSort(i, --j), 75);
    }
  }

  // Selection Sort

  selectionSort(i: number, j: number, smallest: number) {
    console.log(`i-> ${i}, j-> ${j}, smallest-> ${smallest}`);
    if (i >= this.size - 1) {
      this.barList[i].color = '#3797a4';
      return;
    }
    if (j >= this.size) {
      const temp = this.barList[smallest].number;
      this.barList[smallest].number = this.barList[i].number;
      this.barList[i].number = temp;
      this.barList[i].color = '#3797a4';
      setTimeout(() => this.selectionSort(++i, i + 1, i), 15);
    } else {
      if (this.barList[smallest].number > this.barList[j].number) {
        smallest = j;
      }
      setTimeout(() => this.selectionSort(i, ++j, smallest), 15);
    }
  }

  // Bubble Sort
  bubbleSort(i: number, j: number) {
    if (i >= this.size - 1) {
      this.barList[0].color = '#3797a4';
      return;
    }
    if (j >= this.size - i - 1) {
      this.barList[j].color = '#3797a4';
      setTimeout(() => this.bubbleSort(++i, 0), 7.5);
    } else {
      if (this.barList[j].number > this.barList[j + 1].number) {
        const temp  = this.barList[j].number;
        this.barList[j].number = this.barList[j + 1].number;
        this.barList[j + 1].number = temp;
      }
      setTimeout(() => this.bubbleSort(i, ++j), 15);
    }

  }

  // Sample Sorting for reference while animating
  // Called -> sort(-1)
  sort(i: number) {
    if (i === -1) {
      this.barList[0].color = '#f05454';
      setTimeout(() => this.sort(++i), 500);
    }
    if (i >= this.size - 1) {
      this.barList[i].color = '#3797a4';
      return;
    }
    if (i >= 0) {
      this.barList[i].color = 'white';
    }
    const temp = this.barList[i].number;
    this.barList[i].number = this.barList[i + 1].number;
    this.barList[i + 1].color = '#f05454';
    this.barList[i + 1].number = temp;
    setTimeout(() => this.sort(++i), 500);
  }

}
