import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.css']
})
export class HotObservablesComponent implements OnInit {
  @ViewChild('myButton', {static: true}) button?: ElementRef;
  number1 = 0;
  number2 = 0;
  string1 = 'Initialized';
  string2 = 'Wait for button click';

  constructor() {
  }

  ngOnInit(): void {
    class Producer {
      private myListeners: any[] = [];
      private n = 0;
      private id: any;

      addListener(lister: any): void {
        this.myListeners.push(lister);
      }

      start(): void {
        this.id = setInterval(() => {
          this.n++;
          this.myListeners.forEach(lister => lister(this.n));
        }, 1000);
      }

      stop(): void {
        clearInterval(this.id);
      }
    }

    const p = new Producer();
    p.start();
    p.addListener((next: any) => this.number1 = next);

    console.log(this.button);

    const myBtnClickObservable: Observable<any> = fromEvent(this.button?.nativeElement, 'click');
    myBtnClickObservable.subscribe(() => {
      this.string2 = 'Initialized';
      p.addListener((next: any) => this.number2 = next);
    });
  }

}
