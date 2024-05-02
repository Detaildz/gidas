import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

export const ChangeWeek = () => {
  const {
    handleWeekChange,
    selectedWeek,
    weekOptions,
    goToNextWeek,
    goToPreviousWeek,
    addTrucksFromLastWeek,
    trucks,
    thisWeek,
  } = useContext(AppContext);

  const showAddTrucksButton =
    trucks.length === 0 && selectedWeek === thisWeek + 1;

  return (
    <div>
      <div className="active-buttons">
        <div className="week-buttons">
          <button onClick={goToPreviousWeek} className="week-button">
            <FontAwesomeIcon icon={faCaretLeft} /> Previous Week{' '}
            {selectedWeek - 1}
          </button>
          <span className="selected-week">WEEK{selectedWeek}</span>
          <button onClick={goToNextWeek} className="week-button">
            Next Week {selectedWeek + 1}
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
          <select
            className="week-select"
            value={selectedWeek}
            onChange={handleWeekChange}
          >
            {weekOptions}
          </select>

          {showAddTrucksButton && (
            <button onClick={() => addTrucksFromLastWeek()}>
              Add trucks from last week
            </button>
          )}
        </div>
      </div>
      <div className="truck-direction"></div>
    </div>
  );
};
