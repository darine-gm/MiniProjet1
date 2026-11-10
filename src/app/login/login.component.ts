import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  user= new User();
  erreur: boolean = false;
  constructor(private authService : AuthService,
              private router: Router){}
  ngOnInit(): void {}
  onLoggedin(){
    console.log(this.user);
    let isValidUser: Boolean = this.authService.SignIn(this.user);

    if (isValidUser)
      this.router.navigate(['/']);
    else

      //alert('Login ou mot de passe incorrect !');
        this.erreur=true;
    }
}
  