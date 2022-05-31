import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  public All(): Observable<any> {
    return this.http.get<any>('https://projet-tritschberger-antoine.herokuapp.com/api/products');
  }

  public Get(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return this.http.get<any>('https://projet-tritschberger-antoine.herokuapp.com/api/products/' + id, httpOptions);
  }


  public Filter(filtre: string): Observable<any> {
    return this.All().pipe(
      map((items : Product[]) => items.filter(product => product.name.toLowerCase().includes(filtre.toLowerCase())))
      );

  }
}
