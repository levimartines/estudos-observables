import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataModel } from '../data.model';

@Component({
  selector: 'app-subject-child',
  templateUrl: './subject-child.component.html',
  styleUrls: ['./subject-child.component.css']
})
export class SubjectChildComponent implements OnInit {
  @Input() subject?: Subject<DataModel>;
  @Input() name?: string;
  log: string[] = [];
  status = false;
  subscription?: Subscription;

  constructor() {
  }

  ngOnInit(): void {

  }

  connect(): void {
    this.status = true;
    this.log.push('Connected');
    this.subscription = this.subject?.subscribe(
      next => this.logData(next),
      error => {
        this.status = false;
        this.log.push(error);
      },
      () => {
        this.status = false;
        this.log.push('Finished');
      }
    );
  }

  disconnect(): void {
    this.log.push('Disconnect');
    this.subscription?.unsubscribe();
  }

  logData(log: DataModel): void {
    this.log.push(`Timestamp: ${log.timestamp} | Data: ${log.data}`);
  }
}
