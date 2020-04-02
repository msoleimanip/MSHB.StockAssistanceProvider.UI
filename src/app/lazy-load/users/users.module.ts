import { UserActivationComponent } from './user-activation/user-activation.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersService } from './../../core/users.service';
import { UsersRoutingModule } from './users-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersAddComponent,
    UserActivationComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    UsersAddComponent,
    UserActivationComponent
  ],
  exports: [],
  providers: [UsersService]
})

export class UsersModule {

}
