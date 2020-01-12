import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DbResponse } from '../dtos/db-response.dto';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private httpClient: HttpClient){}

  public fetchData(dateFrom?: string, dateTo?: string): Observable<DbResponse[]> {
      const data: any = {
          DateFrom: dateFrom ? dateFrom : '2000-01-01',
          DateTo: dateTo ? dateTo : '2100-01-01'
      }
      return this.httpClient.post<any>('http://localhost:5000/measurement', data);
  }
}
