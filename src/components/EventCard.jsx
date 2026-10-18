import { Link } from 'react-router-dom';
import { getEventImage, getVenue, getCategory, formatDate, formatTime } from '../utils/eventHelpers';

function EventCard({ event }) {
  const image = getEventImage(event);
  const venue = getVenue(event);
  const start = event.dates?.start;

  return (
    <div className="event-card">
      {image ? (
        <img src={image} alt={event.name} className="event-img" />
      ) : (
        <div className="event-img no-image">No image</div>
      )}

      <div className="event-body">
        <span className="badge">{getCategory(event)}</span>
        <h3 className="event-name">{event.name}</h3>
        <p className="event-info">
          📅 {formatDate(start?.localDate)} {formatTime(start?.localTime)}
        </p>
        <p className="event-info">
          📍 {venue ? `${venue.name}${venue.city ? ', ' + venue.city.name : ''}` : 'Venue to be announced'}
        </p>
        <Link to={`/events/${event.id}`} className="btn full-width card-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EventCard;