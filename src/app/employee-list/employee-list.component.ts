import {
  Component,
  OnInit,
  EventEmitter,
  Inject
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { Employee } from '../model/Employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  constructor(private employeeService: EmployeeService, public dialog: MatDialog, ) {}
  empolyees: Array<Employee>;
  employeeHelp: Array<Employee>;
  showDetailsComponent: boolean = false;
  messagesFromRegistration: string ;
  selectedEmplooyee: Employee;
  messagesFromDeletion: string;
  toDeleteemployee: Employee;
  showRmessage:boolean=true;
  showProgress:boolean=false;

  showFiller: boolean = true;
  path: number = 0;
  employeeEmitter = new EventEmitter();
  searchSelect: number = 1;
  searchFilter: string;
  pageSize: number=12;

  ngOnInit(): void {
    // this.pageSize=12;
    this.getNewData(this.pageSize);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverview, {
      width: '700px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      // console.log(this.mobile);
    });
  }
  closeDialog(): void {
    this.dialog.closeAll();
  }

  selectHome() {
    this.showDetailsComponent = false;
    this.selectedEmplooyee = null;
  }
  selectDetails() {
    this.showDetailsComponent = true;
  }
  employees: any;
  selectSearchValue(num: number) {
    this.searchSelect = num;
  }
  getNewData(num) {
    this.showProgress=true;
    if(!num){
      num=12;
    }
    this.employeeService.getAllEmployees(num).subscribe((res) => {
      this.handleResponse(res);
      this.showProgress=false;
    });
  }
  getDpData(value) {
    if (this.searchSelect == 1) {
      this.showProgress=true;
      this.employeeService.getEmployeeByDepartment(value).subscribe(
        (res: any) => {
          // console.log(res);
          this.handleResponse(res);
          this.showProgress=false;
          // this.employees=res;
          if (res.length == 0) {
            this.messagesFromRegistration =
              'No employees with department ' + value;
            setTimeout(() => {
              this.messagesFromRegistration = null;
            }, 3000);
          } else {
            this.messagesFromRegistration =
              'Search results with department ' + value;
            setTimeout(() => {
              this.messagesFromRegistration = null;
            }, 3000);
          }
        },
        (err) => {
          // console.log(err);
          this.showProgress=false;
        }
      );
    } else {
      this.showProgress=true;
      this.employeeService.getEmployeeByPosition(value).subscribe(
        (res: any) => {
          // console.log(res);
          // this.employees=res;
          this.showProgress=false;
          this.handleResponse(res);
          if (res == null || res.length == 0) {
            this.messagesFromRegistration =
              'No employees with position ' + value;
            setTimeout(() => {
              this.messagesFromRegistration = null;
            }, 3000);
          } else {
            this.messagesFromRegistration = 'Search results using postion';
            setTimeout(() => {
              this.messagesFromRegistration = null;
            }, 3000);
          }
        },
        (err) => {
          // console.log(err);
          this.showProgress=false;
        }
      );
    }
    this.pageSize=12;
  }
  handleResponse(response) {
    this.employees = new Array<Employee>();
    // console.log(response);
    this.employeeHelp = response;
    for (const empl of this.employeeHelp) {
      const emplShort = new Employee();
      emplShort.id = empl.id;
      emplShort.first_name = empl.first_name;
      emplShort.last_name = empl.last_name;
      emplShort.salary = empl.salary;
      emplShort.position = empl.position;
      emplShort.department = empl.department;
      emplShort.email_address = empl.email_address;
      emplShort.contact_number = empl.contact_number;
      emplShort.image = empl.image;
      emplShort.takenImage = 'data:image/jpg;base64,' + empl.image;
      this.employees.push(emplShort);
    }
  }

  edit(employee: any) {
    
    this.selectedEmplooyee = employee;
    this.showDetailsComponent = true;
    this.messagesFromRegistration = 'Employee list is updated';
      setTimeout(() => {
        this.messagesFromRegistration = null;
      }, 3000);
  }

  delete(employee: Employee) {
    this.messagesFromDeletion =
      'Are you sure to delete employee with name ' +
      employee.first_name +
      ' ' +
      employee.last_name +
      ' ?';
    this.toDeleteemployee = employee;
    setTimeout(() => {
      this.messagesFromDeletion = null;
      this.toDeleteemployee = null;
    }, 3000);
  }
  deleteEmployee() {
    this.employeeService.deleteEmployee(this.toDeleteemployee.id).subscribe(
      (res: any) => {
        // console.log(this.employees);
        this.messagesFromDeletion = null;
        this.toDeleteemployee = null;
        this.getNewData(12);
        this.pageSize=12;
        this.messagesFromRegistration = 'Deleted Employee';
      setTimeout(() => {
        this.messagesFromRegistration = null;
      }, 3000);
      },
      (err: any) => {}
    );
  }

  startDPSearch() {
    let wordSearch = this.searchFilter;
    setTimeout(() => {
      if (wordSearch == this.searchFilter) {
        if (this.searchFilter) {
          console.log(this.searchFilter);
          this.getDpData(this.searchFilter);
        } else {
          this.ngOnInit();
        }
      }
    }, 1000);
  }

  pageSizechange(event: any) {
    this.searchFilter='';
    let wordSearch = this.pageSize;
    setTimeout(() => {
      if (wordSearch == this.pageSize) {
        if (this.pageSize>0) {
          this.employees = this.getNewData(this.pageSize);
        }
        else{
          this.pageSize=12;
          this.employees = this.getNewData(this.pageSize);
        }
      } else {
        this.ngOnInit();
      }
    }, 1000);
  }
  
  
}


@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog-overview.html',
})
export class DialogOverview {
  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ){
    
  }
  
 
  closeDialog(): void {
    this.dialogRef.close();
  }
  
}
