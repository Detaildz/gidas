import {
  createContext,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { getWeekNumber } from '../helpers/sortWeekHelper';
import PropTypes from 'prop-types';
// import io from 'socket.io-client';
import { cfg } from '../cfg/cfg';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [trucks, setTrucks] = useState([]);
  const thisWeek = getWeekNumber(new Date());
  const [selectedWeek, setSelectedWeek] = useState(thisWeek);
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [category, setCategory] = useState('');

  useEffect(() => {
    (async () => {
      const data = await fetchData();
      console.log('data', data);
      const dataByWeek = data.filter((truck) => truck.week === selectedWeek);

      setTrucks(dataByWeek);
    })();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${cfg.API.HOST}/trucks`);

      if (!response.ok) {
        throw new Error('Failed to fetch trucks');
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }, [selectedWeek]);

  const handleWeekChange = async (e) => {
    const selectedWeek = parseInt(e.target.value);

    const data = await fetchData();
    const dataByWeek = data.filter((truck) => truck.week === selectedWeek);

    setTrucks(dataByWeek);
    setSelectedWeek(selectedWeek);
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
        `${cfg.API.HOST}/trucks/${updatedTruck.customId}`,
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
        const response = await fetch(`${cfg.API.HOST}/trucks/${customId}`, {
          method: 'DELETE',
        });
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

  const handleAddTruck = async (category, truckData) => {
    const newTruck = {
      customId: generateCustomId(),
      week: selectedWeek,
      category: category,
      ...truckData, // Spread the truck data into the new truck object
      inputsDisabled: true,
    };

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
    const currentWeek = selectedWeek - 1;
    const data = await fetchData();
    const dataByWeek = data.filter((truck) => truck.week === currentWeek);

    setTrucks(dataByWeek);
    setSelectedWeek((prevOffset) => prevOffset - 1);
  };

  const goToNextWeek = async () => {
    const currentWeek = selectedWeek + 1;
    const data = await fetchData();
    const dataByWeek = data.filter((truck) => truck.week === currentWeek);

    setTrucks(dataByWeek);
    setSelectedWeek((prevOffset) => prevOffset + 1);
  };

  const generateCustomId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000);
    return selectedWeek + `${timestamp}${randomNumber}`;
  };

  const addTrucksFromLastWeek = async () => {
    const data = await fetchData();
    const dataByWeek = data.filter((truck) => truck.week === selectedWeek - 1);

    // check if selected week is empty
    console.log('dataByWeek', dataByWeek);
    if (trucks.length === 0) {
      for (let i = 0; i < dataByWeek.length; i++) {
        const { category, carrier, truckNumber, price } = dataByWeek[i];
        handleAddTruck(category, {
          carrier,
          truckNumber,
          price,
        });
        console.log('added truck', dataByWeek[i]);
      }
    }
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
        addTrucksFromLastWeek,
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
