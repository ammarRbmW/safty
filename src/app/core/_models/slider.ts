import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';

export class SliderData {
  constructor(
    public id: number,
    public image: string,
    public url: string,
    public created_at: string,
    public updated_at: string,
  ) {
  }
}

export class Slider {
  constructor(
    public id: number,
    public image: string,
    public url: string,
    public createdAt: string,
    public updatedAt: string,
  ) {

  }
}

@Injectable({
  providedIn: 'root'
})

export class SliderAdapter implements Adapter<Slider> {
  adapt(slider: SliderData): Slider {
    return new Slider(
      slider.id,
      slider.image,
      slider.url,
      slider.created_at,
      slider.updated_at,
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class SliderDataAdapter implements Adapter<SliderData> {
  adapt(slider: Slider): SliderData {
    return new SliderData(
      slider.id,
      slider.image,
      slider.url,
      slider.createdAt,
      slider.updatedAt,
    );
  }
}
