import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FriendsService, User } from '../services/friends.service';
import { AddFriendComponent } from './add-friend/add-friend/add-friend.component';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  public friends:User[]
  displayedColumns: string[] = ['name'];
  constructor(public friendsService: FriendsService,
    public dialog: MatDialog) { 
    this.friends=friendsService.getUserFriends()
  }

  ngOnInit(): void {
  }
  
  openAddFriendDialog() {
    const dialogRef = this.dialog.open(AddFriendComponent, {
      width:'300px'
    });
  }
}
