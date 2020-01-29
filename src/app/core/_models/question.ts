import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';

export class Question {
  constructor(
    public id: number,
    public question: string,
    public answer: string,
    public products_id: number,
    public users_id: number,
    public answered_by_id: number,
    public created_at: string,
    public updated_at: string,
  ) {
  }
}
