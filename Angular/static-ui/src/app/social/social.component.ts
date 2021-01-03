import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FriendsService, User } from '../services/friends.service';
import { SerialNumberService } from '../services/serialNumber.service';
import { AddFriendComponent } from './add-friend/add-friend/add-friend.component';

@Component({
    selector: 'app-social',
    templateUrl: './social.component.html',
    styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit, OnDestroy {
    public friends!:User[]
    private userId!: number;
    private subscription!: Subscription;
  
    constructor(
        private serialNumber: SerialNumberService,
        public friendsService: FriendsService,
        public dialog: MatDialog,
    ) { 
    //this.friends=friendsService.getUserFriends()
    }


    ngOnInit(): void {
        this.getUserId();
    }
    
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }


    private getUserId(){
        this.subscription = this.serialNumber.serialNumberReceived.subscribe(
            data => {
            this.userId = data;
            this.getFriends();
        }
        )
    }

    getFriends(){
        this.friendsService.getUserFriends(this.userId).subscribe(
            (data) => {
                console.log(data)
                this.friends = data
            }
        )
    }
    
    displayedColumns: string[] = ['name'];

    openAddFriendDialog() {
        const dialog = this.dialog.open(AddFriendComponent, {
        width:'300px',
        data: this.userId
        });
        dialog.afterClosed().subscribe( () => {
            this.getFriends()
            console.log(this.friends)
        }
        )
    }
    }
