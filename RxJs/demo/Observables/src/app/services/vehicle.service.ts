import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { VehicleData } from '../data/vehicle-data';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor() { }

  getVehicles(): Vehicle[]{
    return new VehicleData().vehicles;
  }
}
