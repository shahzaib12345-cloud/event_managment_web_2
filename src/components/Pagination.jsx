function Pagination({ page, onPageChange }) {
  if (!page || page.totalPages <= 1) return null;

  const current = page.number;
  // Ticketmaster does not allow very deep paging, so we limit it
  const total = Math.min(page.totalPages, 80);

  return (
    <div className="pagination">
      <button
        className="btn btn-outline"
        disabled={current === 0}
        onClick={() => onPageChange(current - 1)}
      >
        Previous
      </button>
      <span>
        Page {current + 1} of {total}
      </span>
      <button
        className="btn btn-outline"
        disabled={current + 1 >= total}
        onClick={() => onPageChange(current + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;