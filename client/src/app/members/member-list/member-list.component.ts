import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/Pagination';
import { UserParams } from 'src/app/_models/userParams';
import { User } from 'src/app/_models/users';
import { AccountsService } from 'src/app/_services/accounts.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  //members$: Observable<Member[]>;
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList =[{value:'male', display: 'Males'}, {value: 'female', display: 'Females'}]

  constructor(private memberService: MembersService, private accountService: AccountsService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    }
    )
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  //this.members$ = this.memberService.getMembers();


  loadMembers() {

    this.memberService.getMembers(this.userParams).subscribe(resposne => {
      this.members = resposne.result;
      this.pagination = resposne.pagination;
    })
  }

  pageChanged(event: any) {
    this.userParams.pagenumber= event.page;
    this.loadMembers();
  }


  resetFilters(){
    this.userParams = new UserParams(this.user);
    this.loadMembers();
  }
}
