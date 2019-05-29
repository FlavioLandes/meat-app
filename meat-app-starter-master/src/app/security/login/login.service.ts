import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "environments/environment";
import { User } from "./user.model";
import { Router, NavigationEnd } from "@angular/router";
import { filter, tap } from "rxjs/operators";

@Injectable()
export class LoginService {

    user: User
    lastUrl: string

    constructor(private http: HttpClient, private router: Router) {
        this.router.events.pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: NavigationEnd) => this.lastUrl = e.url)
    }

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${environment.api}/login`, {email: email, password: password})
        .pipe(tap(user => this.user = user))
    }

    isLoggedIn(): boolean {
        return this.user !== undefined
    }

    handleLogin(path: string = this.lastUrl) {
        this.router.navigate(['/login', path])
    }

    logout() {
        this.user = undefined
    }
}