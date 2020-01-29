import {
  ChangeDetectorRef,
  Component,
  OnDestroy, ElementRef, OnInit
} from '@angular/core';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {MediaMatcher} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {MenuItems} from '../../../shared/menu-items/menu-items';
import {TokenLocal} from '../../../../core/_helpers/token.local';
import {UserLocal} from '../../../../core/_helpers/user.local';
import {AuthenticationApi} from '../../../../core/_api';
import {SettingsLocal} from '../../../../core/_helpers/settings.local';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy, OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;
  user: any;
  private mobileQueryListener: () => void;

  constructor(
    private element: ElementRef,
    private router: Router,
    public userLocal: UserLocal,
    public tokenLocal: TokenLocal,
    public settingsLocal: SettingsLocal,
    private authenticationApi: AuthenticationApi,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  logout(event: MouseEvent) {
    this.authenticationApi.logout();

    this.router.navigate(['/auth/login']);
  }

  ngOnInit(): void {
    console.log(this.userLocal);
    this.settingsLocal.get();
  }
}
