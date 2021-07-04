import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  constructor( private formBuilder:FormBuilder) {}

  ngOnInit(): void {}
  profileForm = this.formBuilder.group({
    first_name: ['', [
      Validators.required,
      Validators.minLength(2),
    ]],
    last_name: ['', [
      Validators.required,
      Validators.minLength(2),
    ]],
    department_name: ['', [
      Validators.required,
      Validators.minLength(2),
    ]],
    salary: ['', [
      Validators.required,
      Validators.minLength(2),
    ]],
    position_name: ['', [
      Validators.required,
      Validators.minLength(2),
    ]],
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
    console.log(this.profileForm.value);
    if (this.profileForm.valid) {
      console.log('form valid');
    }
  }
}
