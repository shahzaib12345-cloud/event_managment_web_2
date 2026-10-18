import { useState } from 'react';

const COUNTRIES = [
  { code: '', name: 'All countries' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'MX', name: 'Mexico' },
];

function SearchFilters({ filters, onApply, onReset }) {
  const [keyword, setKeyword] = useState(filters.keyword);
  const [countryCode, setCountryCode] = useState(filters.countryCode);
  const [startDate, setStartDate] = useState(filters.startDate);
  const [sort, setSort] = useState(filters.sort);

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply({ keyword: keyword.trim(), countryCode, startDate, sort });
  };

  const handleReset = () => {
    setKeyword('');
    setCountryCode('');
    setStartDate('');
    setSort('date,asc');
    onReset();
  };

  return (
    <form className="filters" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Search</label>
        <input
          type="text"
          placeholder="Artist, team or event name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Country</label>
        <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>From date</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Sort by</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="date,asc">Date (soonest first)</option>
          <option value="name,asc">Name (A-Z)</option>
          <option value="relevance,desc">Relevance</option>
        </select>
      </div>

      <div className="filter-buttons">
        <button type="submit" className="btn">Search</button>
        <button type="button" className="btn btn-outline" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
}

export default SearchFilters;