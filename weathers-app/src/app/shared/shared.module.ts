import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { AlertModule } from 'ngx-bootstrap';
import { MatTableModule } from '@angular/material/table';
import {
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSortModule
   
    
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatCardModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatToolbarModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        CommonModule,
        MatGridListModule,
        AlertModule,
        MatPaginatorModule,
        MatSortModule
        
        
        
    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatCardModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatToolbarModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        CommonModule,
        MatGridListModule,
        AlertModule,
        MatPaginatorModule,
        MatSortModule
        
       
        
    ]
})

export class SharedModule { }
