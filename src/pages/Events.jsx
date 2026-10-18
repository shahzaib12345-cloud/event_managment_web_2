import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../features/events/eventsSlice';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

function Events() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents({}));
  }, [dispatch]);

  return (
    <div className="container page">
      <h1 className="page-title">Upcoming Events</h1>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && items.length === 0 && (
        <p className="empty-text">No events found.</p>
      )}

      {!loading && (
        <div className="events-grid">
          {items.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;