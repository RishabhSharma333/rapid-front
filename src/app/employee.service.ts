import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  urlBase: string = 'http://localhost:8080/api/';
  mode:string='Registration';
  constructor(private http: HttpClient) {
  }
  getAllEmployees(limit:number){
    return this.http.get(this.urlBase+'/pagination?limit='+limit);
  }
  addEmployee(data:any){
    return this.http.post<Employee>(this.urlBase+'add',data);
  }
  deleteEmployee(id:number){
    return this.http.delete(this.urlBase+'delete/'+id);
  }
  getEmployeeByPosition(pos:string){
    return this.http.post(this.urlBase+'filterPosition/',{position:pos});

  }
  getEmployeeByDepartment(dept:string){
    return this.http.post(this.urlBase+'filterDepartment/',{department:dept});

  }
}

