import { Component, OnInit, OnDestroy, NgModule, ViewChild, OnChanges } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { DbResponse } from '../../dtos/db-response.dto';
import { Subject } from 'rxjs';
import { map, takeUntil, reduce } from 'rxjs/operators';

import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../history/format-datepicker';
import {Chart} from 'chart.js';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

export class AppModule { }
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class HistoryComponent implements OnInit, OnDestroy {

  private destroyed$: Subject<void> = new Subject();
  DateFrom: Date;
  DateTo: Date;
  DateFromString: string;
  DateToString: string;
  displayedColumns: string[] = ['id', 'temperature', 'moisture','pressure','altitude', 'dateTime' ];
  dataSource : MatTableDataSource<DbResponse>;
  dataSourceDb : DbResponse[] = [];
  LineChart1=[];
  LineChart2=[];
  LineChart3=[];
  showHistory: boolean;
  
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  constructor(private historyService: HistoryService) {}

  
  format(date: Date): string {
      let day: string = new Date(date).getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (new Date(date).getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = new Date(date).getFullYear();
      return `${year}-${month}-${day}`;
    }
  
  HideHistory(){
    this.showHistory=false;  
    console.log(this.showHistory);
  }
  
  ShowHistory(){   
    
    this.showHistory=true;
    console.log(this.showHistory);
      
      if(new Date(this.DateFrom).getDate() > new Date(this.DateTo).getDate()){
        let dateStage = new Date(this.DateTo);
        this.DateTo= new Date(this.DateFrom);
        this.DateFrom = dateStage;
       }      
       
      console.log(this.DateFromString);
      console.log(this.DateToString);  
      this.historyService.fetchData(this.DateFromString, this.DateToString).pipe(takeUntil(this.destroyed$),map(val => <DbResponse[]>val)).subscribe(res => {
        this.dataSourceDb = res, this.dataSource=new MatTableDataSource(res);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        setTimeout(() => this.dataSource.sort = this.sort);   
        this.GetChart();   
      })
  }
  
  GetChart(){
    this.LineChart1.push(new Chart('lineChart1', {
      type: 'line',
    data: {
     labels: this.dataSourceDb.map(a=>a.dateTime),
     datasets: [{
         label: 'History of temperatures [°C].',
         data: this.dataSourceDb.map(a=>a.temperature),
         fill:true,
         lineTension:1,
         borderColor:"red",
         borderWidth: 5
     }]
    }, 
    options: {   
     title:{
         text:"History of temperatures [°C]",
         display:false
     },
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero:false
             }
         }]
     }
    }
    }));

    this.LineChart2.push(new Chart('lineChart2', {
      type: 'line',
    data: {
     labels: this.dataSourceDb.map(a=>a.dateTime),
     datasets: [
    {
      label: 'History of moistures [%].',
      data: this.dataSourceDb.map(a=>a.moisture),
      fill:true,
      lineTension:1,
      borderColor:"blue",
      borderWidth: 5
     }]
    }, 
    options: {
     title:{
         text:"History of moistures [%].",
         display:false
     },
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero:false
             }
         }]
     }
    }
    }));

    this.LineChart3.push(new Chart('lineChart3', {
      type: 'line',
    data: {
     labels: this.dataSourceDb.map(a=>a.dateTime),
     datasets: [
    {
      label: 'History of pressures [hPa].',
      data: this.dataSourceDb.map(a=>a.pressure),
      fill:true,
      lineTension:1,
      borderColor:"yellow",
      borderWidth: 5
     }]
    }, 
    options: {
     title:{
         text:"History of pressures [hPa].",
         display:false
     },
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero:false
             }
         }]
     }
    }
    }));
  }
   
  DateFromChange(event){
    this.DateFromString=this.format(this.DateFrom);
    console.log("DateFrom CHANGE");
  }

  DateToChange(event){
    this.DateToString= this.format(this.DateTo);
    console.log("DateTo CHANGE");
  }
  
  ngOnInit() {
    console.log("ngOnInit called.");
    console.log(this.DateFromString);
    this.dataSource  = new MatTableDataSource<DbResponse>();
    this.DateFromString='2000-01-01';
    this.DateToString='2100-01-01';
    this.showHistory=false;
       
  }

  ngOnDestroy() {
    console.log("ngOnDestroy called.");
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
