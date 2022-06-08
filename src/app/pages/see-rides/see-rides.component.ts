import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RidesService } from '../../shared/services/rides.service';
import {Router} from "@angular/router";
import { Observable } from 'rxjs/internal/Observable';
import { RideInterface } from 'src/app/shared/interfaces/ride.interface';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-see-rides',
  templateUrl: './see-rides.component.html',
  styleUrls: ['./see-rides.component.scss']
})
export class SeeRidesComponent implements OnInit {
  public rides$: Observable<RideInterface | null> = this.rs.rides$.asObservable();
  public loading = false;
  private map: any;

  public CONFIGURATION = {
    "ctaTitle": "Checkout",
    "mapOptions": {"center":{"lat":37.4221,"lng":-122.0841},"fullscreenControl":true,"mapTypeControl":false,"streetViewControl":true,"zoom":13,"zoomControl":true,"maxZoom":22},
    "mapsApiKey": environment.googleKey,
    "capabilities": {"addressAutocompleteControl":true,"mapDisplayControl":true,"ctaControl":true}
  };

  rides: any = [];
  public form: FormGroup = this.fb.group({
    city: ['', Validators.required],
    home_to_office: ['', Validators.required],
    date: ['', Validators.required]
  });

  constructor(private rs: RidesService, private fb: FormBuilder, private router : Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.rides$.subscribe(data => {
      if (data) {
        this.rides = data;
        this.loading = false;
      } else {
        this.getAllRides()
      }
    }) 

    this.initMap()
  }

  public submit() {
    if (this.form.valid) {
      this.loading = true;
      
      this.rs.searchRideByCity(this.form.getRawValue()).subscribe((data) => {
        this.rides = data;
        this.loading = false;
      })
    }
  }

  public getAllRides() {
    this.rs.getRides().subscribe((data) => {
      this.rides = data;
      this.loading = false;
      this.addMarker()
    })
  }
  
  public initMap() {
    const mapElement = document.getElementById("map")

    if(mapElement) {
      this.map = new google.maps.Map(mapElement, {
        zoom: this.CONFIGURATION.mapOptions.zoom,
        center: { lat: 43.604652, lng: 1.444209 },
        mapTypeControl: false,
        fullscreenControl: this.CONFIGURATION.mapOptions.fullscreenControl,
        zoomControl: this.CONFIGURATION.mapOptions.zoomControl,
        streetViewControl: this.CONFIGURATION.mapOptions.streetViewControl
      });
    }
  }

  public addMarker() {
    this.rides.map((ride: RideInterface) => {
      const lat = ride.lat;
      const lng = ride.lng;
      

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: this.map,
      });

      const infowindow: any = new google.maps.InfoWindow({
        content: this.setMarkerInfo(ride),
        maxWidth: 200,
      });

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map: this.map,
          shouldFocus: false,
        });

        const elmntToView = document.querySelector(`#ride-${ride.id_ride}`)
        if (elmntToView) elmntToView.scrollIntoView();
      });


    })
  }

  public setMarkerInfo (ride: RideInterface) {
    const contentString =
    `
    <p>${ride.street}, ${ride.city}</p>
    <a href="/trajet/${ride.id_ride}">voir</a>
    `

    return contentString
  }

  
}
