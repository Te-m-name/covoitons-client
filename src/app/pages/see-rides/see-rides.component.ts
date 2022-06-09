import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { RidesService } from '../../shared/services/rides.service';
import { Observable } from 'rxjs/internal/Observable';
import { RideInterface } from 'src/app/shared/interfaces/ride.interface';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-see-rides',
  templateUrl: './see-rides.component.html',
  styleUrls: ['./see-rides.component.scss'],
  providers: [DatePipe]
})
export class SeeRidesComponent implements OnInit {
  public rides$: Observable<RideInterface | null> = this.rs.rides$.asObservable();
  public loading = false;
  private map: any;
  private allMarkers: google.maps.Marker[] = [];

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
    date: [this.today(), Validators.required]
  });

  constructor(private rs: RidesService, private fb: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loading = true;
    this.initMap()
    this.rides$.subscribe(data => {
      if (data) {
        this.rides = data;
        this.loading = false;
        this.addMarker();
      } else {
        this.getAllRides()
      }
    })
  }

  public submit() {
    if (this.form.valid) {
      this.loading = true;
      this.rs.searchRideByCity(this.form.getRawValue()).subscribe((data) => {
        this.rides = data;
        this.loading = false;
        this.deleteMarkers();
        this.addMarker();
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

      this.allMarkers.push(marker);
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

  public deleteMarkers() {
    if (this.allMarkers) {
      this.allMarkers.forEach(marker => {
        marker.setMap(null);
        console.log(marker)
      })

      this.allMarkers.length = 0;
    }
  }

  public today() {
    const date = new Date();
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  
}
