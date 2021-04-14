import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from './services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  onGoingTraining = false;

  constructor(private service: TrainingService) {}

  ngOnInit(): void {
    // toggles current training dom
    if (this.service.getCurrentExercise()) {
      this.onGoingTraining = true;
    }
  }
}
