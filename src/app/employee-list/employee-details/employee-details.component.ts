import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/model/Employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private employeeService: EmployeeService
  ) {}
  employee: Employee;
  messagesFromRegistration: string;
  @Input() employeeClick: Employee;
  @Output()
  employeeAddedEvent = new EventEmitter();
  imageUrl: any;
  selectedImage;
  @ViewChild('userPhoto') userPhoto: ElementRef;

  ngOnInit(): void {
    if (this.employeeClick) {
      console.log(this.employeeClick);
      this.profileForm.patchValue({
        first_name: this.employeeClick.first_name,
        last_name: this.employeeClick.last_name,
        department: this.employeeClick.department,
        salary: this.employeeClick.salary,
        email_address: this.employeeClick.email_address,
        contact_number: this.employeeClick.contact_number,
      });
      this.profileForm.patchValue({ position: this.employeeClick.position });
      this.selectedImage = this.employeeClick.image;
    }
  }
  showProgress: boolean = false;
  profileForm = this.formBuilder.group({
    first_name: ['', [Validators.required, Validators.minLength(2)]],
    last_name: ['', [Validators.required, Validators.minLength(2)]],
    department: ['', [Validators.required, Validators.minLength(2)]],
    salary: ['', [Validators.required, Validators.minLength(2)]],
    position: ['', [Validators.required, Validators.minLength(2)]],
    email_address: [
      '',
      [
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
      ],
    ],
    contact_number: [
      '',
      [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')],
    ],
  });

  submitForm() {
    console.log(this.profileForm);
    if (this.profileForm.valid) {
      // console.log('form valid');
      // console.log(this.imageUrl);
      if (!this.employeeClick) {
        this.showProgress = true;
        const formData = new FormData();
        formData.append('imageFile', this.selectedImage);

        this.httpClient
          .post('http://localhost:8080/api/upload', formData, {
            observe: 'response',
          })
          .subscribe((res) => {
            if (res.status === 200) {
              this.employeeService
                .addEmployee({
                  first_name: this.profileForm.get('first_name').value,
                  last_name: this.profileForm.get('last_name').value,
                  contact_number: this.profileForm.get('contact_number').value,
                  email_address: this.profileForm.get('email_address').value,
                  department: this.profileForm.get('department').value,
                  position: this.profileForm.get('position').value,
                  salary: this.profileForm.get('salary').value,
                })
                .subscribe((employee) => {
                  console.log(employee);
                  this.employeeAddedEvent.emit();
                  console.log('emplooye added');
                  this.profileForm.reset();
                  this.showProgress = false;
                  this.imageUrl = null;
                  this.userPhoto.nativeElement.value = null;
                  this.messagesFromRegistration = 'Added Employee to List';
                  setTimeout(() => {
                    this.messagesFromRegistration = null;
                  }, 3000);
                  this.employeeClick = null;
                });
            }
          });
      } else {
        console.log(this.employeeClick);
        this.showProgress = true;
        const formData = new FormData();

        
        

        formData.append('imageFile', this.selectedImage);

        this.httpClient
          .post('http://localhost:8080/api/upload', formData, {
            observe: 'response',
          })
          .subscribe((res) => {
            if (res.status === 200) {
              this.employeeService
                .updateEmployee({
                  id:this.employeeClick.id,
                  first_name: this.profileForm.get('first_name').value,
                  last_name: this.profileForm.get('last_name').value,
                  contact_number: this.profileForm.get('contact_number').value,
                  email_address: this.profileForm.get('email_address').value,
                  department: this.profileForm.get('department').value,
                  position: this.profileForm.get('position').value,
                  salary: this.profileForm.get('salary').value,
                })
                .subscribe((employee) => {
                  console.log(employee);
                  this.employeeAddedEvent.emit();
                  console.log('emplooye Updated');
                  this.profileForm.reset();
                  this.showProgress = false;
                  this.imageUrl = null;
                  this.userPhoto.nativeElement.value = null;
                  this.messagesFromRegistration = 'Updated Employee to List';
                  setTimeout(() => {
                    this.messagesFromRegistration = null;
                  }, 3000);
                  this.employeeClick = null;
                });
            }
          });
      }
    }
    // this.profileForm.reset();
  }
  clearForm() {
    this.profileForm.reset();
    this.employeeClick = null;
    this.imageUrl = null;
    this.showProgress = false;
    this.userPhoto.nativeElement.value = null;
  }
  public onFileSelect(event) {
    console.log(event);
    this.selectedImage = event.target.files[0];

    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imageUrl = reader.result;
    };
  }
}
