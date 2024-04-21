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
  } = useContext(AppContext);
  return (
    <div>
      <div className="active-buttons">
        <div className="week-buttons">
          <button onClick={goToNextWeek} className="week-button">
            <FontAwesomeIcon icon={faCaretLeft} />
            Next Week {selectedWeek + 1}
          </button>
          <span className="selected-week">WEEK{selectedWeek}</span>
          <button onClick={goToPreviousWeek} className="week-button">
            Previous Week {selectedWeek - 1}
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
          <select
            className="week-select"
            value={selectedWeek}
            onChange={handleWeekChange}
          >
            {weekOptions}
          </select>
        </div>
      </div>
      <div className="truck-direction"></div>
    </div>
  );
};
