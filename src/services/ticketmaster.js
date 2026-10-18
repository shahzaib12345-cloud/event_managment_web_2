const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = import.meta.env.VITE_TM_API_KEY;

// get a list of events (search + filters go in the filters object)
export async function fetchEventsFromApi(filters = {}) {
  // only show events from now onwards
  const now = new Date().toISOString().split('.')[0] + 'Z';

  const params = new URLSearchParams({
    apikey: API_KEY,
    size: '12',
    sort: 'date,asc',
    startDateTime: now,
  });

  // add the filters, but skip the empty ones
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== '' && value !== undefined && value !== null) {
      params.set(key, value);
    }
  });

  const response = await fetch(`${BASE_URL}/events.json?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Could not load events (error ${response.status})`);
  }

  const data = await response.json();

  return {
    events: data._embedded?.events || [],
    page: data.page,
  };
}

// get one event by its id
export async function fetchEventByIdFromApi(id) {
  const response = await fetch(`${BASE_URL}/events/${id}.json?apikey=${API_KEY}`);

  if (response.status === 404) {
    throw new Error('Event not found');
  }
  if (!response.ok) {
    throw new Error(`Could not load event (error ${response.status})`);
  }

  return response.json();
}