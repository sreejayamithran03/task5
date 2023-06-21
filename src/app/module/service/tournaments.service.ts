import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {
  
  private jsonDataUrl = 'assets/Data/tournament.json';
  constructor(private http: HttpClient) { }
 
  getTournaments(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonDataUrl);
  }

}
