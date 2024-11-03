import {Component, signal, WritableSignal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FieldComponent} from "./components/field/field.component";
import {of} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FieldComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  // -1 = X
  // 1 = O
  public readonly grid: WritableSignal<number[][]> = signal([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);

  private Turn : WritableSignal<number> = signal(-1);

  public SwapTurn() {
    this.Turn.update(turn => turn === -1 ? 1 : -1);
  }


  protected readonly of = of;
}
