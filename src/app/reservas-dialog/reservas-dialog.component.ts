import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reservas-dialog',
  templateUrl: './reservas-dialog.component.html',
  styleUrls: ['./reservas-dialog.component.css']
})
export class ReservasDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReservasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}