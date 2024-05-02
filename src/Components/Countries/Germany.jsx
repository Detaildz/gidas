import Trucks from '../Trucks/Trucks';
import { ChangeWeek } from '../buttons/changeWeek';

import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

import PropTypes from 'prop-types';

function Germany({ country }) {
  const { handleCountryChange } = useContext(AppContext);
  return (
    <div className="main-container">
      <div className="header">
        <ChangeWeek handleCountryChange={handleCountryChange}></ChangeWeek>
      </div>
      <div className="trucks-container">
        <p className="category">IMPORT</p>
        <Trucks category="import" country={country}></Trucks>
        <p className="category">EXPORT</p>
        <Trucks category="export" country={country}></Trucks>
      </div>
    </div>
  );
}

Germany.propTypes = {
  country: PropTypes.string.isRequired,
};

export default Germany;
