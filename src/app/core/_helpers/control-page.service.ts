import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ControlPageService {

  disableScroll: boolean;
  infoText: string;
  createLink: string;
  createSubItemLink: string;
  pageTitle = '';
  breadcrumb = [{}];

  constructor() {
    this.disableScroll = false;
  }

  disableScrollBar() {
    this.disableScroll = true;
  }

  enableScroll() {
    this.disableScroll = false;
  }

  setInfoText(infoText) {
    this.infoText = infoText;
  }

  getInfoText() {
    return this.infoText;
  }

  setCreateLink(createLink) {
    return this.createLink = createLink;
  }

  getCreateLink() {
    return this.createLink;
  }


  setBreadcrumb(breadcrumbArray) {
    return this.breadcrumb = breadcrumbArray;
  }

  getBreadcrumb() {
    return this.breadcrumb;
  }

  setPageTitle(pageTitle) {
    return this.pageTitle = pageTitle;
  }

  getPageTitle() {
    return this.pageTitle;
  }


  setCreateSubItemLink(createSubItemLink) {
    return this.createSubItemLink = createSubItemLink;
  }

  getCreateSubItemLink() {
    return this.createSubItemLink;
  }


}
