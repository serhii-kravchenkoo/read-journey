import { useState } from "react";
import RisingSpeedGraph from "../RisingSpeedGraph/RisingSpeedGraph";
import CircularProgress from "../CircularProgress/CircularProgress";

export default function Details({ book }) {

  const [activeTab, setActiveTab] = useState("diary");

  if (!book) return null;

  const progress = book.progress || [];

  /* =========================
     CALCULATIONS
  ========================= */

  // загальна кількість прочитаних сторінок
  const totalPagesRead = progress.reduce((acc, session) => {
    if (!session.finishPage) return acc;
    return acc + (session.finishPage - session.startPage + 1);
  }, 0);

  // загальний % прочитаної книги
  const totalPercent = book.totalPages
    ? Math.min(
        100,
        Number(((totalPagesRead / book.totalPages) * 100).toFixed(2))
      )
    : 0;

  /* =========================
     RENDER
  ========================= */

  return (
    <div>

      {/* TABS */}
      <div>
        <button
          className={activeTab === "diary" ? "active" : ""}
          onClick={() => setActiveTab("diary")}
        >
          Diary
        </button>

        <button
          className={activeTab === "statistics" ? "active" : ""}
          onClick={() => setActiveTab("statistics")}
        >
          Statistics
        </button>
      </div>

      {/* =========================
         DIARY TAB
      ========================= */}
      {activeTab === "diary" && (
        <div>

          {progress.map((session, index) => {

            // якщо сесія ще не завершена — пропускаємо (бо немає finishReading)
            if (!session.finishReading) return null;

            const pagesRead =
              session.finishPage - session.startPage + 1;

            const percent = book.totalPages
              ? ((pagesRead / book.totalPages) * 100).toFixed(2)
              : 0;

            const start = new Date(session.startReading);
            const finish = new Date(session.finishReading);

            const minutes = Math.max(
              1,
              Math.round((finish - start) / 60000)
            );

            return (
              <div key={index}>

                <div>
                  {start.toLocaleDateString()}
                </div>

                <div>
                  {percent}%
                </div>

                <div>
                  {minutes} minutes
                </div>

                <div>
                  {pagesRead} pages
                </div>

                <div>
                  <RisingSpeedGraph
                    speed={session.speed}
                    maxSpeed={100}
                  />
                  <div>
                    {session.speed} pages per hour
                  </div>
                </div>

              </div>
            );
          })}

        </div>
      )}

      {/* =========================
         STATISTICS TAB
      ========================= */}
      {activeTab === "statistics" && (
        <div>

          <CircularProgress
            progress={totalPercent}
          />

          <div>
            {totalPercent}%
          </div>

          <div>
            {totalPagesRead} pages read
          </div>

        </div>
      )}

    </div>
  );
}