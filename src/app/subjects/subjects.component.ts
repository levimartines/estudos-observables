import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { RandomDataService } from './random-data.service';
import { DataModel } from './data.model';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  // Subject normal. Executa a função do next quando o observable emite o próximo valor.
  subject = new Subject<DataModel>();
  // Emite todos os valores que já foram emitidos antes de ser feita a inscrição pelo Subject.
  replaySubject = new ReplaySubject<DataModel>();
  // Pega apenas o último do valor antes do Observable realizar o complete().
  asyncSubject: AsyncSubject<DataModel> = new AsyncSubject<DataModel>();
  // Executa a função next assim que é feita a inscrição, recebendo, no momento da inscrição, o último valor atribuído.
  behaviorSubject = new BehaviorSubject<DataModel>({data: 0, timestamp: 0});

  constructor(private dataService: RandomDataService) {
  }

  ngOnInit(): void {
    this.dataService.dataObservable.subscribe(this.subject);
    this.dataService.dataObservable.subscribe(this.replaySubject);
    this.dataService.dataObservable.subscribe(this.asyncSubject);
    this.dataService.dataObservable.subscribe(this.behaviorSubject);
  }

  connect(): void {
    this.dataService.dataObservable.connect();
  }
}
