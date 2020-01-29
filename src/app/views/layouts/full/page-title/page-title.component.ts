import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {BreadcrumbsService} from 'ng2-breadcrumbs';

@Component({
    selector: 'app-page-title',
    templateUrl: './page-title.component.html',
    styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {
    @Input() pageTitle: string;
    @Input() infoText: string;
    @Input() createLink: string;
    @Input() createSubItemLink: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private breadcrumbsService: BreadcrumbsService,

    ) {
    }

    ngOnInit() {
    }

    goBack() {
        this.location.back();
    }

    goForward() {
        this.location.forward();
    }
}
