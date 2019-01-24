import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {DialogUserType} from '../../../enums/dialog-user-type';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {
  private usernameFC = new FormControl('', [Validators.required]);
  private usernamePrev: string;

  constructor(public dialogRef: MatDialogRef<ChatDialogComponent>, @Inject(MAT_DIALOG_DATA) public params: any) {
    this.usernamePrev = params.username ? params.username : undefined;
  }

  ngOnInit() {}

  public onSave(): void {
    this.params.username = this.usernameFC.value;
    this.dialogRef.close({
      username: this.params.username,
      dialogType: this.params.dialogType,
      previousUsername: this.usernamePrev
    });
  }

}
