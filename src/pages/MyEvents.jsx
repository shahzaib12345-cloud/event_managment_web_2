import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelRegistration, clearMessage } from '../features/registrations/registrationsSlice';
import { formatDate, formatTime, isEventCompleted } from '../utils/eventHelpers';

function MyEvents() {
  const [tab, setTab] = useState('upcoming');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const allRegistrations = useSelector((state) => state.registrations.items);
  const message = useSelector((state) => state.registrations.message);

  useEffect(() => {
    dispatch(clearMessage());
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  // only this user's registrations
  const myRegistrations = allRegistrations.filter((r) => r.userId === user.id);

  const upcoming = myRegistrations
    .filter((r) => !isEventCompleted(r.date, r.time))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const completed = myRegistrations
    .filter((r) => isEventCompleted(r.date, r.time))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const list = tab === 'upcoming' ? upcoming : completed;

  const handleCancel = (eventId) => {
    if (window.confirm('Do you want to cancel this registration?')) {
      dispatch(cancelRegistration({ userId: user.id, eventId }));
    }
  };

  return (
    <div className="container page">
      <h1 className="page-title">My Events</h1>

      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div className="tabs">
        <button
          className={tab === 'upcoming' ? 'tab active' : 'tab'}
          onClick={() => setTab('upcoming')}
        >
          Upcoming ({upcoming.length})
        </button>
        <button
          className={tab === 'completed' ? 'tab active' : 'tab'}
          onClick={() => setTab('completed')}
        >
          Completed ({completed.length})
        </button>
      </div>

      {list.length === 0 && (
        <div className="empty-text">
          <p>
            {tab === 'upcoming'
              ? 'You have no upcoming registered events.'
              : 'You have no completed events yet.'}
          </p>
          {tab === 'upcoming' && (
            <Link to="/events" className="btn" style={{ marginTop: 15 }}>Browse Events</Link>
          )}
        </div>
      )}

      <div className="my-events-list">
        {list.map((reg) => (
          <div className="my-event" key={reg.eventId}>
            {reg.image ? (
              <img src={reg.image} alt={reg.name} className="my-event-img" />
            ) : (
              <div className="my-event-img no-image">No image</div>
            )}

            <div className="my-event-info">
              <span className="badge">{reg.category}</span>
              <h3>{reg.name}</h3>
              <p className="event-info">📅 {formatDate(reg.date)} {formatTime(reg.time)}</p>
              <p className="event-info">
                📍 {reg.venue || 'Venue to be announced'}{reg.city ? `, ${reg.city}` : ''}
              </p>
            </div>

            <div className="my-event-actions">
              <Link to={`/events/${reg.eventId}`} className="btn btn-outline">View</Link>
              {tab === 'upcoming' ? (
                <button className="btn btn-danger" onClick={() => handleCancel(reg.eventId)}>
                  Cancel
                </button>
              ) : (
                <span className="badge completed-badge">Completed</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyEvents;