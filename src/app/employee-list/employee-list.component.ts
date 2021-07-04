import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor() { }
  showFiller:boolean=true;
  path:number=0;
  ngOnInit(): void {
  }
  selectHome(){
    this.path=0;
  }
  selectDetails(){
    this.path=1;
  }

}
