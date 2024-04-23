import { useState, useEffect, useContext } from 'react';
import { generateWeekDates } from '../../helpers/sortWeekHelper';
import { AppContext } from '../../context/AppContext';
import PropTypes from 'prop-types';
import './trucks.scss';
import { AddTruck } from '../buttons/addTruck';

const Trucks = ({ category }) => {
  const {
    selectedWeek,
    trucks,
    handleInputChange,
    deleteTruck,
    handleToggleInputs,
  } = useContext(AppContext);

  const [weekDates, setWeekDates] = useState([]);

  generateWeekDates(selectedWeek);

  useEffect(() => {
    const dates = generateWeekDates(selectedWeek);
    setWeekDates(dates);
  }, [selectedWeek]);

  return (
    <>
      <div
        className={`tableContainer ${category === 'import' ? 'import-table' : 'export-table'}`}
      >
        <table className="truckTable">
          <thead>
            <tr>
              <th>
                <AddTruck category={category}></AddTruck>
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
              .filter((truck) => truck.category === category)
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
                          Pakeisti
                        </button>
                      </td>
                      <td>
                        <input
                          key={customId}
                          value={carrier}
                          disabled={inputsDisabled}
                          onChange={(e) =>
                            handleInputChange(e, customId, 'carrier')
                          }
                          className="change-input"
                          placeholder="Vežėjas"
                        />
                      </td>
                      <td>
                        <input
                          key={customId}
                          value={truckNumber}
                          disabled={inputsDisabled}
                          onChange={(e) =>
                            handleInputChange(e, customId, 'truckNumber')
                          }
                          className="change-input"
                          placeholder="A/M"
                        />
                      </td>
                      <td>
                        <input
                          key={customId}
                          value={price}
                          disabled={inputsDisabled}
                          onChange={(e) =>
                            handleInputChange(e, customId, 'price')
                          }
                          className="change-input"
                          placeholder="Kaina"
                        />
                      </td>
                      <td>
                        <input
                          key={customId}
                          value={monday}
                          onChange={(e) =>
                            handleInputChange(e, customId, 'monday')
                          }
                          className={`change-input ${monday ? 'with-input' : ''}`}
                        />
                      </td>
                      <td>
                        <input
                          key={customId}
                          value={tuesday}
                          onChange={(e) =>
                            handleInputChange(e, customId, 'tuesday')
                          }
                          className={`change-input ${tuesday ? 'with-input' : ''}`}
                        />
                      </td>
                      <td>
                        <input
                          key={customId}
                          value={wednesday}
                          onChange={(e) =>
                            handleInputChange(e, customId, 'wednesday')
                          }
                          className={`change-input ${wednesday ? 'with-input' : ''}`}
                        />
                      </td>
                      <td>
                        <input
                          key={customId}
                          value={thursday}
                          onChange={(e) =>
                            handleInputChange(e, customId, 'thursday')
                          }
                          className={`change-input ${thursday ? 'with-input' : ''}`}
                        />
                      </td>
                      <td>
                        <input
                          key={customId}
                          value={friday}
                          onChange={(e) =>
                            handleInputChange(e, customId, 'friday')
                          }
                          className={`change-input ${friday ? 'with-input' : ''}`}
                        />
                      </td>
                      <td>
                        <input
                          key={customId}
                          value={saturday}
                          onChange={(e) =>
                            handleInputChange(e, customId, 'saturday')
                          }
                          className={`change-input ${saturday ? 'with-input' : ''}`}
                        />
                      </td>
                      <td>
                        <input
                          key={customId}
                          value={sunday}
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
    </>
  );
};

Trucks.propTypes = {
  category: PropTypes.oneOf(['import', 'export']).isRequired,
};

export default Trucks;
