import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FriendsService } from 'src/app/services/friends.service';
import { SerialNumberService } from 'src/app/services/serialNumber.service';

@Component({
    selector: 'app-add-friend',
    templateUrl: './add-friend.component.html',
    styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {
    public addFriendForm: FormGroup;
    private userId!: number;
    private subscription!: Subscription;
    public isnewFriendExist: boolean;
    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<AddFriendComponent>,
        private serialNumber: SerialNumberService,
        public friendService: FriendsService,
        @Inject(MAT_DIALOG_DATA) public data: number
    ) {
        this.userId = this.data;
        this.addFriendForm = this.formBuilder.group({
            name: ['', Validators.required]
        })
        this.isnewFriendExist = true
    }

    ngOnInit(): void {
    }

    addFriend(form: FormGroup) {
        // this.friendService.add(form.value.name);
        this.friendService.add(this.userId, form.value.name).subscribe(
            data => {
                this.dialogRef.close()
                this.isnewFriendExist = true
            },
            error => {
                this.isnewFriendExist = false
            }
        )
    }
    getErrorMessage(): string {
        if (!this.isnewFriendExist) {
            return "No user with that name"
        }
        return " "

    }
}
