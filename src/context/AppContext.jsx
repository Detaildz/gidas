import {
  createContext,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { getWeekNumber } from '../helpers/sortWeekHelper';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { cfg } from '../cfg/cfg';
const socket = io('https://gidas-api.vercel.app');
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [trucks, setTrucks] = useState([]);
  const thisWeek = getWeekNumber(new Date());
  const [selectedWeek, setSelectedWeek] = useState(thisWeek);
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [category, setCategory] = useState('export');
  // const [socket, setSocket] = useState(null);
  // const protocol = import.meta.env.PROD ? 'wss://' : 'ws://';
  // const baseUrl = import.meta.env.PROD
  //   ? 'gidas-api.vercel.app'
  //   : 'localhost:3000';

  // useEffect(() => {
  //   setSocket(newSocket);

  //   newSocket.emit('message', 'Hello, server!');

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, [setSocket]);

  useEffect(() => {
    if (!socket || !socket.connected) return;
    socket.on('connect_error', (err) => {
      console.log(`Websocket connect_error due to ${err.message}`, err);
    });

    socket.on('error', (error) => {
      console.log('Websocket error', error);
    });

    return () => {
      socket?.off('connect_error');
      socket?.off('error');
    };
  }, [socket, socket?.connected]);

  useEffect(() => {
    if (!socket || !socket.connected) return;
    socket.on('message', (data) => {
      console.log('data', data);
    });

    socket.on('inputChange', (data) => {
      console.log('data', data);
      setTrucks(data);
    });

    return () => {
      socket?.off('message');
    };
  }, [socket, socket?.connected]);

  useEffect(() => {
    (async () => {
      const data = await fetchData();

      const dataByWeek = data.filter((truck) => truck.week === selectedWeek);

      setTrucks(dataByWeek);
    })();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${cfg.API.HOST}/trucks`);
      console.log(cfg.API.HOST);
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
    socket.emit('inputChange', updatedTrucks);
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
        socket,
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
