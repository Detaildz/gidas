import { useState, useEffect } from 'react';
import { generateWeekDates } from '../../helpers/sortWeekHelper';

import './table.scss';

const Table = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [weekDates, setWeekDates] = useState([]);
  // State to hold truck data
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    // Load trucks data from local storage
    const savedTrucks = JSON.parse(localStorage.getItem('trucks')) || [];
    setTrucks(savedTrucks);
  }, []);
  //Let change Truck carrier and price

  generateWeekDates(weekOffset);

  useEffect(() => {
    const dates = generateWeekDates(weekOffset);
    setWeekDates(dates);
  }, [weekOffset]);

  const goToPreviousWeek = () => {
    setWeekOffset((prevOffset) => prevOffset - 1);
  };

  const goToNextWeek = () => {
    setWeekOffset((prevOffset) => prevOffset + 1);
  };
  const saveChanges = (updatedTruck) => {
    // Get existing trucks data from local storage or initialize if not exists
    const storedTrucks = JSON.parse(localStorage.getItem('trucks')) || [];

    // Find the index of the updated truck in the stored trucks array
    const index = storedTrucks.findIndex(
      (truck) => truck.id === updatedTruck.id
    );

    // If the truck exists in the stored data, update it; otherwise, add it
    if (index !== -1) {
      storedTrucks[index] = updatedTruck;
    } else {
      storedTrucks.push(updatedTruck);
    }

    // Save the updated trucks array back to local storage
    localStorage.setItem('trucks', JSON.stringify(storedTrucks));
  };

  // Function to handle input change
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

  const handleAddTruck = () => {
    const newId = trucks.length + 1;
    setTrucks([
      ...trucks,
      {
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
      },
    ]);
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
        // Toggle inputsDisabled state
        const newInputsDisabled = !truck.inputsDisabled;
        // If inputs are being disabled, save the changes
        // if (!newInputsDisabled) {
        //   saveChanges(truck); // Function to save changes, you can define it separately
        // }
        return { ...truck, inputsDisabled: newInputsDisabled };
      }
      return truck;
    });
    setTrucks(updatedTrucks);
  };

  return (
    <>
      <div className="tableContainer">
        <div className="active-buttons">
          <button onClick={handleAddTruck}>Add Truck</button>
          <div>
            <button onClick={goToPreviousWeek}>Previous Week</button>
            <button onClick={goToNextWeek}>Next Week</button>
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
            {trucks.map((truck) => (
              <tr key={truck.id}>
                <td>
                  <button
                    onClick={() => handleToggleInputs(truck.id)}
                    className="change-button"
                  >
                    Pakeisti
                  </button>
                </td>
                <td>
                  <input
                    key={truck.id}
                    value={truck.carrier}
                    disabled={truck.inputsDisabled}
                    onChange={(e) => handleInputChange(e, truck.id, 'carrier')}
                    className="change-input"
                  />
                </td>
                <td>
                  <input
                    key={truck.id}
                    value={truck.truckNumber}
                    disabled={truck.inputsDisabled}
                    onChange={(e) =>
                      handleInputChange(e, truck.id, 'truckNumber')
                    }
                    className="change-input"
                  />
                </td>
                <td>
                  <input
                    key={truck.id}
                    value={truck.price}
                    disabled={truck.inputsDisabled}
                    onChange={(e) => handleInputChange(e, truck.id, 'price')}
                    className="change-input"
                  />
                </td>
                <td>
                  <input
                    key={truck.id}
                    value={truck.monday}
                    onChange={(e) => handleInputChange(e, truck.id, 'monday')}
                  />
                </td>
                <td>
                  <input
                    key={truck.id}
                    value={truck.tuesday}
                    onChange={(e) => handleInputChange(e, truck.id, 'tuesday')}
                  />
                </td>
                <td>
                  <input
                    key={truck.id}
                    value={truck.wednesday}
                    onChange={(e) =>
                      handleInputChange(e, truck.id, 'wednesday')
                    }
                  />
                </td>
                <td>
                  <input
                    key={truck.id}
                    value={truck.thursday}
                    onChange={(e) => handleInputChange(e, truck.id, 'thursday')}
                  />
                </td>
                <td>
                  <input
                    key={truck.id}
                    value={truck.friday}
                    onChange={(e) => handleInputChange(e, truck.id, 'friday')}
                  />
                </td>
                <td>
                  <input
                    key={truck.id}
                    value={truck.saturday}
                    onChange={(e) => handleInputChange(e, truck.id, 'saturday')}
                  />
                </td>
                <td>
                  <input
                    key={truck.id}
                    value={truck.sunday}
                    onChange={(e) => handleInputChange(e, truck.id, 'sunday')}
                  />
                </td>
                <tr>
                  <button
                    onClick={() => deleteTruck(truck.id)}
                    className="delete-button"
                  >
                    x
                  </button>
                </tr>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
