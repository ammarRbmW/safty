import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {TokenLocal} from '../../../core/_helpers/token.local';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationApi, UserService} from '../../../core/_api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  userInformation: any;

  constructor(private fb: FormBuilder, private router: Router,
              public userService: UserService,
              public authApi: AuthenticationApi,
              public tokenService: TokenLocal,
              private toastr: ToastrService
  ) {
  }


  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      remember_me: [true]
    });
  }

  onSubmit() {
    this.loginForm();
  }

  loginForm() {
    const user = {
      username: this.form.controls.username.value,
      password: this.form.controls.password.value,
      remember_me: this.form.controls.remember_me.value,
    };
    // this.getUser();

    this.authApi.login(user).subscribe(
      (data: any) => {
        this.tokenService.handle(data);
        this.userInformation = data.user;
        this.toastr.success('success!', 'welcome to our Cms');
        this.router.navigate(['/home']);
      }, (error: any) => {
        const errorData = error.error;
        if (error.status === 422) {
          Object.keys(errorData.message).forEach((value) => {
            this.toastr.error(errorData.message[value], 'error!');
          });
        }
        if (error.status === 401) {
          this.toastr.error('Unauthorized', 'Ops');
        }
      },
      () => {

        // this.userLocal.set(this.userInformation);
      }
    );
  }

  getUser() {
    let thisUser;
    this.userService.profile().subscribe(
      (data: any) => {
        thisUser = data;
      }
    );
    return thisUser;
  }
}

