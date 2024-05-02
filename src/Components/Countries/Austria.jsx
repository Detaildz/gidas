import Trucks from '../Trucks/Trucks';
import { ChangeWeek } from '../buttons/changeWeek';

import PropTypes from 'prop-types';

function Austria({ country }) {
  return (
    <div className="main-container">
      <div className="header">
        <ChangeWeek></ChangeWeek>
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

Austria.propTypes = {
  country: PropTypes.string.isRequired,
};

export default Austria;
