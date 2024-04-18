import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';


const handleAddTruck = () => {
    const newId = new Date().getTime();
    setTrucks([
      ...trucks,
      {
        id: newId,
        week: selectedWeek,
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
      },
    ]);
  };


export const Buttons = () => {
  return (
    <button onClick={handleAddTruck} className="add-truck">
      Add Truck
      <FontAwesomeIcon icon={faTruck} />
    </button>
  );
};
