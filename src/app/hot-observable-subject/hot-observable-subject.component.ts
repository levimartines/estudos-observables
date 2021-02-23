import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

@Component({
  selector: 'app-hot-observable-subject',
  templateUrl: './hot-observable-subject.component.html',
  styleUrls: ['./hot-observable-subject.component.css']
})
export class HotObservableSubjectComponent implements OnInit {
  counter = 0;
  number1 = 0;
  number2 = 0;
  string1 = 'Initialized';
  string2 = 'Wait for button click';
  myObservable?: Observable<number>;

  constructor() {
  }

  ngOnInit(): void {
    this.myObservable = new Observable((observer: Observer<number>) => {
      let i = 0;
      setInterval(() => {
        i++;
        this.counter = i;
        i === 100 ? observer.complete() : observer.next(i);
      }, 500);
    });
    this.usingSubjects();
  }

  usingSubjects(): void {
    const subject = new Subject<number>();
    this.myObservable?.subscribe(subject);

    this.string1 = 'Waiting for interval...';
    this.string2 = 'Waiting for interval...';

    const timer1 = setTimeout(() => subject.subscribe(n => {
      this.number1 = n;
      this.string1 = 'OK';
      clearTimeout(timer1);
    }), 2000);

    const timer2 = setTimeout(() => subject.subscribe(n => {
      this.number2 = n;
      this.string2 = 'OK';
      clearTimeout(timer2);
    }), 5000);
  }

}
