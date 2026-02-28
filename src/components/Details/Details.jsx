import { useState } from 'react';
import RisingSpeedGraph from '../RisingSpeedGraph/RisingSpeedGraph';
import CircularProgress from '../CircularProgress/CircularProgress';
import { deleteReading } from '../../api/books';
import { toast } from 'react-toastify';
import styles from './Details.module.css';

export default function Details({ book, refreshBook }) {
  const [activeTab, setActiveTab] = useState('diary');

  if (!book) return null;

  const progress = book.progress || [];

 

  const finishedSessions = progress.filter(s => s.finishReading);

  const totalPagesRead = finishedSessions.reduce((acc, session) => {
    return acc + (session.finishPage - session.startPage + 1);
  }, 0);

  const totalPercent = book.totalPages
    ? Math.min(
        100,
        Number(((totalPagesRead / book.totalPages) * 100).toFixed(2))
      )
    : 0;

  const handleDeleteSession = async sessionId => {
    try {
      await deleteReading(book._id, sessionId);
      if (refreshBook) await refreshBook();
      toast.success('Сесію видалено');
    } catch {
      toast.error('Цю книгу вже прочитано, тому сесії видалити не можна.');
    }
  };

  

  return (
    <div className={styles.contentWrapper}>
     
      <div className={styles.titleBtnsWrapper}>
        <h2 className={styles.title}>
          {activeTab === 'diary' ? 'Diary' : 'Statistics'}
        </h2>

        <div className={styles.btnsList}>
          <button
            type="button"
            onClick={() => setActiveTab('diary')}
            className={`${styles.tabBtn} ${
              activeTab === 'diary' ? styles.active : ''
            }`}
          >
            <svg
              className={activeTab === 'diary' ? styles.active : ''}
              width="16"
              height="16"
            >
              <use href="/icons.svg#icon-hourglass" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('statistics')}
            className={`${styles.tabBtn} ${
              activeTab === 'statistics' ? styles.active : ''
            }`}
          >
            <svg
              className={activeTab === 'statistics' ? styles.active : ''}
              width="16"
              height="16"
            >
              <use href="/icons.svg#icon-icon-pie-chart" />
            </svg>
          </button>
        </div>
      </div>

     
      {activeTab === 'statistics' && (
        <p className={styles.desctopText}>
          Each page, each chapter is a new round of knowledge, a new step
          towards understanding. By rewriting statistics, we create our own
          reading history.
        </p>
      )}

      <div className={styles.infoWrapper}>
       
        {activeTab === 'diary' && (
          <div className={styles.diaryWrapper}>
            <ul className={styles.diaryList}>
              {finishedSessions.map(session => {
                const pagesRead = session.finishPage - session.startPage + 1;

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
                  <li className={styles.diaryItem} key={session._id}>
                    <div className={styles.datePages}>
                      <div className={styles.squareDate}>
                        <div className={styles.square}>
                          <span className={styles.squareInner}></span>
                        </div>
                        <p className={styles.date}>
                          {start.toLocaleDateString()}
                        </p>
                      </div>
                      <p className={styles.pages}>{pagesRead} pages</p>
                    </div>

                    <div className={styles.percentPerHour}>
                      <div>
                        <p className={styles.percent}>{percent}%</p>
                        <p className={styles.minutes}>{minutes} minutes</p>
                      </div>

                      <div className={styles.lineBtn}>
                        <div>
                          <div className={styles.line}>
                            <RisingSpeedGraph
                              speed={session.speed}
                              width={59}
                              height={25}
                            />
                          </div>
                          <p className={styles.perHour}>
                            {session.speed} pages per hour
                          </p>
                        </div>

                        <button
                          onClick={() => handleDeleteSession(session._id)}
                          className={styles.trashBtn}
                          type="button"
                        >
                          <svg width="14" height="14">
                            <use href="/icons.svg#icon-trash" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

    
        {activeTab === 'statistics' && (
          <div className={styles.statisticWrapper}>
            <div className={styles.circleWrapper}>
              <CircularProgress
                progress={totalPercent}
                size={138}
                strokeWidth={12}
              />
              <span className={styles.fullPercentage}>100%</span>
            </div>

            <div className={styles.percentageWrapper}>
              <span className={styles.marker}></span>
              <div>
                <p className={styles.percentage}>{totalPercent}%</p>
                <p className={styles.pagesReaded}>
                  {totalPagesRead} pages read
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
