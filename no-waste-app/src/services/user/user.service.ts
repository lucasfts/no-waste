import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
import { Login } from 'src/models/login.model';
import { Subject } from 'rxjs';

const API_URL = `${environment.API_URL}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tokenTimer: any;
  private userAuthListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getUserListener() {
    return this.userAuthListener.asObservable();
  }

  getIsAuth() {
    const authData = this.getAuthData();
    return authData && authData.expirationDate > new Date();
  }

  getCurrentUser() {
    const authData = this.getAuthData();
    if (!authData) return;
    return this.http.get(API_URL + '/' + authData.userId);
  }

  createUser(user: User) {
    this.http.post(API_URL + '/register', user)
      .subscribe(response => {
        Swal.fire({
          title: 'Register',
          text: 'Usuário criado com sucesso',
          type: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      }, error => {
        Swal.fire({
          title: 'Error!',
          text: error.message,
          type: 'error',
          confirmButtonText: 'Ok'
        });
      });
  }

  login(userLogin: Login) {
    this.http.post<{ token: string, expiresIn: number, userId: string }>(API_URL + '/login', userLogin)
      .subscribe(response => {
        console.log(response);
        const token = response.token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + (expiresInDuration * 1000));
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, response.userId);
          this.userAuthListener.next(this.getIsAuth());
          this.router.navigate(['/']);
        }
      }, error => {
        this.userAuthListener.next(this.getIsAuth());
        let alertMessage = error.message;
        if (error.status === 404) {
          alertMessage = 'Usuário ou senha inválidos';
        }
        Swal.fire({
          title: 'Error!',
          text: alertMessage,
          type: 'error',
          confirmButtonText: 'Ok'
        });
      });
  }

  logout() {
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.userAuthListener.next(this.getIsAuth());
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    console.log(`Setting timer: ${duration}`);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return null;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }

}


