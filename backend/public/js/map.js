const locationCoords = {
  // Major Cities
  "Beirut": [33.8938, 35.5018],
  "Tripoli": [34.4332, 35.8499],
  "Sidon": [33.5633, 35.3756],
  "Tyre": [33.2705, 35.2038],
  "Jounieh": [33.9808, 35.6178],
  "Baalbek": [34.0047, 36.2110],
  "Nabatieh": [33.3779, 35.4838],
  "Zahlé": [33.8463, 35.9020],
  "Byblos": [34.1236, 35.6511],
  "Jbeil": [34.1236, 35.6511],

  // Beirut Areas & Suburbs
  "Dahiyeh": [33.8400, 35.4900],
  "Achrafieh": [33.8886, 35.5130],
  "Gemmayzeh": [33.8917, 35.5117],
  "Mar Mikhael": [33.8931, 35.5150],
  "Ras Beirut": [33.8990, 35.4800],
  "Hamra": [33.8970, 35.4860],
  "Verdun": [33.8830, 35.4870],
  "Saifi": [33.8960, 35.5100],
  "Borj Hammoud": [33.8948, 35.5422],
  "Sin el Fil": [33.8828, 35.5367],
  "Dekwaneh": [33.8797, 35.5500],
  "Baouchrieh": [33.8770, 35.5530],
  "Jdeideh": [33.8730, 35.5580],
  "Antelias": [33.9100, 35.5850],
  "Dbayeh": [33.9200, 35.5780],
  "Hazmieh": [33.8600, 35.5350],
  "Araya": [33.8353, 35.5806],
  "Baabda": [33.8333, 35.5333],
  "Hadat": [33.8480, 35.5220],
  "Choueifat": [33.8200, 35.5000],
  "Ghobeiry": [33.8500, 35.4920],
  "Haret Hreik": [33.8450, 35.4880],
  "Boushriyeh": [33.8780, 35.5560],
  "Fanar": [33.8700, 35.5650],
  "Mansourieh": [33.8650, 35.5720],

  // Mount Lebanon (Keserwan, Metn, Chouf, Aley, Batroun)
  "Kaslik": [33.9850, 35.6200],
  "Maameltein": [33.9900, 35.6350],
  "Ghazir": [33.9700, 35.6300],
  "Harissa": [33.9765, 35.6361],
  "Tabarja": [34.0000, 35.6400],
  "Ajaltoun": [33.9700, 35.6500],
  "Ballouneh": [33.9600, 35.6600],
  "Adma": [33.9800, 35.6250],
  "Zouk Mikael": [33.9550, 35.6050],
  "Zouk Mosbeh": [33.9500, 35.6000],
  "Sarba": [33.9870, 35.6280],
  "Naccache": [33.9200, 35.5900],
  "Rabweh": [33.9300, 35.5950],
  "Bikfaya": [33.9300, 35.6550],
  "Beit Mery": [33.8600, 35.5900],
  "Broummana": [33.8700, 35.6350],
  "Beit Chabab": [33.9050, 35.6150],
  "Aintoura": [33.9650, 35.6500],
  "Dhour el Choueir": [33.8700, 35.6500],
  "Kfardebian": [34.0300, 35.7900],
  "Faraya": [34.0200, 35.7800],
  "Laqlouq": [34.1000, 35.8400],
  "Hrajel": [34.0000, 35.7500],
  "Akoura": [34.0900, 35.8200],
  "Jal el Dib": [33.9050, 35.5700],
  "Roumieh": [33.8800, 35.5800],
  "Bsharri": [34.2500, 36.0200],
  "Douma": [34.1000, 35.8300],
  "Qartaba": [34.1000, 35.8200],
  "Amchit": [34.1300, 35.6400],
  "Blat": [34.1100, 35.6500],
  "Monsef": [34.0900, 35.6450],
  "Keserwan": [34.0000, 35.6700],
  "Metn": [33.8800, 35.5700],
  "Aley": [33.8100, 35.5967],
  "Bchamoun": [33.7900, 35.5200],
  "Aramoun": [33.7900, 35.4900],
  "Bhamdoun": [33.8100, 35.6300],
  "Sofar": [33.8100, 35.6700],
  "Sawfar": [33.8100, 35.6700],
  "Hammana": [33.8200, 35.6600],
  "Falougha": [33.8300, 35.7000],
  "Saoufar": [33.8050, 35.6600],
  "Kafarshima": [33.8150, 35.5100],
  "Ain Saadeh": [33.8950, 35.5800],
  "Ain Aar": [33.9050, 35.6000],
  "Khalde": [33.7900, 35.4700],
  "Naameh": [33.7700, 35.4600],
  "Damour": [33.7200, 35.4500],
  "Dohat Aramoun": [33.7850, 35.4850],
  "Souk el Gharb": [33.8000, 35.5800],
  "Rechmaya": [33.7700, 35.5700],
  "Beiteddine": [33.6950, 35.5800],
  "Deir el Qamar": [33.7000, 35.5600],
  "Chouf": [33.6667, 35.5833],
  "Mukhtara": [33.6700, 35.5600],
  "Baakline": [33.6800, 35.5500],
  "Baaqline": [33.6750, 35.5450],
  "Baissour": [33.7800, 35.5600],
  "Ketermaya": [33.7200, 35.4900],
  "Bisri": [33.6500, 35.5200],
  "Bkassine": [33.5500, 35.3700],
  "Jezzine": [33.5433, 35.3633],
  "Btater": [33.7700, 35.5400],
  "Kahale": [33.8000, 35.5650],
  "Kfar Matta": [33.7800, 35.5500],
  "Batroun": [34.2553, 35.6581],
  "Chekka": [34.3000, 35.7000],
  "Enfeh": [34.3600, 35.7300],
  "Msaylha": [34.2300, 35.6500],
  "Bcharre": [34.2417, 36.0131],
  "Ehden": [34.2900, 36.0300],

  // North Lebanon
  "Akkar": [34.5333, 36.0833],
  "Halba": [34.5400, 36.0800],
  "Qbaiyat": [34.5700, 36.2000],
  "Qobayat": [34.5700, 36.2000],
  "Fnaidek": [34.5900, 36.2200],
  "Amioun": [34.2900, 35.8100],
  "Koura": [34.3000, 35.8000],
  "Beddawi": [34.4500, 35.8600],
  "Mina": [34.4500, 35.8300],
  "Minieh": [34.4700, 35.9600],
  "Sir Dinnieh": [34.4200, 35.9600],
  "Zgharta": [34.3900, 35.8900],
  "Barsa": [34.3500, 35.8500],
  "Anfeh": [34.3600, 35.7300],

  // Bekaa Valley
  "Chtaura": [33.8500, 35.8500],
  "Zahleh": [33.8463, 35.9020],
  "Bar Elias": [33.8000, 35.8500],
  "Rayak": [33.8500, 36.0000],
  "Anjar": [33.7300, 35.9300],
  "Kab Elias": [33.8100, 35.8700],
  "Joub Jannine": [33.6200, 35.7700],
  "Machghara": [33.5500, 35.7500],
  "Rachaiya": [33.5000, 35.8500],
  "Rashaya": [33.5000, 35.8500],
  "Hermel": [34.3942, 36.3858],
  "Labweh": [34.2500, 36.3500],
  "Ras Baalbek": [34.2600, 36.4000],
  "Arsal": [34.1900, 36.4100],
  "Deir el Ahmar": [34.1000, 36.1200],
  "Nabi Sheet": [34.0500, 36.2500],
  "Ferzol": [33.8200, 35.8800],
  "Taanayel": [33.8400, 35.8700],
  "Taalabaya": [33.8300, 35.8600],
  "Saghbine": [33.6600, 35.7300],
  "Sohmor": [33.6400, 35.7200],
  "Majdal Anjar": [33.7200, 35.9200],

  // South Lebanon
  "Bint Jbeil": [33.1217, 35.4331],
  "Bent Jbeil": [33.1217, 35.4331],
  "Khiam": [33.3036, 35.5472],
  "Marjayoun": [33.3614, 35.5917],
  "Hasbaya": [33.3970, 35.6860],
  "Nabatieh": [33.3779, 35.4838],
  "Naqoura": [33.1180, 35.1370],
  "Tebnine": [33.2000, 35.4200],
  "Rmeich": [33.1000, 35.4000],
  "Aita al-Shaab": [33.1200, 35.3900],
  "Mays al-Jabal": [33.1600, 35.4700],
  "Kfar Kila": [33.1500, 35.5200],
  "Kfar Tibnit": [33.3200, 35.4400],
  "Jbaa": [33.3500, 35.4200],
  "Ain Ebel": [33.1400, 35.4000],
  "Deir Mimas": [33.3200, 35.5800],
  "Chebaa": [33.3800, 35.7700],
  "Taibe": [33.2800, 35.5500],
  "Kfar Remen": [33.3300, 35.4500],
  "Adloun": [33.4100, 35.2800],
  "Insariyeh": [33.4200, 35.3000],
  "Sarafand": [33.4500, 35.3100],
  "Maghdouche": [33.5100, 35.3800],
  "Jiyeh": [33.6700, 35.4100],
  "Aichiye": [33.4100, 35.3700],
  "Qana": [33.2100, 35.3000],
  "Saida": [33.5633, 35.3756],

  // Misc
  "Ain Dara": [33.8500, 35.7300],
  "Ain Zhalta": [33.7700, 35.7100],
  "Bqaatouta": [33.9400, 35.6800],
  "Kfar Debiane": [34.0100, 35.7300],
  "Kfar Hbab": [34.0400, 35.6700],
  "Kfar Mashki": [33.6000, 35.7000],
  "Kfar Nabrakh": [33.7200, 35.5300],
  "Oyoun el Siman": [34.0400, 35.7800],
  "Ouadi Chahrour": [33.8500, 35.5200],
  "Temnine al-Fawqa": [33.9500, 36.0500],
  "Zrariye": [33.3800, 35.3200],
  "Niha": [33.7000, 35.7000],
  "Iaat": [34.1800, 36.1200],
  "Dahr el Ahmar": [34.1000, 36.1200]
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
    <div class="popup-title">${escapeHtml(incident.title)}</div>
    <div class="popup-detail"><strong>Location:</strong> ${escapeHtml(incident.location)}</div>
    <div class="popup-detail" style="display:flex; align-items:center; gap:6px;">
      <strong>Type:</strong>
      <span style="display:inline-flex; width:14px; height:14px; color: ${markerColors[incident.type] || '#888888'}">${getTypeIcon(incident.type)}</span>
      ${escapeHtml(incident.type)}
    </div>
    <div class="popup-detail"><strong>Time:</strong> ${formatTimestamp(incident.time)}</div>
    <div class="popup-detail"><strong>Status:</strong>
      <span class="status-badge status-badge--${statusClass(incident.status)}">${incident.status}</span>
    </div>`;
}

// Set up the Leaflet map and populate it with incident markers from the API
async function initMap() {
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

  try {
    // Fetch ALL incidents, then filter out rejected ones client-side
    const allIncidents = await MarsadAPI.getIncidents();
    const mapIncidents = allIncidents.filter(i => i.status !== 'Rejected');

    mapIncidents.forEach(incident => {
      // Look up coordinates by exact name first, then try case-insensitive
      let coords = locationCoords[incident.location];
      if (!coords) {
        const locLower = incident.location.toLowerCase().replace(/[éè]/g, 'e');
        const matchingKey = Object.keys(locationCoords).find(k =>
          k.toLowerCase().replace(/[éè]/g, 'e') === locLower
        );
        coords = matchingKey ? locationCoords[matchingKey] : null;
      }
      // Skip incidents with no known coordinates instead of falling back to Beirut
      if (!coords) return;

      // Small random offset so overlapping markers don't stack exactly
      const lat = coords[0] + (Math.random() - 0.5) * 0.005;
      const lng = coords[1] + (Math.random() - 0.5) * 0.005;

      L.marker([lat, lng], {
        icon: createPulseIcon(incident.type)
      }).addTo(map).bindPopup(buildPopupContent(incident), {
        maxWidth: 280,
        className: 'dark-popup'
      });
    });

    const countEl = document.getElementById('map-incident-count');
    if (countEl) countEl.textContent = mapIncidents.length + ' Reports';
  } catch (e) {
    const countEl = document.getElementById('map-incident-count');
    if (countEl) countEl.textContent = 'Failed to load incidents';
  }
}