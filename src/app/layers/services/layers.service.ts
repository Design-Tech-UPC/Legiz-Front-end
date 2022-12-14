import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Layer} from "../model/layer";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LayersService {
  // Layers Endpoint
  basePath = 'http://190.117.53.147:2907';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin":  "http://localhost:4200/",
      "Access-Control-Allow-Methods": "GET POST OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
})
  }
  constructor(private http: HttpClient) { }

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return Observable with Error Message to Client
    return throwError('Something happened with request, please try again later');
  }

  // Create Layer
  create(item: any): Observable<Layer> {
    return this.http.post<Layer>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get Layer by id
  getById(id: any): Observable<Layer> {
    return this.http.get<Layer>(`${this.basePath}/api/lawyer/typespecialty/${id}/lawyers?page=0&size=1`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get All Layers
  getAll(): Observable<Layer> {
    return this.http.get<Layer>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Update Layer
  update(id: any, item: any): Observable<Layer> {
    return this.http.post<Layer>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Delete Layer
  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
}
