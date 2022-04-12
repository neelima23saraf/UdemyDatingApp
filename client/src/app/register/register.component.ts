import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { concat } from 'rxjs';
import { AccountsService } from '../_services/accounts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
@Output() cancelRegister = new EventEmitter(); 

model: any ={};

  constructor(private accoutService: AccountsService) { }

  ngOnInit(): void {
  }

  register()
  {
    this.accoutService.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();
    }, error => {console.log(error);
    })
  }
  
  cancel()
  {
    this.cancelRegister.emit(false);
  }
}
