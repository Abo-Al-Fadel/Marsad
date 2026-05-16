const SVG_THUMBS_UP = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`;
const SVG_THUMBS_DOWN = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>`;
const lebaneseLocations = [
  "Achrafieh", "Adloun", "Adma", "Aichiye", "Ain Aar", "Ain Dara",
  "Ain Ebel", "Ain Saadeh", "Ain Zhalta", "Aintoura", "Aita al-Shaab",
  "Ajaltoun", "Akkar", "Akoura", "Aley", "Amchit", "Amioun",
  "Anfeh", "Anjar", "Antelias", "Aramoun", "Araya", "Arsal",
  "Baabda", "Baakline", "Baalbek", "Baaqline", "Baissour",
  "Ballouneh", "Baouchrieh", "Bar Elias", "Barsa", "Batroun",
  "Bchamoun", "Bcharre", "Beddawi", "Beit Chabab", "Beit Mery",
  "Beiteddine", "Beirut", "Bent Jbeil", "Bhamdoun", "Bikfaya",
  "Bint Jbeil", "Bisri", "Bkassine", "Blat", "Borj Hammoud",
  "Boushriyeh", "Bqaatouta", "Broummana", "Bsharri", "Btater",
  "Byblos", "Chebaa", "Chekka", "Choueifat", "Chouf", "Chtaura",
  "Dahiyeh", "Damour", "Dbayeh", "Deir el Ahmar", "Deir el Qamar",
  "Deir Mimas", "Dekwaneh", "Dhour el Choueir", "Dohat Aramoun",
  "Douma", "Ehden", "Enfeh",
  "Falougha", "Faraya", "Fanar", "Ferzol", "Fnaidek",
  "Gemmayzeh", "Ghazir", "Ghobeiry",
  "Hadat", "Halba", "Hammana", "Haret Hreik",
  "Harissa", "Hasbaya", "Hazmieh", "Hermel", "Hrajel",
  "Insariyeh", "Iaat",
  "Jal el Dib", "Jbaa", "Jbeil", "Jdeideh", "Jezzine",
  "Jiyeh", "Jounieh", "Joub Jannine",
  "Kafarshima", "Kahale", "Kab Elias", "Kaslik", "Keserwan",
  "Ketermaya", "Kfar Debiane", "Kfar Hbab", "Kfar Kila",
  "Kfar Mashki", "Kfar Matta", "Kfar Nabrakh", "Kfar Remen",
  "Kfar Tibnit", "Kfardebian", "Khalde", "Khiam", "Koura",
  "Labweh", "Laqlouq",
  "Maameltein", "Machghara", "Maghdouche", "Majdal Anjar",
  "Mansourieh", "Mar Mikhael", "Marjayoun", "Mays al-Jabal",
  "Metn", "Mina", "Minieh", "Monsef", "Mukhtara", "Msaylha",
  "Nabatieh", "Naameh", "Nabi Sheet", "Naccache", "Naqoura",
  "Niha",
  "Ouadi Chahrour", "Oyoun el Siman",
  "Qana", "Qartaba", "Qbaiyat", "Qobayat",
  "Rabweh", "Rachaiya", "Ras Baalbek", "Ras Beirut",
  "Rashaya", "Rayak", "Rechmaya", "Rmeich", "Roumieh",
  "Saghbine", "Saida", "Saifi", "Saoufar", "Sarafand",
  "Sarba", "Sawfar", "Sidon", "Sin el Fil", "Sir Dinnieh",
  "Sohmor", "Sofar", "Souk el Gharb",
  "Tabarja", "Taanayel", "Taalabaya", "Taibe", "Tebnine",
  "Temnine al-Fawqa", "Tripoli", "Tyre",
  "Verdun",
  "Zahlé", "Zgharta", "Zouk Mikael", "Zouk Mosbeh", "Zrariye"
];
const incidentTypeIcons = {
  "Airstrike": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4z"/></svg>',
  "Ambush": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>',
  "Armed Clash": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
  "Artillery Fire": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  "Assassination Attempt": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
  "Blockade": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',
  "Bombing": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/></svg>',
  "Car Bomb": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17h14v-5l-2-4H7l-2 4v5z"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/><polygon points="12 2 9 6 15 6 12 2"/></svg>',
  "Chemical Attack": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/></svg>',
  "Cluster Munitions": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3"/><circle cx="7" cy="15" r="3"/><circle cx="17" cy="15" r="3"/></svg>',
  "Cyber Attack": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  "Demolition": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 22h20"/><path d="M6 18V4l6 4 6-4v14"/></svg>',
  "Drone Strike": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0"/><path d="M2 7l4 3m12-3l-4 3M2 17l4-3m12 3l-4-3"/><rect x="6" y="10" width="12" height="4" rx="1"/></svg>',
  "Evacuation": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  "Explosion": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  "Fire": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 1 0-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  "Gunfire": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  "Hostage Situation": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  "IED (Improvised Explosive Device)": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4m0 12v4M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>',
  "Incursion": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="5 12 12 5 19 12"/><polyline points="5 19 12 12 19 19"/></svg>',
  "Infantry Advance": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  "Kidnapping": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/><line x1="3" y1="3" x2="21" y2="21"/></svg>',
  "Land Mine": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M3.6 15h16.8"/><path d="M8 15l4-13 4 13"/></svg>',
  "Looting": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a4 4 0 0 0-8 0v2"/></svg>',
  "Missile Launch": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4z"/></svg>',
  "Mortar Fire": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  "Naval Bombardment": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20s2-1 5-1 5 2 10 2 5-1 5-1"/><path d="M4 16l3-10h10l3 10"/></svg>',
  "Power Outage": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
  "Raid": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>',
  "Rocket Attack": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4z"/></svg>',
  "Roadblock": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>',
  "Shelling": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  "Sniper Fire": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>',
  "Sonic Boom": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/></svg>',
  "Supply Drop": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="10" width="16" height="12" rx="1"/><path d="M12 2v8"/><path d="M8 6l4 4 4-4"/></svg>',
  "Surveillance Drone": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"/><path d="M2 7l4 3m12-3l-4 3M2 17l4-3m12 3l-4-3"/><rect x="6" y="10" width="12" height="4" rx="1"/></svg>',
  "Tear Gas": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2h8l2 6H6l2-6z"/><path d="M6 8c0 6-2 14-2 14h16s-2-8-2-14"/></svg>',
  "Tunnel Discovery": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><rect x="9" y="13" width="6" height="8"/></svg>',
  "White Phosphorus": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/><circle cx="12" cy="12" r="5"/></svg>',
  "Other": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>'
};
const incidentTypes = Object.keys(incidentTypeIcons);
const sampleTitles = {
  Airstrike: ["Airstrike hits residential area in", "Targeted airstrike reported near", "Multiple airstrikes launched on", "Heavy bombardment strikes"],
  Explosion: ["Large explosion heard in", "Secondary explosion reported near", "Blast rocks central district of", "Explosion damages infrastructure in"],
  "Drone Strike": ["Drone strike confirmed over", "Armed drone targets position near", "Precision drone hit reported in", "Drone-launched munition strikes"],
  "Surveillance Drone": ["Surveillance drone spotted over", "Reconnaissance drone circling above", "Unidentified drone detected over", "High-altitude drone activity near"],
  Shelling: ["Artillery shelling targets outskirts of", "Mortar fire reported in", "Heavy shelling along border near", "Intermittent shelling resumes in"],
  Gunfire: ["Sustained gunfire reported in", "Exchange of fire near city center of", "Sniper activity reported in", "Gunshots heard across"],
  "Missile Launch": ["Missile launch detected from", "Surface-to-air missile fired near", "Ballistic trajectory observed over", "Missile interception attempt near"],
  Other: ["Unusual military activity near", "Unidentified object spotted over", "Sonic boom reported in", "Emergency sirens activated in"]
};
const sampleLocations = [
  "Beirut", "Dahiyeh", "Tyre", "Sidon", "Nabatieh",
  "Baalbek", "Tripoli", "Jounieh", "Bint Jbeil",
  "Khiam", "Marjayoun", "Hermel", "Zahle", "Chouf",
  "Byblos", "Aley", "Batroun"
];
const sampleAutoTypes = [
  "Airstrike", "Explosion", "Drone Strike", "Surveillance Drone",
  "Shelling", "Gunfire", "Missile Launch", "Other"
];
const sampleStatuses = ["Verified", "Unverified", "Unverified", "Verified"];
const sampleNotes = [
  "Residents urged to stay indoors. Emergency lines active.",
  "No confirmed casualties at this time. Situation developing.",
  "Witnesses report heavy smoke. First responders en route.",
  "Civil defense teams deployed. Roads blocked in the area.",
  "Unconfirmed reports of secondary impact nearby.",
  "Communication disruptions reported in the affected zone.",
  "Local authorities have issued an evacuation advisory.",
  "Multiple eyewitness videos circulating on social media."
];
const incidents = [
  {
    id: 1,
    title: "Airstrike reported in Dahiyeh",
    location: "Dahiyeh",
    type: "Airstrike",
    time: buildTime(0, 14, 35),
    status: "Verified",
    note: "Loud explosion heard near the southern highway. Multiple buildings affected.",
    confirms: 24,
    rejects: 3
  },
  {
    id: 2,
    title: "Drone activity over Tyre coastline",
    location: "Tyre",
    type: "Surveillance Drone",
    time: buildTime(0, 16, 10),
    status: "Unverified",
    note: "Residents report low-flying drone circling the old city area for over 30 minutes.",
    confirms: 8,
    rejects: 5
  },
  {
    id: 3,
    title: "Explosion near Sidon port",
    location: "Sidon",
    type: "Explosion",
    time: buildTime(0, 9, 22),
    status: "Verified",
    note: "Warehouse fire triggered a secondary explosion. Smoke visible from highway.",
    confirms: 31,
    rejects: 1
  },
  {
    id: 4,
    title: "Artillery shelling in Khiam",
    location: "Khiam",
    type: "Shelling",
    time: buildTime(0, 6, 45),
    status: "Verified",
    note: "Heavy shelling reported near the eastern perimeter. Ambulances dispatched.",
    confirms: 42,
    rejects: 2
  },
  {
    id: 5,
    title: "Reconnaissance drone over Baalbek",
    location: "Baalbek",
    type: "Drone Strike",
    time: buildTime(1, 11, 30),
    status: "Unverified",
    note: "High-altitude drone spotted near the Bekaa Valley. No strikes reported.",
    confirms: 6,
    rejects: 9
  },
  {
    id: 6,
    title: "Airstrike on Nabatieh market district",
    location: "Nabatieh",
    type: "Airstrike",
    time: buildTime(1, 18, 5),
    status: "Verified",
    note: "Direct hit on commercial zone. Emergency services on scene.",
    confirms: 56,
    rejects: 4
  },
  {
    id: 7,
    title: "Suspicious blast in Beirut suburbs",
    location: "Beirut",
    type: "Explosion",
    time: buildTime(1, 3, 15),
    status: "Rejected",
    note: "Initial reports of explosion later attributed to electrical transformer failure.",
    confirms: 3,
    rejects: 27
  },
  {
    id: 8,
    title: "Mortar shelling near Bint Jbeil",
    location: "Bint Jbeil",
    type: "Shelling",
    time: buildTime(1, 20, 50),
    status: "Verified",
    note: "Intermittent shelling heard along the southern border. Civilians evacuating.",
    confirms: 38,
    rejects: 2
  },
  {
    id: 9,
    title: "Missile launch detected near Hermel",
    location: "Hermel",
    type: "Missile Launch",
    time: buildTime(0, 12, 40),
    status: "Unverified",
    note: "Multiple witnesses report bright trail across the sky. No confirmation yet.",
    confirms: 11,
    rejects: 14
  },
  {
    id: 10,
    title: "Airstrike on Marjayoun outskirts",
    location: "Marjayoun",
    type: "Airstrike",
    time: buildTime(0, 7, 20),
    status: "Verified",
    note: "Pre-dawn strike targeted infrastructure near the eastern ridge.",
    confirms: 47,
    rejects: 5
  },
  {
    id: 11,
    title: "Gunfire exchange near Jounieh",
    location: "Jounieh",
    type: "Gunfire",
    time: buildTime(1, 13, 55),
    status: "Unverified",
    note: "Reports of sustained gunfire near the coastal highway. Cause unknown.",
    confirms: 9,
    rejects: 7
  },
  {
    id: 12,
    title: "Shelling damages bridge near Tripoli",
    location: "Tripoli",
    type: "Shelling",
    time: buildTime(1, 19, 30),
    status: "Verified",
    note: "Key supply bridge partially collapsed. Alternative routes being arranged.",
    confirms: 33,
    rejects: 3
  }
];
let nextId = incidents.length + 1;

// Generate a unique ID for new dynamically created incidents
function generateId() {
  return nextId++;
}