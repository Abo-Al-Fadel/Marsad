const locationCoords = {
  "Beirut": [33.8938, 35.5018],
  "Dahiyeh": [33.8400, 35.4900],
  "Tyre": [33.2705, 35.2038],
  "Sidon": [33.5633, 35.3756],
  "Nabatieh": [33.3779, 35.4838],
  "Baalbek": [34.0047, 36.2110],
  "Tripoli": [34.4332, 35.8499],
  "Jounieh": [33.9808, 35.6178],
  "Bint Jbeil": [33.1217, 35.4331],
  "Khiam": [33.3036, 35.5472],
  "Marjayoun": [33.3614, 35.5917],
  "Hermel": [34.3942, 36.3858],
  "Zahlé": [33.8463, 35.9020],
  "Chouf": [33.6667, 35.5833],
  "Byblos": [34.1236, 35.6511],
  "Aley": [33.8100, 35.5967],
  "Batroun": [34.2553, 35.6581],
  "Akkar": [34.5333, 36.0833],
  "Bcharre": [34.2417, 36.0131]
};

const markerColors = {
  Airstrike: '#cc0000',
  Explosion: '#ff8c00',
  'Drone Strike': '#3377ff',
  'Surveillance Drone': '#3377ff',
  Shelling: '#8833cc',
  Gunfire: '#cc6600',
  'Missile Launch': '#ff3366',
  Other: '#888888'
};
// Create a glowing pulse marker icon based on the incident type
function createPulseIcon(type) {
  const typeSlug = typeClass(type);
  return L.divIcon({
    className: '',
    html: `<div class="custom-marker custom-marker--${typeSlug}">
        <div class="marker-ring marker-ring--${typeSlug}"></div>
      </div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -10]
  });
}
// Build the HTML template for a map marker's popup
function buildPopupContent(incident) {
  return `
    <div class="popup-title">${incident.title}</div>
    <div class="popup-detail"><strong>Location:</strong> ${incident.location}</div>
    <div class="popup-detail" style="display:flex; align-items:center; gap:6px;">
      <strong>Type:</strong> 
      <span style="display:inline-flex; width:14px; height:14px; color: ${markerColors[incident.type] || '#888888'}">${getTypeIcon(incident.type)}</span> 
      ${incident.type}
    </div>
    <div class="popup-detail"><strong>Time:</strong> ${formatTimestamp(incident.time)}</div>
    <div class="popup-detail"><strong>Status:</strong>
      <span class="status-badge status-badge--${statusClass(incident.status)}">${incident.status}</span>
    </div>`;
}
// Set up the Leaflet map and populate it with incident markers
function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl || typeof L === 'undefined') return;
  const map = L.map('map', {
    center: [33.8547, 35.8623],
    zoom: 8,
    zoomControl: true,
    attributionControl: true
  });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 18
  }).addTo(map);
  // Only show verified incidents on the map
  const verifiedIncidents = incidents.filter(i => i.status === 'Verified');
  verifiedIncidents.forEach(incident => {
    let coords = locationCoords[incident.location];
    if (!coords) {
      const matchingKey = Object.keys(locationCoords).find(k => k.toLowerCase() === incident.location.toLowerCase().replace('é', 'e'));
      coords = matchingKey ? locationCoords[matchingKey] : locationCoords["Beirut"];
    }
    const lat = coords[0] + (Math.random() - 0.5) * 0.01;
    const lng = coords[1] + (Math.random() - 0.5) * 0.01;
    L.marker([lat, lng], {
      icon: createPulseIcon(incident.type)
    }).addTo(map).bindPopup(buildPopupContent(incident), {
      maxWidth: 280,
      className: 'dark-popup'
    });
  });
  const countEl = document.getElementById('map-incident-count');
  if (countEl) countEl.textContent = verifiedIncidents.length + ' Verified Reports';
}