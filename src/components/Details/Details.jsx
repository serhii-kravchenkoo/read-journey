import { useState } from "react";

export default function Details({ book}) {

  const [activeTab, setActiveTab] = useState("diary");

  if (!book) return null;

  return (
    <div>

      {/* tabs */}
      <div>
        <button className={activeTab === "diary" ? "active" : ""} onClick={() => setActiveTab("diary")}> <DiaryIcon /> </button>;
        <button className={activeTab === "statistics" ? "active" : ""} onClick={() => setActiveTab("statistics")}> <StatisticsIcon /> </button>
        </div>

      {/* content */}
      {activeTab === "diary" && (
        <div>
          {/* тут diary */}
          {book.readingSessions?.map((item) => (
            <div key={item._id}>
              page: {item.page}
            </div>
          ))}
        </div>
      )}

      {activeTab === "statistics" && (
        <div>
          {/* тут statistics */}
          total sessions: {book.readingSessions?.length}
        </div>
      )}

    </div>
  );
}