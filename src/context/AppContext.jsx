import { createContext, useCallback, useState, useMemo } from 'react';
import { getWeekNumber } from '../helpers/sortWeekHelper';
import PropTypes from 'prop-types';
import { cfg } from '../cfg/cfg.js';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [trucks, setTrucks] = useState([]);
  const thisWeek = getWeekNumber(new Date());
  const [selectedWeek, setSelectedWeek] = useState(thisWeek);
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [category, setCategory] = useState('export');

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`https://gidas-api.vercel.app/trucks/`);
      if (!response.ok) {
        throw new Error('Failed to fetch trucks');
      }
      const data = await response.json();
      const dataByWeek = data.filter((truck) => truck.week === selectedWeek);
      setTrucks(dataByWeek);
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }, [selectedWeek]);

  const handleWeekChange = async (e) => {
    const selectedWeek = parseInt(e.target.value);

    setSelectedWeek(selectedWeek);
    await fetchData();
  };

  const weekOptions = useMemo(
    () =>
      Array.from({ length: 52 }, (_, index) => {
        const week = index + 1;
        return (
          <option key={week} value={week}>
            Week {week}
          </option>
        );
      }),
    []
  );

  const saveChanges = async (updatedTruck) => {
    try {
      const response = await fetch(
        `http://localhost:3000/trucks/${updatedTruck.customId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTruck),
        }
      );
      console.log('updatedTruck', updatedTruck);
      if (!response.ok) {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInputChange = (e, customId, column) => {
    const updatedTrucks = trucks.map((truck) => {
      if (truck.customId === customId) {
        const updatedTruck = { ...truck, [column]: e.target.value };
        saveChanges(updatedTruck);
        return updatedTruck;
      }
      return truck;
    });
    setTrucks(updatedTrucks);
  };

  const deleteTruck = async (customId) => {
    if (window.confirm('Ar tikrai norite ištrinti vežėją?')) {
      try {
        const response = await fetch(
          `http://localhost:3000/trucks/${customId}`,
          {
            method: 'DELETE',
          }
        );
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const updatedTrucks = trucks.filter(
          (truck) => truck.customId !== customId
        );
        setTrucks(updatedTrucks);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleAddTruck = async (category) => {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomNumber = Math.floor(Math.random() * 1000); // Generates a random number between 0 and 999
    const customId = selectedWeek + `${timestamp}${randomNumber}`;
    const newTruck = {
      customId: customId,
      week: selectedWeek,
      category: category,
      carrier: '',
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

    console.log(category);
    try {
      const response = await fetch(`${cfg.API.HOST}/trucks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newTruck }), // Create a shallow copy of newTruck
      });

      if (!response.ok) {
        throw new Error('Failed to add truck');
      }
      const data = await response.json();
      setTrucks((prevTrucks) => [...prevTrucks, data]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleToggleInputs = (customId) => {
    const updatedTrucks = trucks.map((truck) => {
      if (truck.customId === customId) {
        const newInputsDisabled = !truck.inputsDisabled;
        return { ...truck, inputsDisabled: newInputsDisabled };
      }
      return truck;
    });
    setTrucks(updatedTrucks);
  };

  const goToPreviousWeek = async () => {
    await fetchData();
    setSelectedWeek((prevOffset) => prevOffset - 1);
  };

  const goToNextWeek = async () => {
    await fetchData();
    setSelectedWeek((prevOffset) => prevOffset + 1);
  };

  return (
    <AppContext.Provider
      value={{
        setSelectedWeek,
        selectedWeek,
        trucks,
        handleAddTruck,
        fetchData,
        handleWeekChange,
        weekOptions,
        deleteTruck,
        inputsDisabled,
        setInputsDisabled,
        handleToggleInputs,
        handleInputChange,
        goToNextWeek,
        goToPreviousWeek,
        category,
        setCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
