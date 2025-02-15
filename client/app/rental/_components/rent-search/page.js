// rent-search

'use client';

export default function RentSearch({ searchQuery, setSearchQuery, onSearch }) {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="搜尋關鍵字"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="搜尋"
      />
      <button className="btn btn-primary" type="button" onClick={onSearch}>
        <img src={`/images/icon/search.svg`} alt="搜尋" />
      </button>
    </div>
  );
}
