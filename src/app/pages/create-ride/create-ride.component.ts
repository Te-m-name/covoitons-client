import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RidesService} from "../../shared/services/rides.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create-ride.component.html',
  styleUrls: ['./create-ride.component.scss']
})
export class CreateComponent implements OnInit {
  cityOptions: any = {
    componentRestrictions: { country: 'FR' },
    types: ['locality']
  }

  addressOptions: any = {
    componentRestrictions: { country: 'FR' },
    types: ['address'],
    fields: ["address_components", "geometry"]
  }

  codeOptions: any = {
    componentRestrictions: { country: 'FR' },
    types: ['postal_code']
  }

  public componentForm = [
    'street',
    'city',
    'post_code',
  ];

  public form_rides: FormGroup=this.fb.group({
    street: ["", Validators.required],
    post_code: ["", Validators.required],
    city: ["", Validators.required],
    date:["", Validators.required],
    arrival_time:["", Validators.required],
    home_to_office: ["", Validators.required],
    places: ["", Validators.required]
  });
  public error!: string;

  constructor(private fb: FormBuilder, private ridesService: RidesService, private router:Router) { }

  ngOnInit(): void {
  }

  userAddress: any;


  handleAddressChange(address: any) {
    this.userAddress = address
    this.fillInAddress(address);
  }

  public submit(){
    if (this.form_rides.valid){
      const newRide = {
        ...this.form_rides.getRawValue(),
        departure_date: this.form_rides.getRawValue().date.split('T')[0],
        lat: this.userAddress.geometry.location.lat(),
        lng: this.userAddress.geometry.location.lng()
      }

      this.ridesService.createRide(newRide).subscribe(()=>{
        this.router.navigateByUrl("");
      }, (err)=>{
        this.error=err?.error || "error"
      })
    }
  }

  public fillInAddress(place: any) {
    const addressNameFormat: any = {
      'street_number': 'short_name',
      'route': 'long_name',
      'locality': 'long_name',
      'postal_code': 'short_name',
    };

    const getAddressComp = function (type: any) {
      for (const component of place.address_components) {
        
        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return '';
    };

    this.form_rides.patchValue({
      street: getAddressComp('street_number') + ' '
      + getAddressComp('route')
    });
    this.form_rides.patchValue({post_code: getAddressComp('postal_code')});
    this.form_rides.patchValue({city: getAddressComp('locality')});
  }
}
