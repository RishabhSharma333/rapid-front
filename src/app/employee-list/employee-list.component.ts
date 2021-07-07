import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../model/Employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}
  empolyees: Array<Employee>;
  employeeHelp: Array<Employee>;

  showFiller: boolean = true;
  path: number = 0;
  searchFilter: string = '';
  pageSize: number = 10;
  searchSelect: number = 1;
  ngOnInit(): void {
    this.getNewData();
  }
  selectHome() {
    this.path = 0;
  }
  selectDetails() {
    this.path = 1;
  }
  employees: any;
  selectSearchValue(num: number) {
    this.searchSelect = num;
  }
  getNewData() {
    this.employeeService.getAllEmployees(10).subscribe((res) => {
      this.handleResponse(res);
    });
  }

  handleResponse(response) {
    this.employees = new Array<Employee>();
    console.log(response);
    this.employeeHelp = response;
    for (const empl of this.employeeHelp) {
      const emplShort = new Employee();
      emplShort.id = empl.id;
      emplShort.first_name = empl.first_name;
      emplShort.last_name = empl.last_name;
      emplShort.salary = empl.salary;
      emplShort.department = empl.department;
      emplShort.email_address = empl.email_address;
      emplShort.contact_number = empl.contact_number;
      emplShort.image = empl.image;
      emplShort.takenImage = 'data:image/jpg;base64,' + empl.image;
      this.employees.push(emplShort);
    }
  }

  edit(employee: any) {
    console.log(employee);
    this.path = 1;
  }
  delete(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(
      (res: any) => {
        console.log(this.employees);
      },
      (err: any) => {}
    );
  }
}
