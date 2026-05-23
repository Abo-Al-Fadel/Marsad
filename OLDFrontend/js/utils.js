// Helper to construct a timestamp string from days/hours/minutes ago
function buildTime(daysAgo, hours, minutes) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hours, minutes, 0, 0);
  return d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0') + 'T' +
    String(d.getHours()).padStart(2, '0') + ':' +
    String(d.getMinutes()).padStart(2, '0');
}

// Format a raw ISO date into something pretty (e.g., "Oct 15, 2023 — 14:30")
function formatTimestamp(isoString) {
  const date = new Date(isoString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month} ${day}, ${year} — ${hours}:${minutes}`;
}

// Get a friendly relative time (like "Just now" or "2h ago")
function relativeTime(isoString) {
  const now = new Date();
  const date = new Date(isoString);
  const diffSec = Math.floor((now - date) / 1000);
  if (diffSec < 60) return 'Just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} min ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 172800) return 'Yesterday';
  return `${Math.floor(diffSec / 86400)}d ago`;
}

// Determine if a date is "Today", "Yesterday", or just needs a full date label
function getRelativeDateLabel(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffMs = today - target;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Check if the given date happened today or yesterday
function isTodayOrYesterday(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffMs = today - target;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays === 0 || diffDays === 1;
}

// Pull just the YYYY-MM-DD portion from an ISO string
function extractDateKey(isoString) {
  return isoString.split('T')[0];
}

// Pull just the HH:MM portion from an ISO string
function extractTime(isoString) {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Convert an incident type string into a usable CSS class slug
function typeClass(type) {
  const slug = type.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const knownClasses = ['airstrike', 'explosion', 'drone', 'drone-strike', 'surveillance-drone',
    'shelling', 'gunfire', 'missile-launch', 'raid', 'fire', 'bombing'];
  if (knownClasses.includes(slug)) return slug;
  if (slug.includes('drone')) return 'drone';
  if (slug.includes('strike') || slug.includes('airstrike')) return 'airstrike';
  if (slug.includes('shell') || slug.includes('mortar') || slug.includes('artillery')) return 'shelling';
  if (slug.includes('explo') || slug.includes('bomb') || slug.includes('blast')) return 'explosion';
  if (slug.includes('gun') || slug.includes('sniper') || slug.includes('fire')) return 'gunfire';
  if (slug.includes('missile') || slug.includes('rocket')) return 'missile';
  return 'other';
}

// Normalize a status string to be used as a CSS class
function statusClass(status) {
  return status.toLowerCase();
}

// Lookup the matching SVG icon for a given incident type
function getTypeIcon(type) {
  return incidentTypeIcons[type] || incidentTypeIcons['Other'];
}