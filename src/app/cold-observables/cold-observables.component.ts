import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-cold-observables',
  templateUrl: './cold-observables.component.html',
  styleUrls: ['./cold-observables.component.css']
})
export class ColdObservablesComponent implements OnInit, OnDestroy {

  subscription$: Subscription = new Subscription();
  subscription$2: Subscription = new Subscription();
  number1 = 0;
  string1 = 'Initializing....';
  number2 = 0;
  string2 = 'Initializing....';

  constructor() {
  }

  ngOnInit(): void {
    /*
    Cold Observable: cada vez que o observable é chamado,
    os dados fornecidos são produzidos por fontes diferentes.
    No exemplo abaixo, independente do momento em que for feita
    a inscrição no observable, ele começará a fornecer os valores a partir do 0
    */

    const myColdObservable = new Observable((observer: Observer<number>) => {
      let cont = 0;
      const interval = setInterval(() => {
        cont++;
        console.log('Value from Observable: ' + cont);
        observer.next(cont);
        if (cont === 10) {
          observer.complete();
        }
      }, 1000);
      return () => clearInterval(interval);
    });

    this.subscription$ = myColdObservable.subscribe(
      next => this.number1 = next,
      error => this.string1 = 'Error: ' + error,
      () => this.string1 = 'Completed'
    );

    const interval2 = setInterval(() => {
      clearInterval(interval2);
      this.subscription$2 = myColdObservable.subscribe(
        next => this.number2 = next,
        error => this.string2 = 'Error: ' + error,
        () => this.string2 = 'Completed'
      );
    }, 3000);

    console.log('end of ngOnInit');
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription$2.unsubscribe();
  }

}
