import { Component, OnInit } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { delay, concatMap } from 'rxjs/operators'
import { Vehicle } from '../models/vehicle';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss']
})
export class ObservablesComponent implements OnInit {
  vehicleObservable$: Observable<Vehicle>
  vehicleList: Vehicle[];
  error: boolean = false;

  constructor(private _vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleList = [];
    this.vehicleObservable$ = new Observable((observer) => {
       if(this.error){
         observer.error('Bad things happened');
       }
       for(let v of this._vehicleService.getVehicles()){
          observer.next(v);
       }
       observer.complete();
    });
  }

   onWithFromArray(){
      from(this._vehicleService.getVehicles())
         .subscribe((data) => console.log(data),
         (err) => console.log(err),
         () => console.log('I am done with from!'));
   }

   onCallOf(){      
      of(this._vehicleService.getVehicles())
         .subscribe((data) => console.log(data),
         (err) => console.log(err),
         () => console.log('I am done with of!')
      );
   }

  onWithDelay(){
     const list = this._vehicleService.getVehicles();
     from(list).pipe(concatMap((data) => of(data).pipe(delay(1000))))
      .subscribe((vehicle) => console.log(vehicle),
      (err) => console.log(err),
      () => console.log('I am done with observable with delay!'));      
  }

  onWithoutObservables(){
     for(let v of this._vehicleService.getVehicles()){
        console.log(v.RegistrationNo);
     }
  }

  onClick(){
    this.vehicleObservable$.subscribe(
         (data) => console.log(data.RegistrationNo),//The work
         (err) => console.log("Got Errors here!"), // The problem(error) 
         () => console.log('We are done fetching vehicles!') //The completion
    )
  }
}
