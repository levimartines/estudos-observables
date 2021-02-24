import { Component, OnInit } from '@angular/core';
import { ConnectableObservable, Observable, Observer, Subject } from 'rxjs';
import { publish, share } from 'rxjs/operators';

@Component({
  selector: 'app-hot-observable-subject',
  templateUrl: './hot-observable-subject.component.html',
  styleUrls: ['./hot-observable-subject.component.css']
})
export class HotObservableSubjectComponent implements OnInit {
  counter = 0;
  number1 = 0;
  number2 = 0;
  string1 = 'Waiting for interval...';
  string2 = 'Waiting for interval...';
  myObservable?: Observable<number>;

  constructor() {
  }

  ngOnInit(): void {
    this.myObservable = new Observable((observer: Observer<number>) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        this.counter = i;
        i > 100 ? observer.complete() : observer.next(i);
      }, 200);
      return () => clearInterval(interval);
    });
    // this.usingSubjects();
    // this.usingPublish();
    this.usingShare();
  }

  usingShare(): void {
    // funcionamento igual ao do publish com refCount, porém, após o complete do Observable,
    // caso alguém se inscreva novamente, ele volta a gerar valores ( no publish ele não retorna nada )

    const multiCasted = this.myObservable?.pipe(share());

    const timer1 = setTimeout(() => multiCasted?.subscribe(n => {
      this.number1 = n;
      this.string1 = 'OK';
      clearTimeout(timer1);
    }), 2000);

    const timer2 = setTimeout(() => multiCasted?.subscribe(n => {
      this.number2 = n;
      this.string2 = 'OK';
      clearTimeout(timer2);
    }), 4000);
  }

  usingPublish(): void {
    // referencia o observable, e o contador só é iniciado quando alguém se inscreve
    // const multiCasted = this.myObservable?.pipe(publish(), refCount());

    const multiCasted: ConnectableObservable<number> = this.myObservable?.pipe(publish()) as ConnectableObservable<number>;
    // explicitamente se conecta ao Observable, que então inicia o contador
    multiCasted.connect();

    const timer1 = setTimeout(() => multiCasted?.subscribe(n => {
      this.number1 = n;
      this.string1 = 'OK';
      clearTimeout(timer1);
    }), 2000);

    const timer2 = setTimeout(() => multiCasted?.subscribe(n => {
      this.number2 = n;
      this.string2 = 'OK';
      clearTimeout(timer2);
    }), 4000);
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
    }), 4000);
  }

}
