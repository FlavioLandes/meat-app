import { Restaurant } from "./restaurant/restaurant.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MEAT_API } from "app/app.api";
import { Observable } from "rxjs";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantsService {

    
    
    constructor(private http: HttpClient) {}

    restaurants(search?: string) : Observable<Restaurant[]> {
        let httpParams: HttpParams = undefined

        if(search) {
            httpParams = new HttpParams().set('q', search)
        }

        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: httpParams})
    }

    restaurantById(id: string): Observable<Restaurant> {
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
    }

    reviewsOfRestaurant(id: string): Observable<any> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)      
    }
}