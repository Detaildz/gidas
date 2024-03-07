import { useState, useEffect } from 'react';

import './table.css';

const Table = () => {
  // State to hold truck data
  const [trucks, setTrucks] = useState([
    {
      id: 1,
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
    },
    // Add more truck objects as needed
  ]);
  //Let change Truck carrier and price
  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    // Generate dates for each day of the current week
    const today = new Date();
    const weekStart = new Date(today);
    const mondayOffset = (today.getDay() + 6) % 7; // Calculate the number of days to subtract to get to Monday

    weekStart.setDate(today.getDate() - mondayOffset);
    const dates = [...Array(7)].map((_, index) => {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + index);

      return day
        .toLocaleDateString('en-LT', {
          weekday: 'long',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\//g, '.');
    });

    setWeekDates(dates);
  }, []);

  // Function to handle input change
  const handleInputChange = (e, id, column) => {
    const updatedTrucks = trucks.map((truck) => {
      if (truck.id === id) {
        return { ...truck, [column]: e.target.value };
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
      },
    ]);
  };

  const handleToggleInputs = () => {
    setInputsDisabled(!inputsDisabled);
  };

  return (
    <>
      <div className="tableContainer">
        <div className="active-buttons">
          <button onClick={handleAddTruck}>Add Truck</button>
          <button onClick={handleToggleInputs}>Pakeisti</button>
        </div>

        <table className="truckTable">
          <thead>
            <tr>
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
                  <input
                    key={truck.id}
                    value={truck.carrier}
                    disabled={inputsDisabled}
                    onChange={(e) => handleInputChange(e, truck.id, 'carrier')}
                  />
                </td>
                <td>
                  <input
                    value={truck.truckNumber}
                    disabled={inputsDisabled}
                    onChange={(e) =>
                      handleInputChange(e, truck.id, 'truckNumber')
                    }
                  />
                </td>
                <td>
                  <input
                    value={truck.price}
                    disabled={inputsDisabled}
                    onChange={(e) => handleInputChange(e, truck.id, 'price')}
                  />
                </td>
                <td>
                  <input
                    value={truck.monday}
                    onChange={(e) => handleInputChange(e, truck.id, 'monday')}
                  />
                </td>
                <td>
                  <input
                    value={truck.tuesday}
                    onChange={(e) => handleInputChange(e, truck.id, 'tuesday')}
                  />
                </td>
                <td>
                  <input
                    value={truck.wednesday}
                    onChange={(e) =>
                      handleInputChange(e, truck.id, 'wednesday')
                    }
                  />
                </td>
                <td>
                  <input
                    value={truck.thursday}
                    onChange={(e) => handleInputChange(e, truck.id, 'thursday')}
                  />
                </td>
                <td>
                  <input
                    value={truck.friday}
                    onChange={(e) => handleInputChange(e, truck.id, 'friday')}
                  />
                </td>
                <td>
                  <input
                    value={truck.saturday}
                    onChange={(e) => handleInputChange(e, truck.id, 'saturday')}
                  />
                </td>
                <td>
                  <input
                    value={truck.sunday}
                    onChange={(e) => handleInputChange(e, truck.id, 'sunday')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
