import { ChangeActivationFormModel } from './../../../dataModels/apiModels/changeActivationFormModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/core/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrls: ['./user-activation.component.css']
})
export class UserActivationComponent implements OnInit {

  @Input() changeActivationModel: ChangeActivationFormModel;
  activationForm: FormGroup;
  submitted = false;
  loading = false;
  updateButton = false;
  isActiveSelect = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.isActiveSelect = this.changeActivationModel.isActive;

    this.activationForm = this.formBuilder.group({
      isActive: [this.changeActivationModel.isActive, Validators.required],
    });
  }

  get f() { return this.activationForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.activationForm.invalid && !this.changeActivationModel.userId) {
      this.toastr.error('لطفا مقادیر را به درستی وارد کنید');
      this.loading = false;
      return;
    }

    this.changeActivationModel.isActive = this.activationForm.get('isActive').value;

    this.usersService.changeActivateUser(this.changeActivationModel).subscribe(res => {
      if (res.data) {
        this.toastr.success('کاربر با موفقیت تغییر وضعیت شد');
        this.loading = false;
        this.updateButton = true;
        this.close();
      }
    }, err => {
      this.loading = false;
    });
  }

  close() {
    this.activeModal.close({ updateButton: this.updateButton, isActive: this.changeActivationModel.isActive });
  }

}
