import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  @Input() grid: Item[][];
  @Output() checkGame = new EventEmitter<void>();

  validateItem(item: Item) {
    if (item.value != '' && (isNaN(item.value) || item.value < 1 || item.value > 9)) {
      item.value = '';
      return;
    }
    item.value = +item.value;

    if (item.class === 'wrong'){
      item.class = null;
    }

    if(this.isCompleted()){
      this.checkGame.emit();
    }
  }

  selectItem(selectedItem: Item) {   
    if (selectedItem.value !== '') {
      this.grid.map(row => row.map(item => {
        if (item.value == selectedItem.value) {
          item.class = 'selected';
        }
        else {
          item.class = null
        }
      }));
    }
    else {
      this.grid.map(row => row.map(item => item.class = null));
    }
  }

  private isCompleted() {
    return this.grid.every(row => row.every(item => item.value !== ''));
  }
}
