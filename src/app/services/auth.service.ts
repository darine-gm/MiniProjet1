import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users:User[]=[{"username":"admin","password":"123","role":['ADMIN']},
                {"username":"darine","password":"123","role":['USER']}];

public loggedUser!:string;
public isloggedIn: boolean = false;
public roles!:string[];



  constructor(private router: Router) { } 

  logout(): void {
    this.loggedUser = '';
    this.isloggedIn = false;
    this.roles = [];
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('isloggedIn');
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    if(!this.roles)
      return false;
    return (this.roles.indexOf('ADMIN') > -1);
  }

  isLoggedIn(): boolean {
    return this.isloggedIn;
  }

  SignIn(user: User): boolean {
    let validUser: boolean = false;

    this.users.forEach((curUser) => {
      if (user.username === curUser.username && user.password == curUser.password) {
        validUser = true;

        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.role;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }
  setLoggedUserFromLocalStorage(login: string): boolean {
    const user = this.users.find((curUser) => curUser.username === login);
    if (!user) {
      return false;
    }
    this.loggedUser = login;
    this.isloggedIn = true;
    this.getUserRoles(login);
    return true;
  }

  getUserRoles(username: string): void {
    const user = this.users.find((curUser) => curUser.username === username);
    this.roles = user ? user.role : [];
  }
}
