import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { SudokuSolver } from '@jlguenego/sudoku-generator';
import { MatSnackBar } from '@angular/material/snack-bar';

export type Difficulty = 'easy' | 'moderate' | 'hard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sudoku';
  numericGrid: number[][];
  grid: Item[][] = [];
  difficulty: Difficulty = 'easy';

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.newGame();
  }

  newGame(){
    const tempGrid = SudokuSolver.generate();
    this.numericGrid = SudokuSolver.carve(tempGrid, this.numberOfEmptyFields);
    let solution = SudokuSolver.getAllSolution(this.numericGrid)[0];

    for(let i=0; i<9; i=i+3){
      this.grid[i] = [];
      this.grid[i+1] = [];
      this.grid[i+2] = [];
      for(let k=i; k<i+3; k++){
        for(let j=0; j<3; j++){
          this.grid[i].push(this.createItem(this.numericGrid[k][j], solution[k][j]));
        }
        for(let j=3; j<6; j++){
          this.grid[i+1].push(this.createItem(this.numericGrid[k][j], solution[k][j]));
        }
        for(let j=6; j<9; j++){
          this.grid[i+2].push(this.createItem(this.numericGrid[k][j], solution[k][j]));
        }
      }
    }
  }

  checkGame() {
    for(let i=0; i<9; i++){
      for(let j=0; j<9; j++){
        if (this.grid[i][j].value == '' || this.grid[i][j].value !== this.grid[i][j].answer){
          this.grid[i][j].class = 'wrong'
          this._snackBar.open(`Value is wrong!`, 'Close', { duration: 5000 });
          return;
        }
      }
    }

    this._snackBar.open(`Consgratulations! Your solution is correct!`, 'Close', { duration: 2000 });
  }

  private createItem(value: number, answer: number){
    return <Item>{
      value: value != 0 ? value : '',
      answer: answer,
      disabled: value != 0
    }
  }

  private get numberOfEmptyFields(): number {
    switch (this.difficulty) {
      case 'easy':
        return 35;
      case 'moderate':
        return 45;
      case 'hard':
        return 55;
    }
  }
}
