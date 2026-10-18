import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../features/events/eventsSlice';
import EventCard from '../components/EventCard';
import SearchFilters from '../components/SearchFilters';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const CATEGORIES = ['Music', 'Sports', 'Arts & Theatre', 'Film', 'Miscellaneous'];

const defaultFilters = {
  keyword: '',
  classificationName: '',
  countryCode: '',
  startDate: '',
  sort: 'date,asc',
  page: 0,
};

function Events() {
  const dispatch = useDispatch();
  const { items, page, loading, error } = useSelector((state) => state.events);
  const [filters, setFilters] = useState(defaultFilters);

  // fetch again whenever the filters change
  useEffect(() => {
    const params = {
      keyword: filters.keyword,
      classificationName: filters.classificationName,
      countryCode: filters.countryCode,
      sort: filters.sort,
      page: filters.page,
    };
    if (filters.startDate) {
      params.startDateTime = `${filters.startDate}T00:00:00Z`;
    }
    dispatch(fetchEvents(params));
  }, [filters, dispatch]);

  const handleApply = (newValues) => {
    setFilters((prev) => ({ ...prev, ...newValues, page: 0 }));
  };

  const handleCategory = (category) => {
    setFilters((prev) => ({ ...prev, classificationName: category, page: 0 }));
  };

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container page">
      <h1 className="page-title">Explore Events</h1>

      <div className="chips">
        <button
          className={filters.classificationName === '' ? 'chip active' : 'chip'}
          onClick={() => handleCategory('')}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={filters.classificationName === cat ? 'chip active' : 'chip'}
            onClick={() => handleCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <SearchFilters filters={filters} onApply={handleApply} onReset={handleReset} />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && items.length === 0 && (
        <p className="empty-text">No events found. Try a different search.</p>
      )}

      {!loading && (
        <div className="events-grid">
          {items.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {!loading && <Pagination page={page} onPageChange={handlePageChange} />}
    </div>
  );
}

export default Events;