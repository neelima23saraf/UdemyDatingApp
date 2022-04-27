import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { concat } from 'rxjs';
import { AccountsService } from '../_services/accounts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  registerForm: FormGroup;
  maxDate:  Date;
  validationErrors: string[] = [];

  constructor(private accoutService: AccountsService, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.initilizeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initilizeForm(){
    this.registerForm = new FormGroup({
      username:  new FormControl('', Validators.required),

      gender:  new FormControl('male'),
      knownas:  new FormControl('', Validators.required),
      dateofbirth:  new FormControl('', Validators.required),
      city:  new FormControl('', Validators.required),
      country:  new FormControl('', Validators.required),

      password:  new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmpassword: new FormControl('',[Validators.required, this.matchValues('password')])
    })
    this.registerForm.controls.password.valueChanges.subscribe(() =>{
      this.registerForm.controls.confirmpassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn{
    return (control: AbstractControl) =>{
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true} 
    }
  }

  
  register() {
    this.accoutService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/members');
      this.cancel();
    }, error => {
      this.validationErrors = error;
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
