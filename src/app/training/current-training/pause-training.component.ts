import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pause-training',
  template: `<h1 mat-dialog-title>Are you sure 2?</h1>
    <mat-dialog-content>
      <p>
        You already completed {{ data.currentProgress }}%.
      </p></mat-dialog-content>
      <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>`,
})
export class PauseTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
