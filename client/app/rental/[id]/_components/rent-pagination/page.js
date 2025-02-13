'use client';

export default function RentPagination({ onPrev, onNext }) {
  return (
    <div className="d-flex gap-2">
      <button className="btn btn-primary btn-sm btn-sm-radius2" onClick={onPrev}>
        <span aria-hidden="true">
          <i className="fa-solid fa-fw fa-caret-left" style={{ paddingTop: "6px" }}></i>
        </span>
        <span className="visually-hidden">往前一個 Previous</span>
      </button>
      <button className="btn btn-primary btn-sm btn-sm-radius2" onClick={onNext}>
        <span aria-hidden="true">
          <i className="fa-solid fa-fw fa-caret-right" style={{ paddingTop: "6px" }}></i>
        </span>
        <span className="visually-hidden">往後一個 Next</span>
      </button>
    </div>
  );
}
