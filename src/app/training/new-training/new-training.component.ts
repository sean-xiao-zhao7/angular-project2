import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Injectable,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../models/exercise.model';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
@Injectable()
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter();
  exercises: Exercise[] = [];
  selectedExercise: Exercise;

  constructor(private service: TrainingService) {}

  ngOnInit(): void {
    this.exercises = this.service.getExercises();
  }

  onStartTraining(form: NgForm) {
    this.service.startExercise(this.selectedExercise.id);
  }
}
