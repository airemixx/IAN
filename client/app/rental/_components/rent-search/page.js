// rent-search

export default function RentSearch() {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="搜尋關鍵字"
        aria-label="搜尋"
      />
      <button className="btn btn-primary" type="button" style={{ width: '20px%' }}>
        <img
          src={`/images/icon/search.svg`}
          className=""
        />
        {/* <i className="fa fa-search"></i> */}
      </button>
    </div>
  )
}
