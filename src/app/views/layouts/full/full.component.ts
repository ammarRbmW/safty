import * as $ from 'jquery';
import {MediaMatcher} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import {MenuItems} from '../../shared/menu-items/menu-items';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {ControlPageService} from '../../../core/_helpers/control-page.service';
import {SettingsLocal} from '../../../core/_helpers/settings.local';

/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})
export class FullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  dir = 'rtl';
  green: boolean;
  blue: boolean;
  dark = true;
  minisidebar: boolean;
  boxed: boolean;
  danger: boolean;
  showHide: boolean;
  sidebarOpened;
  settings: any;
  public config: PerfectScrollbarConfigInterface = {};
  private _mobileQueryListener: () => void;

  constructor(
    public controlPageService: ControlPageService,
    public settingsLocal: SettingsLocal,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {
    this.settings = this.settingsLocal.get();

    // This is for the topbar search
    (<any> $('.srh-btn, .cl-srh-btn')).on('click', function() {
      (<any> $('.app-search')).toggle(200);
    });
    // This is for the megamenu
  }

  // Mini sidebar
}
