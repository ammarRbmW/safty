import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';

@Injectable({providedIn: 'root'})
export class DeleteService implements OnDestroy {

    constructor() {
    }

    private _listners = new Subject<any>();

    listen(): Observable<any> {
        return this._listners.asObservable();
    }

    filter(filterBy: any) {
        this._listners.next(filterBy);
    }

    ngOnDestroy(): void {
        this._listners = null;
    }

}
