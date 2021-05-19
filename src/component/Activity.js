import React from "react";

function Activity({ date, time, detail, handleDeleteTimeline }) {
  const handleDelete = (inputDate, timer) =>
    handleDeleteTimeline(inputDate, timer);

  return (
    <div>
      <div className="info-timeline">
        <div className="text-timeline">
          <p className="text">{time} </p>
          <p className="text-detail">{detail}</p>
        </div>

        <button
          className="info-timeline btn-delete"
          onClick={() => handleDelete(date, time)}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default Activity;
