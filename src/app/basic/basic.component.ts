import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit, OnDestroy {

  subscription$: Subscription = new Subscription();
  subscription$2: Subscription = new Subscription();
  myObservable = new Observable((observer: Observer<number>) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.next(5);
    observer.error('error before complete');
    observer.complete();
  });
  number1 = 0;
  string1 = 'Initializing....';
  number2 = 0;
  string2 = 'Initializing....';

  constructor() {
  }

  ngOnInit(): void {
    this.myObservable.subscribe(
      next => console.log(next),
      error => console.error(error),
      () => console.log('completed')
    );

    // const timerCount = interval(1000);
    // timerCount.subscribe(next => console.log(next));

    const myInterval = new Observable((observer: Observer<number>) => {
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

    this.subscription$ = myInterval.subscribe(
      next => this.number1 = next,
      error => this.string1 = 'Error: ' + error,
      () => this.string1 = 'Completed'
    );

    const interval2 = setInterval(() => {
      clearInterval(interval2);
      this.subscription$2 = myInterval.subscribe(
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
