export class Place {
    constructor(title, imageUri, address, location) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = {lat: location.lat, lng: location.lng}
        this.id = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
    }
            }