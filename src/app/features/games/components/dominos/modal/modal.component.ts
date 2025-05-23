import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/select';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal',
  imports: [CommonModule, MatDialogContent, MatFormField],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  userAnswer = '';
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  submit() {
    this.dialogRef.close(this.userAnswer);
  }
}
