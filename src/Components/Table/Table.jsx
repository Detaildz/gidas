import { useState, useEffect } from 'react';
import { generateWeekDates, getWeekNumber } from '../../helpers/sortWeekHelper';
import { v4 as uuidv4 } from 'uuid';
import './table.scss';
// TODO Add error handling
// TODO save selected week to local storage to keep it on refresh
// TODO Every week should have seperate information

const Table = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [weekDates, setWeekDates] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const thisWeek = getWeekNumber(new Date());
  const [weekNumber, setWeekNumber] = useState(thisWeek);

  useEffect(() => {
    const dates = generateWeekDates(weekOffset + 1); // Adjusted week number
    setWeekDates(dates);
  }, [weekOffset]);

  const goToPreviousWeek = () => {
    setWeekNumber(weekNumber - 1);
    setWeekOffset((prevOffset) => prevOffset - 1);
  };

  const goToNextWeek = () => {
    setWeekNumber(weekNumber + 1);
    setWeekOffset((prevOffset) => prevOffset + 1);
  };

  const saveChanges = (updatedTruck) => {
    const storedTrucks = JSON.parse(localStorage.getItem('trucks')) || [];

    const index = storedTrucks.findIndex(
      (truck) => truck.id === updatedTruck.id
    );
    if (index !== -1) {
      storedTrucks[index] = updatedTruck;
    } else {
      storedTrucks.push(updatedTruck);
    }

    localStorage.setItem('trucks', JSON.stringify(storedTrucks));
  };

  const handleInputChange = (e, id, column) => {
    const updatedTrucks = trucks.map((truck) => {
      if (truck.id === id) {
        const updatedTruck = { ...truck, [column]: e.target.value };
        saveChanges(updatedTruck);
        return updatedTruck;
      }
      return truck;
    });
    setTrucks(updatedTrucks);
  };

  const deleteTruck = (id) => {
    if (window.confirm('Ar tikrai norite ištrinti vežėją?')) {
      const updatedTrucks = trucks.filter((truck) => truck.id !== id);
      localStorage.setItem('trucks', JSON.stringify(updatedTrucks));
      setTrucks(updatedTrucks);
    }
  };

  const handleToggleInputs = (id) => {
    const updatedTrucks = trucks.map((truck) => {
      if (truck.id === id) {
        const newInputsDisabled = !truck.inputsDisabled;
        return { ...truck, inputsDisabled: newInputsDisabled };
      }
      return truck;
    });
    setTrucks(updatedTrucks);
  };

  const addTruckToWeek = (weekIndex, newTruck) => {
    setWeeks((prevWeeks) => {
      const updatedWeeks = [...prevWeeks];
      updatedWeeks[weekIndex] = {
        ...updatedWeeks[weekIndex],
        trucks: [...(updatedWeeks[weekIndex]?.trucks || []), newTruck],
      };
      return updatedWeeks;
    });
  };

  const handleAddTruck = () => {
    const newId = uuidv4(); // Generate a random UUID;
    const newTruck = {
      id: newId,
      carrier: 'Naujas vežėjas',
      truckNumber: '',
      price: '',
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
      inputsDisabled: true,
    };

    const currentWeekIndex = weekOffset;
    addTruckToWeek(currentWeekIndex, newTruck);
  };

  return (
    <>
      <div className="tableContainer">
        <div className="active-buttons">
          <button onClick={handleAddTruck}>Add Truck</button>
          <div className="week-buttons">
            <button onClick={goToNextWeek}>Next Week</button>
            {weekOffset === thisWeek - 1 ? (
              `Dabar W${weekOffset + 1}`
            ) : (
              <h1>W{weekOffset + 1}</h1>
            )}
            <button onClick={goToPreviousWeek}>Previous Week</button>
          </div>
        </div>

        <table className="truckTable">
          <thead>
            <tr>
              <th></th>
              <th>Carrier</th>
              <th>Truck</th>
              <th>Price</th>
              {weekDates.map((date) => (
                <th key={date}>{date}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks[weekOffset]?.trucks.map(
              ({
                id,
                carrier,
                inputsDisabled,
                truckNumber,
                price,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday,
              }) => (
                <tr key={id}>
                  <td>
                    <button
                      onClick={() => handleToggleInputs(id)}
                      className="change-button"
                    >
                      Pakeisti
                    </button>
                  </td>
                  <td>
                    <input
                      key={id}
                      value={carrier}
                      disabled={inputsDisabled}
                      onChange={(e) => handleInputChange(e, id, 'carrier')}
                      className="change-input"
                    />
                  </td>
                  <td>
                    <input
                      key={id}
                      value={truckNumber}
                      disabled={inputsDisabled}
                      onChange={(e) => handleInputChange(e, id, 'truckNumber')}
                      className="change-input"
                    />
                  </td>
                  <td>
                    <input
                      key={id}
                      value={price}
                      disabled={inputsDisabled}
                      onChange={(e) => handleInputChange(e, id, 'price')}
                      className="change-input"
                    />
                  </td>
                  <td>
                    <input
                      key={id}
                      value={monday}
                      onChange={(e) => handleInputChange(e, id, 'monday')}
                    />
                  </td>
                  <td>
                    <input
                      key={id}
                      value={tuesday}
                      onChange={(e) => handleInputChange(e, id, 'tuesday')}
                    />
                  </td>
                  <td>
                    <input
                      key={id}
                      value={wednesday}
                      onChange={(e) => handleInputChange(e, id, 'wednesday')}
                    />
                  </td>
                  <td>
                    <input
                      key={id}
                      value={thursday}
                      onChange={(e) => handleInputChange(e, id, 'thursday')}
                    />
                  </td>
                  <td>
                    <input
                      key={id}
                      value={friday}
                      onChange={(e) => handleInputChange(e, id, 'friday')}
                    />
                  </td>
                  <td>
                    <input
                      key={id}
                      value={saturday}
                      onChange={(e) => handleInputChange(e, id, 'saturday')}
                    />
                  </td>
                  <td>
                    <input
                      key={id}
                      value={sunday}
                      onChange={(e) => handleInputChange(e, id, 'sunday')}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => deleteTruck(id)}
                      className="delete-button"
                    >
                      x
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
