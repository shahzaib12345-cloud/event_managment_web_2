import { useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById, clearSelectedEvent } from '../features/events/eventsSlice';
import {
  registerForEvent,
  cancelRegistration,
  clearMessage,
} from '../features/registrations/registrationsSlice';
import {
  getEventImage,
  getVenue,
  getCategory,
  getGenre,
  formatDate,
  formatTime,
  isEventCompleted,
} from '../utils/eventHelpers';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedEvent: event, detailLoading, detailError } = useSelector((state) => state.events);
  const user = useSelector((state) => state.auth.user);
  const message = useSelector((state) => state.registrations.message);
  const isRegistered = useSelector((state) =>
    state.registrations.items.some((r) => r.eventId === id && r.userId === user?.id)
  );

  useEffect(() => {
    dispatch(clearMessage());
    dispatch(fetchEventById(id));
    return () => {
      dispatch(clearSelectedEvent());
      dispatch(clearMessage());
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
  const isCancelled = status === 'cancelled';
  const hasEnded = isEventCompleted(start?.localDate, start?.localTime);

  const handleRegister = () => {
    // not logged in -> go to login and come back here after
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    dispatch(
      registerForEvent({
        userId: user.id,
        eventId: event.id,
        name: event.name,
        date: start?.localDate || '',
        time: start?.localTime || '',
        venue: venue ? venue.name : '',
        city: venue?.city?.name || '',
        image: image,
        category: getCategory(event),
        registeredAt: new Date().toISOString(),
      })
    );
  };

  const handleCancel = () => {
    if (window.confirm('Do you want to cancel your registration for this event?')) {
      dispatch(cancelRegistration({ userId: user.id, eventId: event.id }));
    }
  };

  return (
    <div className="container page">
      <Link to="/events" className="back-link">← Back to events</Link>

      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

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
            {isRegistered && <span className="badge badge-success">Registered</span>}
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
            {isRegistered ? (
              <button className="btn btn-danger" onClick={handleCancel}>
                Cancel Registration
              </button>
            ) : (
              <button
                className="btn"
                onClick={handleRegister}
                disabled={isCancelled || hasEnded}
              >
                {isCancelled
                  ? 'Event Cancelled'
                  : hasEnded
                  ? 'Event Ended'
                  : user
                  ? 'Register for Event'
                  : 'Login to Register'}
              </button>
            )}

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