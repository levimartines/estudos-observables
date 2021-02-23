import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.css']
})
export class HotObservablesComponent implements OnInit, OnDestroy {
  @ViewChild('myButton', {static: true}) button?: ElementRef;
  number1 = 0;
  number2 = 0;
  string1 = 'Initialized';
  string2 = 'Wait for button click';
  p = new Producer();

  constructor() {
  }

  ngOnInit(): void {
    this.p.start();
    this.p.addListener((next: any) => this.number1 = next);

    console.log(this.button);

    const myBtnClickObservable: Observable<any> = fromEvent(this.button?.nativeElement, 'click');
    myBtnClickObservable.subscribe(() => {
      this.string2 = 'Initialized';
      this.p.addListener((next: any) => this.number2 = next);
    });
  }

  ngOnDestroy(): void {
    this.p.stop();
  }
}

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
    }, 500);
  }

  stop(): void {
    clearInterval(this.id);
  }
}
