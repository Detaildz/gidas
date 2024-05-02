import { useState, useEffect, useContext } from 'react';
import { generateWeekDates } from '../../helpers/sortWeekHelper';
import { AppContext } from '../../context/AppContext';
import PropTypes from 'prop-types';
import './trucks.scss';
import { AddTruck } from '../buttons/addTruck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons';

const Trucks = ({ category }) => {
  const {
    selectedWeek,
    trucks,
    handleInputChange,
    deleteTruck,
    handleToggleInputs,
  } = useContext(AppContext);

  const [weekDates, setWeekDates] = useState([]);

  const { country } = useContext(AppContext);

  generateWeekDates(selectedWeek);

  useEffect(() => {
    const dates = generateWeekDates(selectedWeek);
    setWeekDates(dates);
    console.log(dates);
  }, [selectedWeek]);

  const handleTextareaInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    localStorage.setItem('textareaHeight', e.target.style.height);
  };

  return (
    <>
      <div
        className={`tableContainer ${category === 'import' ? 'import-table' : 'export-table'}`}
      >
        <div className="tableWrapper">
          <table className="truckTable">
            <thead>
              <tr>
                <th className="add-truck-block">
                  <AddTruck category={category} country={country}></AddTruck>
                </th>
                <th>Carrier</th>
                <th>Truck</th>
                <th>Price</th>
                {weekDates.map((date) => (
                  <th key={date}>{date}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trucks
                .filter(
                  (truck) =>
                    truck.category === category && truck.country === country
                )
                .map(
                  ({
                    customId,
                    carrier,
                    truckNumber,
                    price,
                    inputsDisabled,
                    monday,
                    tuesday,
                    wednesday,
                    thursday,
                    friday,
                    saturday,
                    sunday,
                  }) => {
                    return (
                      <tr key={customId}>
                        <td>
                          <button
                            onClick={() => handleToggleInputs(customId)}
                            className="change-button"
                          >
                            {inputsDisabled ? (
                              <FontAwesomeIcon icon={faToggleOff} />
                            ) : (
                              <FontAwesomeIcon icon={faToggleOn} />
                            )}
                          </button>
                        </td>
                        <td>
                          <textarea
                            key={customId}
                            value={carrier || ''}
                            disabled={inputsDisabled}
                            onFocus={(e) => {
                              // Apply the stored height when the textarea is focused
                              e.target.style.height =
                                localStorage.getItem('textareaHeight');
                            }}
                            onChange={(e) => {
                              handleTextareaInput(e); // Call function to adjust height
                              handleInputChange(e, customId, 'carrier'); // Handle input change
                            }}
                            className="change-input"
                            placeholder="Vežėjas"
                          />
                        </td>
                        <td>
                          <textarea
                            key={customId}
                            value={truckNumber || ''}
                            disabled={inputsDisabled}
                            onChange={(e) =>
                              handleInputChange(e, customId, 'truckNumber')
                            }
                            className="change-input"
                            placeholder="A/M"
                          />
                        </td>
                        <td>
                          <textarea
                            key={customId}
                            value={price || ''}
                            disabled={inputsDisabled}
                            onChange={(e) =>
                              handleInputChange(e, customId, 'price')
                            }
                            className="change-input"
                            placeholder="Kaina"
                          />
                        </td>
                        <td>
                          <textarea
                            key={customId}
                            value={monday || ''}
                            onChange={(e) =>
                              handleInputChange(e, customId, 'monday')
                            }
                            className={`change-input ${monday ? 'with-input' : ''}`}
                          />
                        </td>
                        <td>
                          <textarea
                            key={customId}
                            value={tuesday || ''}
                            onChange={(e) =>
                              handleInputChange(e, customId, 'tuesday')
                            }
                            className={`change-input ${tuesday ? 'with-input' : ''}`}
                          />
                        </td>
                        <td>
                          <textarea
                            key={customId}
                            value={wednesday || ''}
                            onChange={(e) =>
                              handleInputChange(e, customId, 'wednesday')
                            }
                            className={`change-input ${wednesday ? 'with-input' : ''}`}
                          />
                        </td>
                        <td>
                          <textarea
                            key={customId}
                            value={thursday || ''}
                            onChange={(e) =>
                              handleInputChange(e, customId, 'thursday')
                            }
                            className={`change-input ${thursday ? 'with-input' : ''}`}
                          />
                        </td>
                        <td>
                          <textarea
                            key={customId}
                            value={friday || ''}
                            onChange={(e) =>
                              handleInputChange(e, customId, 'friday')
                            }
                            className={`change-input ${friday ? 'with-input' : ''}`}
                          />
                        </td>
                        <td>
                          <textarea
                            key={customId}
                            value={saturday || ''}
                            onChange={(e) =>
                              handleInputChange(e, customId, 'saturday')
                            }
                            className={`change-input ${saturday ? 'with-input' : ''}`}
                          />
                        </td>
                        <td>
                          <textarea
                            key={customId}
                            value={sunday || ''}
                            onChange={(e) =>
                              handleInputChange(e, customId, 'sunday')
                            }
                            className={`change-input ${sunday ? 'with-input' : ''}`}
                          />
                        </td>
                        <td>
                          <button
                            onClick={() => deleteTruck(customId)}
                            className="delete-button"
                          >
                            x
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

Trucks.propTypes = {
  category: PropTypes.oneOf(['import', 'export']).isRequired,
  country: PropTypes.string.isRequired,
};

export default Trucks;
