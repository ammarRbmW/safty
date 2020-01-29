import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface Saperator {
  name: string;
  type?: string;
}

export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'home',
    name: 'Home',
    type: 'link',
    icon: 'dashboard'
  },
  {
    state: '',
    name: 'Products',
    type: 'sub',
    icon: 'widgets',
    children: [
      {state: '/categories', name: 'Categories', type: 'adminLink'},
      {state: '/brands', name: 'Brands', type: 'adminLink'},
      {state: '/catalogs', name: 'Catalogs', type: 'adminLink'},
    ]
  }, {
    state: '',
    name: 'Visitors Request',
    type: 'saperator',
    icon: 'av_timer'
  }, {
    state: '',
    name: 'Orders',
    type: 'sub',
    icon: 'view_headline',
    children: [
      {state: '/orders', name: 'Orders', type: 'adminLink'},
    ]
  }, {
    state: '',
    name: 'Questions',
    type: 'sub',
    icon: 'insert_comment',
    children: [
      {state: '/questions', name: 'Questions', type: 'adminLink'},
      {state: '/reviews', name: 'Reviews', type: 'adminLink'},
    ]
  },
  {
    state: '',
    name: 'Property',
    type: 'saperator',
    icon: 'av_timer'
  },
  {
    state: '',
    name: 'Attributes',
    type: 'sub',
    icon: 'label_outline',
    children: [
      {state: '/attributes', name: 'Attributes', type: 'adminLink'},
      {state: '/sizes', name: 'Sizes', type: 'adminLink'},
      {state: '/colors', name: 'Colors', type: 'adminLink'},
    ]
  },
  {state: 'coupons', name: 'Coupons', type: 'link', icon: 'style'},
  {state: 'shipping-zones', name: 'Shipping zones', type: 'link', icon: 'local_shipping'},
  {state: 'currencies', name: 'Currency', type: 'link', icon: 'attach_money'},
  {state: 'sliders', name: 'Sliders', type: 'link', icon: 'credit_card'},
  {
    state: '',
    name: 'Sections',
    type: 'saperator',
    icon: 'av_timer'
  },
  {state: 'ads', name: 'Ads', type: 'link', icon: 'burst_mode'},
  {state: 'pages', name: 'Pages', type: 'link', icon: 'pages'},
  {state: 'sliders', name: 'Sliders', type: 'link', icon: 'view_carousel'},

  {
    state: '',
    name: 'Users Management',
    type: 'saperator',
    icon: 'av_timer'
  },

  {
    state: '',
    name: 'Users',
    type: 'sub',
    icon: 'person',
    children: [
      {state: '/users/type/all', name: 'All Users', type: 'adminLink'},
      {state: '/users/type/clients', name: 'Clients', type: 'adminLink'},
      {state: '/users/type/admins', name: 'Admins', type: 'adminLink'},

    ]
  },

];
const superAdmin = MENUITEMS;

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return superAdmin;
    // return dashItem;
  }
}
