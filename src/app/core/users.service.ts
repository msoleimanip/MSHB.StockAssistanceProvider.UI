import { ChangeActivationFormModel } from './../dataModels/apiModels/changeActivationFormModel';
import { AddUserFormModel } from './../dataModels/apiModels/addUserFormModel';
import { SearchUserFormModel } from 'src/app/dataModels/apiModels/searchUserFormModel';
import { ChangePasswordFormModel } from './../dataModels/apiModels/changePasswordFormModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers(searchUserForm: SearchUserFormModel): Observable<any> {
    return this.http.post('/api/Account/GetUsers', searchUserForm);
  }

  // getUserById(userId: string): Observable<any> {
  //   return this.http.get('/api/Account/getUserById?Id=' + userId);
  // }

  // editUser(editUserModel: EditUserFormModel): Observable<any> {
  //   return this.http.post('/api/Account/editUser', editUserModel);
  // }

  addUser(addUserModel: AddUserFormModel): Observable<any> {
    return this.http.post('/api/Account/addUser', addUserModel);
  }

  changeActivateUser(changeActivationModel: ChangeActivationFormModel): Observable<any> {
    return this.http.post('/api/Account/changeActivateUser', changeActivationModel);
  }

  changePassword(changePasswordModel: ChangePasswordFormModel): Observable<any> {
    return this.http.post('/api/Account/changePassword', changePasswordModel);
  }
}
