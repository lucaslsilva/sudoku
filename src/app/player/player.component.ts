import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit{
  @Input()
  grid: Item[][];

  constructor() { }

  ngOnInit(){
    console.log(this.grid);
  }

  validateValue(item: Item) {
    if (item.value != '' && (isNaN(item.value) || item.value < 1 || item.value > 9)) {
      item.value = '';
    }
    item.value = +item.value;

    if (item.class === 'wrong'){
      item.class = null;
    }
  }
}
