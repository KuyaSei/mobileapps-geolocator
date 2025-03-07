import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap, Marker }from '@capacitor/googlemaps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  @ViewChild('map')
  mapRef! : ElementRef<HTMLElement>:
  map!: GoogleMap;

  location: any;

  constructor() {}

  async getCurrentLocation(){
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current Position: ', +coordinates);
      console.log(coordinates);

      // Extract the langitude and longitude
      const {latitude, longitude} = coordinates.coords;
      alert(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }
    catch(error) {
      alert('Error getting location: ' + error);
    }
  }

  async watchLocation() {
    const watchID = Geolocation.watchPosition({}, (position, err) => {
      if(err){
        console.log('Error watching position: ', err);
        return;
      }
      console.log('Watched Position: ', position);
      this.location = position?.coords;  
    });
  }


  async getCurrentLocationAndDisplayOnMap() {
    try {
      const position: Position = await Geolocation.getCurrentPosition;
      const langitude = position.coords.langitude; 
      const longitude = position.coords.longitude;

      this.map = await GoogleMap.create({
        id: 'find-me-map',
        element: this.mapRef.nativeElement,
        apiKey: '',
        config: {
          center:{
            lat: latitude,
            lng: longitude,
          },
          zoom: 15,
        }
      });

      const markerId = await this.map.addMarker({
        coordinate: {
          lat: latitude,
          long: longitude,
        }
      })
    }
    catch(error) {

    }
  }

}
