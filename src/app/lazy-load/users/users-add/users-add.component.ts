import { AddUserFormModel } from '../../../dataModels/apiModels/addUserFormModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/users.service';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})

export class UsersAddComponent implements OnInit {

  @Input() presidentTypesSelect: any;
  addUserModel = new AddUserFormModel();
  addForm: FormGroup;
  submitted = false;
  loading = false;
  reloadTable = false;
  isActiveSelect = false;


  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private toastr: ToastrService) {
    this.addUserModel.isActive = false;
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      description: [''],
      isActive: [this.addUserModel.isActive],
      phoneNumber: [''],
      isPresident: ['', Validators.required]
    });
  }

  get f() { return this.addForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.addForm.invalid) {
      this.toastr.error('مقادیر را به درستی وارد کنید');
      this.loading = false;
      return;
    }

    this.addUserModel.username = this.addForm.get('username').value;
    this.addUserModel.password = this.addForm.get('password').value;
    this.addUserModel.firstName = this.addForm.get('firstName').value;
    this.addUserModel.lastName = this.addForm.get('lastName').value;
    this.addUserModel.description = this.addForm.get('description').value;
    this.addUserModel.isActive = this.addForm.get('isActive').value;
    this.addUserModel.phoneNumber = this.addForm.get('phoneNumber').value;
    this.addUserModel.isPresident = this.addForm.get('isPresident').value;

    this.usersService.addUser(this.addUserModel).subscribe(res => {
      if (res.data) {
        this.toastr.success('کاربر با موفقیت اضافه شد');
        this.addForm.reset();
        this.submitted = false;
        this.loading = false;
        this.reloadTable = true;
      }
    }, err => {
      this.loading = false;
    });
  }

  close() {
    this.activeModal.close(this.reloadTable);
  }
}
