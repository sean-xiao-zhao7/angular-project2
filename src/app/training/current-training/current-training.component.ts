import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../services/training.service';
import { PauseTrainingComponent } from './pause-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  currentProgress = 0;
  timer;

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
        this.service.cancelExercise(this.currentProgress);
      } else {
        this.startTimer();
      }
    });
  }

  startTimer() {
    const step = (this.service.getCurrentExercise().duration / 100) * 100;
    this.timer = setInterval(() => {
      this.currentProgress = this.currentProgress + 1;
      if (this.currentProgress >= 100) {
        this.service.finishExercise();
        clearInterval(this.timer);
      }
    }, step);
  }
}
