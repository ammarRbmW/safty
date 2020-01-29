import {Component, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Attribute, AttributeData, AttributeValueAdapter} from '../../../../core/_models/attribute';
import {Color} from '../../../../core/_models/color';
import {Size} from '../../../../core/_models/size';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {EventEmitter} from '@angular/core';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent implements OnInit, OnChanges {

  @Input() field: string;
  theForm: FormGroup;
  @Input() attributes: Attribute[];
  @Input() colors: Color[];
  @Input() sizes: Size[];
  @Input() itemsData: any[];
  @Input() isItemEdit = false;

  @Output() outForm: FormGroup;
  @Output() productItemsArray = new EventEmitter<any[]>();
  updateItem = {index: 0, id: 0};
  isUpdate = false;
  public formGroup: FormGroup;
  attributesSelect = new FormControl();
  colorSelect = new FormControl();
  sizeSelect = new FormControl();
  itemAttrs = [];
  public formItem: FormGroup;
  tableIsChange = false;

  displayedColumns = ['code', 'quantity', 'price', 'new_price', 'pieces', 'size', 'color', 'action'];

  dataSource = new MatTableDataSource<any>(this.itemsData);

  constructor(private fb: FormBuilder, public translate: TranslateService, private toastr: ToastrService,
              public dialog: MatDialog) {
    this.formGroup = this.theForm;
  }

  ngOnInit() {
    this.formGroup = this.theForm = this.fb.group({
      items: new FormArray([])

    });
    this.formItem = this.fb.group({
      code: [null, Validators.compose([Validators.required, Validators.min(0)])],
      quantity: [null, Validators.compose([Validators.min(0)])],
      price: [null, Validators.compose([Validators.required, Validators.min(0)])],
      new_price: [null, Validators.compose([Validators.min(0)])],
      pieces: [null],
    });

  }

  addItemToArray() {

    this.getAttrObj();

    const item = {
      id: null,
      quantity: this.formItem.controls.quantity.value,
      code: this.formItem.controls.code.value,
      price: this.formItem.controls.price.value,
      new_price: this.formItem.controls.new_price.value,
      pieces: this.formItem.controls.pieces.value,
      colors_id: this.colorSelect.value,
      sizes_id: this.sizeSelect.value,
      attributes: this.itemAttrs
    };
    if (this.isUpdate) {
      item.id = this.updateItem.id;
      const temp = [...this.itemsData];
      temp.splice(this.updateItem.index, 1);
      this.itemsData = temp;
      this.isUpdate = false;
      this.updateItem.index = 0;
      this.updateItem.id = 0;
    }
    // @ts-ignore
    this.itemsData.push(item);
    this.dataSource = new MatTableDataSource<any>(this.itemsData);
    this.productItemsArray.emit(this.itemsData);
    this.resetForms();
  }

  resetForms() {
    this.formItem.reset();
    this.theForm.reset();
    this.t.clear();
    this.attributesSelect.reset();
    this.colorSelect.reset();
    this.sizeSelect.reset();
  }

  editItem(i, id) {
    this.resetForms();
    this.isUpdate = true;

    this.updateItem.index = i;
    this.updateItem.id = id;

    const editItem = this.itemsData[i];

    this.formItem.controls.code.setValue(editItem.code);
    this.formItem.controls.quantity.setValue(editItem.quantity);
    this.formItem.controls.price.setValue(editItem.price);
    this.formItem.controls.new_price.setValue(editItem.new_price);
    this.formItem.controls.pieces.setValue(editItem.pieces);

    if (editItem.sizes_id) {
      this.sizeSelect.setValue(editItem.sizes_id);
    }
    if (editItem.colors_id) {
      this.colorSelect.setValue(editItem.colors_id);
    }


    this.setAttData(editItem.attributes);

  }

  setAttData(editItem) {


    if (editItem) {
      console.log(editItem);
      const numberOfTickets = editItem.length || 0;
      const attSelected = [];
      for (let i = 0; i < numberOfTickets; i++) {
        const index = this.attributes.findIndex(x => x.id === editItem[i].attributes_id);
        attSelected.push(this.attributes[index]);
        this.attributesSelect.setValue(attSelected);
        this.t.push(this.fb.group({
          keyEn: [editItem[i].translations.en.value],
          keyAr: [editItem[i].translations.ar.value]
        }));
      }
    }

  }

  deleteItem(index, itemId) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const temp = [...this.itemsData];
        temp.splice(index, 1);
        this.itemsData = temp;
        this.dataSource = new MatTableDataSource<any>(this.itemsData);
        this.productItemsArray.emit(this.itemsData);
        this.toastr.success('Item deleted successfully.', 'Success');
      }
    });
  }

