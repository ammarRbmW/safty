import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeleteService} from '../../../core/_helpers/delete.service';

@Component({
  selector: 'app-crud-list',
  templateUrl: './crud-list.component.html',
  styleUrls: ['./crud-list.component.scss']
})
export class CrudListComponent implements OnInit {
  @Input() bigImage: string;
  @Input() smallImage: string;
  @Input() cardTitle: string;
  @Input() cardDescription: string;
  @Input() cardDate: string;
  @Input() showLink: string;
  @Input() editLink: string;
  @Input() item: object;
  @Input() index: number;
  @Input() active: number;
  @Input() tagText: string;
  @Input() isLoading: boolean;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  @Input() dataFromParent: String;
  @Output() deleteEvent = new EventEmitter<string>();
  data: any;

  constructor(private messageService: DeleteService) {

  }

  _deleteEvent(data: string) {
    this.deleteEvent.emit(data);
  }

  clickFilter(): void {
    const next = {
      item: this.item,
      index: this.index,
    };

    this.messageService.filter(next);
  }

  ngOnInit() {
  }
}
