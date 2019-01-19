import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {
  private usernameFormControl = new FormControl('', [Validators.required]);
  previousUsername: string;

  constructor(public dialogRef: MatDialogRef<DialogUserComponent>,
              @Inject(MAT_DIALOG_DATA) public params: any) {
    this.previousUsername = params.username ? params.username : undefined;
  }

  ngOnInit() {
  }


  public onSave(): void {
    this.dialogRef.close({
      username: this.params.username,
      dialogType: this.params.dialogType,
      previousUsername: this.previousUsername
    });
  }
}
