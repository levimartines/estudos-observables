import { Injectable } from '@angular/core';
import { ConnectableObservable, Observable, Observer } from 'rxjs';
import { DataModel } from './data.model';
import { publish } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RandomDataService {
  public dataObservable: ConnectableObservable<DataModel>;

  constructor() {
    this.dataObservable = new Observable(
      (observer: Observer<DataModel>) => {
        console.log('Observer created!');
        let counter = 0;

        const f = () => {
          counter++;
          console.log(counter);
          if (counter < 10) {
            const timestamp = Math.round(Math.random() * 2000 + 500);
            observer.next({timestamp, data: counter});
            setTimeout(f, timestamp);
          } else {
            observer.complete();
          }
        };
        f();
      }
    ).pipe(publish()) as ConnectableObservable<DataModel>;
  }
}
