import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {BreakpointObserver} from '@angular/cdk/layout';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {

  @Input() displayedColumns = [];
  @Input() dataSourceInput = [];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;


  constructor(breakpointObserver: BreakpointObserver) {

    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        this.displayedColumns : this.displayedColumns;
    });
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(this.dataSourceInput);
    // console.log(this.dataSourceInput);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataSourceInput);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    console.log(this.dataSourceInput);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}

