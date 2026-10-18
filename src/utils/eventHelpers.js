// pick a good looking image from the images array
export function getEventImage(event) {
  const images = event.images || [];
  const wide = images.find((img) => img.ratio === '16_9' && img.width >= 640);
  const chosen = wide || images[0];
  return chosen ? chosen.url : null;
}

export function getVenue(event) {
  return event._embedded?.venues?.[0] || null;
}

export function getCategory(event) {
  return event.classifications?.[0]?.segment?.name || 'Event';
}

export function getGenre(event) {
  return event.classifications?.[0]?.genre?.name || '';
}

// date is like 2026-11-20
export function formatDate(localDate) {
  if (!localDate) return 'Date to be announced';
  const d = new Date(localDate + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// time is like 19:30:00
export function formatTime(localTime) {
  if (!localTime) return '';
  const [hours, minutes] = localTime.split(':');
  const d = new Date();
  d.setHours(Number(hours), Number(minutes));
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

// true if the event date and time has already passed
export function isEventCompleted(date, time) {
  if (!date) return false;
  const eventDate = new Date(`${date}T${time || '23:59:59'}`);
  return eventDate < new Date();
}