// convenience getters for easy access to form fields
  get f() {
    return this.theForm.controls;
  }

  get t() {
    return this.f.items as FormArray;
  }

  onChangeAttributes($event) {
    this.onChangeTickets();
    this.getAttrObj();
  }

  getAttrObj() {
    this.itemAttrs = [];
    if (this.attributesSelect.value) {
      for (let i = 0; i < this.attributesSelect.value.length; i++) {
        const attr = {
          attributes_id: this.attributesSelect.value[i].id,
          translations: {
            en: {
              value: this.theForm.controls.items.value[i].keyEn
            },
            ar: {
              value: this.theForm.controls.items.value[i].keyAr
            }
          }
        };
        this.itemAttrs.push(attr);
      }
    }

  }

  attrArrayFormat(itemsData) {
    let arrayFormat = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < itemsData.length; i++) {
      const itemAttrs = [];
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < itemsData[i].items_attributes.length; j++) {
        const currentAttr = itemsData[i].items_attributes[j];
        console.log(currentAttr);
        const attr = {
          attributes_id: currentAttr.attribute.id,
          translations: {
            en: {
              value: currentAttr.translations.en.value
            },
            ar: {
              value: currentAttr.translations.ar.value
            }
          }
        };
        itemAttrs.push(attr);
      }
      let colorsId = null;
      let sizesId = null;
      if (itemsData[i].color) {
        colorsId = itemsData[i].color.id;
      }
      if (itemsData[i].size) {
        sizesId = itemsData[i].size.id;
      }
      const item = {
        id: itemsData[i].id,
        quantity: itemsData[i].quantity,
        code: itemsData[i].code,
        price: itemsData[i].price,
        new_price: itemsData[i].new_price,
        pieces: itemsData[i].pieces,
        colors_id: colorsId,
        sizes_id: sizesId,
        attributes: itemAttrs
      };
      // @ts-ignore
      arrayFormat.push(item);
    }
    return arrayFormat;
  }

  onChangeTickets() {

    const numberOfTickets = this.attributesSelect.value.length || 0;
    if (this.t.length < numberOfTickets) {
      for (let i = this.t.length; i < numberOfTickets; i++) {
        this.t.push(this.fb.group({
          keyEn: [''],
          keyAr: ['']
        }));
      }
    } else {
      for (let i = 0; i < this.attributes.length; i++) {
        const index = this.attributesSelect.value.findIndex(x => x.id === this.attributes[i].id);
        if (index === -1) {
          this.t.removeAt(i);
        }
      }
    }
  }

  getDimensionsByFilter(id) {
    return this.attributes.filter(x => x.id === id);
  }

  findNameById(array, id) {
    if (array && id) {
      const obj = array.find(x => x.id === id);
      return obj.nameEn + ' - ' + obj.nameAr;
    } else {
      return null;
    }
  }

  ngOnChanges(changes) {
    if (changes.itemsData) {
      if (this.itemsData && this.isItemEdit && !this.tableIsChange) {
        if (this.itemsData.length !== 0) {
          this.tableIsChange = true;
          this.itemsData = this.attrArrayFormat(this.itemsData);
          this.dataSource = new MatTableDataSource<any>(this.itemsData);
          this.productItemsArray.emit(this.itemsData);
        }
      }
    }
  }

}
