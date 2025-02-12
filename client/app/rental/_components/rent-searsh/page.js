export default function RentSearch() {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="搜尋關鍵字"
        aria-label="搜尋"
      />
      <button className="btn btn-primary" type="button">
        <i className="fa fa-search"></i>
      </button>
    </div>
  )
}
