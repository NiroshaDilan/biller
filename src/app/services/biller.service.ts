import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Biller} from '../model/biller.model';

@Injectable({
  providedIn: 'root'
})
export class BillerService {

  constructor(private http: HttpClient) {
  }

  getBillers(): Observable<Biller[]> {
    return this.http.get<Biller[]>('http://localhost:8080/api/manage-billers');
  }
}
