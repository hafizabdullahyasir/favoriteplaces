export function getMapPreview(lat, lng) {
    // Using a basic OpenStreetMap tile - very simple and reliable
    const zoom = 12; // Slightly zoomed out for better view
    
    // Calculate tile coordinates for OpenStreetMap
    const tileX = Math.floor((lng + 180) / 360 * Math.pow(2, zoom));
    const tileY = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
    
    // Direct tile URL from OpenStreetMap - completely free and reliable
    const imagePreviewUrl = `https://tile.openstreetmap.org/${zoom}/${tileX}/${tileY}.png`;
    
    return imagePreviewUrl;
}