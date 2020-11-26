import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { BarComponent } from '../bar/bar.component';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})

export class SortingComponent implements OnInit {

  size = 30;
  speed = 75;
  barList: BarComponent[];
  sorting: boolean;
  sorted: boolean;

  constructor() { }

  ngOnInit() {
    this.changeList();
    this.sorting = false;
    this.sorted = false;
  }

  changeList() {
    this.barList = [];
    for (let i = 0; i < this.size; i++) {
      const barComponent = new BarComponent(Math.floor(Math.random() * (this.size + 1)));
      this.barList.push(barComponent);
    }
    this.sorted = false;
  }

  formatLabel(value: number) {
    return value;
  }

  onSizeChange(event: MatSliderChange) {
    console.log(`Size changed to: ${event.value}`);
    this.size = event.value;
    this.changeList();
  }

  onSpeedChange(event: MatSliderChange) {
    console.log(`Speed changed to: ${400 - event.value}`);
    this.speed = 400 - event.value;
  }

  isSorted(): boolean {
    for (let i = 0; i < this.size - 1; i++) {
      if (this.barList[i].number > this.barList[i + 1].number) {
        return false;
      }
    }
    return true;
  }
  // ALL SORTING ALGORITHMS

  // Insertion Sort

  insertionSort(i: number, j: number) {
    if (i >= this.size) {
      this.barList[i - 1].color = '#55e9bc';
      this.sorting = false;
      this.sorted = true;
      return;
    }
    this.sorting = true;
    if (i === 1) {
      this.barList[0].color = '#55e9bc';
    }
    if (j <= 0 || this.barList[j].number >= this.barList[j - 1].number) {
      this.barList[i].success = true;
      this.barList[j + 1].color = '#e97171';
      for (let k = 0; k <= i; k++) {
        if (this.barList[k].success) {
          this.barList[k].color = '#55e9bc';
        }
      }
      setTimeout(() => this.insertionSort(++i, i), this.speed);
    } else {
      this.barList[j - 1].color = '#3498db';
      this.barList[j].color = '#55e9bc';
      const temp  = this.barList[j].number;
      this.barList[j].number = this.barList[j - 1].number;
      this.barList[j - 1].number = temp;
      setTimeout(() => this.insertionSort(i, --j), this.speed);
    }
  }

  // Selection Sort

  selectionSort(i: number, j: number, smallest: number) {
    if (i >= this.size - 1) {
      this.barList[i].color = '#55e9bc';
      this.sorting = false;
      this.sorted = true;
      return;
    }
    this.sorting = true;
    this.barList[j - 1].color = '#e97171';
    this.barList[smallest].color = '#776d8a';
    if (j >= this.size) {
      const temp = this.barList[smallest].number;
      this.barList[smallest].number = this.barList[i].number;
      this.barList[i].number = temp;
      this.barList[i].color = '#55e9bc';
      // this.barList[smallest].color = '#e97171';
      setTimeout(() => this.selectionSort(++i, i + 1, i), this.speed);
    } else {
      this.barList[j].color = '#3498db';
      if (this.barList[smallest].number > this.barList[j].number) {
        this.barList[smallest].color = '#e97171';
        smallest = j;
      }
      setTimeout(() => this.selectionSort(i, ++j, smallest), this.speed);
    }
  }

  // Bubble Sort
  bubbleSort(i: number, j: number) {
    if (i >= this.size - 1) {
      this.barList[0].color = '#55e9bc';
      this.sorting = false;
      this.sorted = true;
      return;
    }
    this.sorting = true;
    if (j >= this.size - i - 1) {
      this.barList[j].color = '#55e9bc';
      setTimeout(() => this.bubbleSort(++i, 0), this.speed);
    } else {
      this.barList[j].color = '#e97171';
      if (this.barList[j].number > this.barList[j + 1].number) {
        const temp  = this.barList[j].number;
        this.barList[j].number = this.barList[j + 1].number;
        this.barList[j + 1].number = temp;
        this.barList[j + 1].color = '#3498db';
      }
      setTimeout(() => this.bubbleSort(i, ++j), this.speed);
    }

  }

  // Quick Sort

  quickSort(i: number, k: number) {
    if (i >= k) {
      this.barList[i].color = '#55e9bc';
      this.sorting = false;
      return;
    }
    this.sorting = true;
    let l = i;
    let h = k;
    const midPoint: number = Math.floor((l + h) / 2);
    const pivot = this.barList[midPoint].number;
    let done = false;

    while (!done) {
      while (this.barList[l].number < pivot) {
        l++;
      }
      while (this.barList[h].number > pivot) {
        h--;
      }
      if (l >= h) {
        done = true;
      } else {
        const temp = this.barList[l].number;
        this.barList[l].number = this.barList[h].number;
        this.barList[h].number = temp;
        l++;
        h--;
      }
    }
    this.barList[h].color = '#55e9bc';
    const j = h;

    setTimeout(() => this.quickSort(i, j), this.speed);
    setTimeout(() => this.quickSort(j + 1, k), this.speed);
  }

  // Merge Sort
  merge(l: number, m: number, r: number) {
    const n1 = m - l + 1;
    const n2 = r - m;

    const L: number[] = [];
    const R: number[] = [];
    for (let x = 0; x < n1; x++) {
      L[x] = this.barList[l + x].number;
    }
    for (let x = 0; x < n2; x++) {
      R[x] = this.barList[m + 1 + x].number;
    }
    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        this.barList[k].number = L[i];
        i++;
      } else {
        this.barList[k].number = R[j];
        j++;
      }
      k++;
    }

    while (i < n1) {
      this.barList[k].number = L[i];
      i++;
      k++;
    }
    while (j < n2) {
      this.barList[k].number = R[j];
      j++;
      k++;
    }
    for (let y = l; y < r; y++) {
      this.barList[y].color = '#55e9bc';
    }
  }

  // Splits Array subsequently and then calls the merge function
  mergeSort(n: number, leftStart: number, currSize: number) {
    if (currSize > n - 1) {
      this.barList[n - 1].color = '#55e9bc';
      this.sorting = false;
      this.sorted = true;
      return;
    }
    this.sorting = true;
    if (leftStart >= n - 1) {
      setTimeout(() => this.mergeSort(n, 0, 2 * currSize), this.speed);
    } else {
      const mid = Math.min(leftStart + currSize - 1, n - 1);
      const rightEnd = Math.min(leftStart + 2 * currSize - 1, n - 1);
      this.merge(leftStart, mid, rightEnd);
      setTimeout(() => this.mergeSort(n, leftStart + 2 * currSize, currSize), this.speed);
    }
  }

}
