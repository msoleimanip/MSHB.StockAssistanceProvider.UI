import { SearchModel } from './../generalModels/searchModel';

export class SearchUserFormModel extends SearchModel {
  username = '';
  firstName = '';
  lastName = '';
  phoneNumber = '';
  isActive?: boolean = null;
}
