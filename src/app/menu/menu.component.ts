import { ChangePasswordFormModel } from './../dataModels/apiModels/changePasswordFormModel';
import { MyprofileComponent } from './../myprofile/myprofile.component';
import { PresidentType } from './../dataModels/enums/presidentType';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/authentication.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { User } from '../dataModels/viewModels/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  currentUser: User;
  isExpanded = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.loadAnimate();
  }

  loadAnimate() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
      // Toggle Nav
      nav.classList.toggle('nav-active');

      // Animate Links
      navLinks.forEach((link, index) => {
        const ln = link as HTMLLIElement;
        if (ln.style.animation) {
          ln.style.animation = '';
        } else {
          ln.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
        }
      });

      // Burger Animate
      burger.classList.toggle('toggle');
    });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.isPresident === PresidentType.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }

  loginModal() {
    const modalRef = this.modalService.open(LoginComponent, { windowClass: '.my-modal', size: 'sm' });
  }

  changePass() {
    const changePasswordModel = new ChangePasswordFormModel();
    changePasswordModel.userId = this.currentUser.id;

    const modalRef = this.modalService.open(MyprofileComponent, { windowClass: '.my-modal', size: 'sm' });
    modalRef.componentInstance.changePasswordModel = changePasswordModel;

    modalRef.result.then(result => {
      if (result === true) {
        this.authenticationService.logout();
      }
    });
  }

}



