import {Component, signal, WritableSignal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FieldComponent} from "./components/field/field.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FieldComponent, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  // -1 = X
  // 1 = O
  protected readonly winner: WritableSignal<number> = signal(0);
  protected readonly grid: WritableSignal<number[][]> = signal([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);

  protected readonly Turn : WritableSignal<number> = signal(-1);

  public SwapTurn() {
    this.Turn.update(turn => turn === -1 ? 1 : -1);
  }

  protected UpdateGrid(row: number, col: number) {
    if (this.winner() !== 0) return;
    this.grid.update(grid => {
      if (grid[row][col] === 0) {
        grid[row][col] = this.Turn();
        this.SwapTurn();
        this.winner.set(this.DetermineWinner(grid));
      }
      return grid;
    });
  }

  protected ResetGame() {
    this.winner.set(0);
    this.grid.update(grid => {
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
          grid[row][col] = 0;
        }
      }
      return grid;
    });
  }

  private DetermineWinner(grid: number[][]): number {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      const rowSum = grid[i][0] + grid[i][1] + grid[i][2];
      const colSum = grid[0][i] + grid[1][i] + grid[2][i];
      if (rowSum === 3 || colSum === 3) return 1;
      if (rowSum === -3 || colSum === -3) return -1;
    }

    // Check diagonals
    const diag1Sum = grid[0][0] + grid[1][1] + grid[2][2];
    const diag2Sum = grid[0][2] + grid[1][1] + grid[2][0];
    if (diag1Sum === 3 || diag2Sum === 3) return 1;
    if (diag1Sum === -3 || diag2Sum === -3) return -1;

    if(grid.every(row => row.every(cell => cell !== 0))) return 404;
    // No winner
    return 0;
  }
}
