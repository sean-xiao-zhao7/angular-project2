import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../services/training.service';
import { PauseTrainingComponent } from './pause-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() afterPause = new EventEmitter();
  currentProgress = 0;
  timer = 0;

  constructor(private dialog: MatDialog, private service: TrainingService) {}

  ngOnInit(): void {
    this.startTimer();
  }

  onPause() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(PauseTrainingComponent, {
      data: { currentProgress: this.currentProgress },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.afterPause.emit();
      } else {
        this.startTimer();
      }
    });
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.currentProgress = this.currentProgress + 10;
      if (this.currentProgress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }
}
