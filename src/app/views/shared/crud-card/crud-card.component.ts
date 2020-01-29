import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeleteService} from '../../../core/_helpers/delete.service';

@Component({
  selector: 'app-crud-card',
  templateUrl: './crud-card.component.html',
  styleUrls: ['./crud-card.component.scss']
})
export class CrudCardComponent implements OnInit {
  @Input() bigImage: string;
  @Input() smallImage: string;
  @Input() cardTitle: string;
  @Input() cardDescription: string;
  @Input() showLink: string;
  @Input() editLink: string;
  @Input() item: object;
  @Input() index: number;
  @Input() active: number;
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
