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
    this.employees=[
      {
      "first_name":"valo",
      "dlast_name":"valo",
      "conta_name":"valo", 
      "depar_name":"valo",
      "posit_name":"valo",
      "salary_nam":"valo",
      "email_name":"valo",
    },
    {
      "first_name":"valo",
      "dlast_name":"valo",
      "conta_name":"valo", 
      "depar_name":"valo",
      "posit_name":"valo",
      "salary_nam":"valo",
      "email_name":"valo",
    },
    {
      "first_name":"valo",
      "dlast_name":"valo",
      "conta_name":"valo", 
      "depar_name":"valo",
      "posit_name":"valo",
      "salary_nam":"valo",
      "email_name":"valo",
    },
    {
      "first_name":"valo",
      "dlast_name":"valo",
      "conta_name":"valo", 
      "depar_name":"valo",
      "posit_name":"valo",
      "salary_nam":"valo",
      "email_name":"valo",
    },
    {
      "first_name":"valo",
      "dlast_name":"valo",
      "conta_name":"valo", 
      "depar_name":"valo",
      "posit_name":"valo",
      "salary_nam":"valo",
      "email_name":"valo",
    },
  ]
  }
  selectHome(){
    this.path=0;
  }
  selectDetails(){
    this.path=1;
  }
  employees:any;


}
