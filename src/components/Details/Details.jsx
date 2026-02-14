import { useState } from "react";
import RisingSpeedGraph from "../RisingSpeedGraph/RisingSpeedGraph";
import CircularProgress from "../CircularProgress/CircularProgress";
import { deleteReading } from "../../api/books";

export default function Details({ book, refreshBook }) {

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
  const handleDeleteSession = async (sessionId) => {
    try {
      await deleteReading(book._id, sessionId);
      // alert("Session deleted!");
      if (refreshBook) await refreshBook();  // підтягуємо свіжі дані з сервера
    } catch (err) {
      console.error(err);
      alert("Цю книгу вже прочитано, тому сесії видалити не можна.");
    }
  };
  
  
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
                  <button onClick={() => handleDeleteSession(session._id)}>
                    Delete
                  </button>
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