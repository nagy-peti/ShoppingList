import { Component, OnInit } from '@angular/core';
import { FriendsService, User } from '../services/friends.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  public friends:User[]

  constructor(public friendsService: FriendsService) { 
    this.friends=friendsService.getUserFriends()
  }

  ngOnInit(): void {
  }
  

}
