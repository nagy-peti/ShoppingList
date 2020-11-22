import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {
  public addFriendForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddFriendComponent>,
    public friendService: FriendsService
  ) {
    this.addFriendForm = this.formBuilder.group({
      name: [null, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  addFriend(form: FormGroup) {
    this.friendService.add(form.value.name);
    this.dialogRef.close();
  }

}
