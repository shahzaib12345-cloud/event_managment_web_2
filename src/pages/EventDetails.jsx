import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById, clearSelectedEvent } from '../features/events/eventsSlice';
import {
  getEventImage,
  getVenue,
  getCategory,
  getGenre,
  formatDate,
  formatTime,
} from '../utils/eventHelpers';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedEvent: event, detailLoading, detailError } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEventById(id));
    return () => {
      dispatch(clearSelectedEvent());
    };
  }, [id, dispatch]);

  if (detailLoading) return <div className="container page"><Loader /></div>;

  if (detailError) {
    return (
      <div className="container page">
        <ErrorMessage message={detailError} />
        <Link to="/events" className="btn btn-outline">Back to events</Link>
      </div>
    );
  }

  if (!event) return null;

  const image = getEventImage(event);
  const venue = getVenue(event);
  const start = event.dates?.start;
  const status = event.dates?.status?.code;
  const price = event.priceRanges?.[0];
  const genre = getGenre(event);

  return (
    <div className="container page">
      <Link to="/events" className="back-link">← Back to events</Link>

      <div className="details">
        {image ? (
          <img src={image} alt={event.name} className="details-img" />
        ) : (
          <div className="details-img no-image">No image</div>
        )}

        <div className="details-info">
          <div className="badges">
            <span className="badge">{getCategory(event)}</span>
            {genre && genre !== 'Undefined' && <span className="badge">{genre}</span>}
          </div>

          <h1>{event.name}</h1>

          <ul className="details-list">
            <li><strong>Date:</strong> {formatDate(start?.localDate)}</li>
            {start?.localTime && <li><strong>Time:</strong> {formatTime(start.localTime)}</li>}
            <li><strong>Venue:</strong> {venue ? venue.name : 'To be announced'}</li>
            {venue && (
              <li>
                <strong>Location:</strong>{' '}
                {[venue.address?.line1, venue.city?.name, venue.state?.name, venue.country?.name]
                  .filter(Boolean)
                  .join(', ')}
              </li>
            )}
            {status && <li><strong>Status:</strong> {status}</li>}
            {price && (
              <li>
                <strong>Price:</strong> {price.min} - {price.max} {price.currency}
              </li>
            )}
          </ul>

          {event.info && <p className="details-text">{event.info}</p>}
          {event.pleaseNote && (
            <p className="details-text"><strong>Please note:</strong> {event.pleaseNote}</p>
          )}

          <div className="details-actions">
            {event.url && (
              <a href={event.url} target="_blank" rel="noreferrer" className="btn btn-outline">
                View on Ticketmaster
              </a>
            )}
          </div>
        </div>
      </div>

      {event.seatmap?.staticUrl && (
        <div className="seatmap">
          <h3>Seat Map</h3>
          <img src={event.seatmap.staticUrl} alt="Seat map" />
        </div>
      )}
    </div>
  );
}

export default EventDetails;