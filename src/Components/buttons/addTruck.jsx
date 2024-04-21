import { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../context/AppContext';

// import button.scss
import './button.scss';

export const AddTruck = ({ category }) => {
  const { handleAddTruck } = useContext(AppContext);

  const handleClick = () => {
    console.log('Current category:', category);
    handleAddTruck(category);
  };

  return (
    <button onClick={handleClick} className="add-truck">
      Add Truck
      <FontAwesomeIcon icon={faTruck} />
    </button>
  );
};

AddTruck.propTypes = {
  category: PropTypes.oneOf(['import', 'export']).isRequired,
};
