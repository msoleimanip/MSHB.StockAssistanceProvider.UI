import { ChangeActivationFormModel } from './../../dataModels/apiModels/changeActivationFormModel';
import { UserActivationComponent } from './user-activation/user-activation.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { SearchUserViewModel } from 'src/app/dataModels/viewModels/searchUserViewModel';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { SearchUserFormModel } from 'src/app/dataModels/apiModels/searchUserFormModel';
import { PresidentType } from './../../dataModels/enums/presidentType';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/core/users.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, OnDestroy {

  searchModel = new SearchUserFormModel();
  users = new SearchUserViewModel();
  loading = false;
  presidentType = PresidentType;
  presidentTypesSelect: any;

  constructor(
    private usersService: UsersService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.loadUsers();
    this.presidentTypesSelect = Object.keys(PresidentType).filter(Number).map(key => ({ title: PresidentType[key], value: key }));
  }

  ngOnDestroy(): void {
    this.config.backdrop = true;
    this.config.keyboard = true;
  }

  loadUsers() {
    this.loading = true;
    this.usersService.getUsers(this.searchModel).subscribe((res: ServerResponseViewModel<SearchUserViewModel>) => {
      this.users = res.data;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }


  changeActivation(userId: string, isActive: boolean) {
    const modalRef = this.modalService.open(UserActivationComponent, { windowClass: '.my-modal', size: 'lg' });
    const changeActivationModel = new ChangeActivationFormModel();
    changeActivationModel.userId = userId;
    changeActivationModel.isActive = isActive;
    modalRef.componentInstance.changeActivationModel = changeActivationModel;
    modalRef.result.then(result => {
      if (result.updateButton === true) {
        const ur = this.users.searchUserViewModel.find(x => x.id === userId);
        if (ur) {
          ur.isActive = result.isActive;
        }
      }
    });
  }

  // edit(userId: string) {
  //   this.usersService.getUserById(userId).subscribe((res: ServerResponseViewModel<UserViewModel>) => {
  //     const modalRef = this.modalService.open(UsersEditComponent, { windowClass: '.my-modal', size: 'lg' });
  //     let model = new EditUserFormModel();
  //     model.userId = res.data.id;
  //     model.description = res.data.description;
  //     model.firstName = res.data.firstName;
  //     model.groupAuthId = res.data.groupAuthId;
  //     model.isActive = res.data.isActive;
  //     model.lastName = res.data.lastName;
  //     model.location = res.data.location;
  //     model.phoneNumber = res.data.phoneNumber;
  //     model.username = res.data.username;
  //     model.isPresident = res.data.isPresident;

  //     modalRef.componentInstance.editUserModel = model;
  //     modalRef.componentInstance.presidentTypesSelect = this.presidentTypesSelect;

  //     modalRef.result.then(result => {
  //       if (result === true) {
  //         this.loadUsers();
  //       }
  //     });
  //   });
  // }

  create() {
    const modalRef = this.modalService.open(UsersAddComponent, { windowClass: '.my-modal', size: 'lg' });
    modalRef.componentInstance.presidentTypesSelect = this.presidentTypesSelect;
    modalRef.result.then(result => {
      if (result === true) {
        this.loadUsers();
      }
    });
  }
}



