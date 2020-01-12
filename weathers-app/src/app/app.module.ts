import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LiveViewComponent } from './components/live-view/live-view.component';
import { HistoryComponent } from './components/history/history.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap';
import { MatTableModule, MatSortModule } from '@angular/material';


const appRoutes: Routes = [
  { path: '', component: LiveViewComponent },
  { path: 'live-view', component: LiveViewComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LiveViewComponent,
    HistoryComponent
   
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(
      appRoutes     
    ),
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
