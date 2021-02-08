import { Component, Input, OnChanges } from '@angular/core';
import {ColumnLayout} from '../../models/columns.layout';
import {  
    SelectionModel  
} from '@angular/cdk/collections';  
@Component({
    selector: 'as-table',
    templateUrl: './as-table.component.html',
    styleUrls: ['./as-table.component.scss']
})


export class AsTableComponent implements OnChanges {

    constructor() { }
    @Input() columns: ColumnLayout[];
    @Input() records: any[];
    columnMaps: ColumnLayout[]; 
    ngOnChanges() {
        if (this.columns) {
            this.columnMaps = this.columns;
        } else {
            this.columnMaps = Object.keys(this.records[0])
                .map( key => {
                     return {
                        key: key,
                        header: key.slice(0, 1).toUpperCase() + key.replace(/_/g, ' ' ).slice(1)
                    };
            });
        }
    }
    selection = new SelectionModel < ColumnLayout > (true, []);  
    isAllSelected() {  
        const numSelected = this.selection.selected.length;  
        const numRows = !!this.columns && this.columns.length;  
        return numSelected === numRows;  
    }  
    /** Selects all rows if they are not all selected; otherwise clear selection. */  
    masterToggle() {  
        this.isAllSelected() ? this.selection.clear() : this.columnMaps.forEach(r => this.selection.select(r));  
    }  
    /** The label for the checkbox on the passed row */  
    // checkboxLabel(row: UserDetail): string {  
    //     if (!row) {  
    //         return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    //     }  
    //     return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.UserId + 1}`;  
    // } 
}


  