import Austria from '../Countries/Austria';
import Germany from '../Countries/Germany';

import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

import './main.scss';
import austriaflag from '../../assets/austriaflag.png';
import germanyflag from '../../assets/germanyflag.png';

function Main() {
  const { country, handleCountryChange } = useContext(AppContext);

  return (
    <div className="main-container">
      <div className="countrySelect">
        <img
          className={country === 'Austria' ? 'selectedFlag' : 'otherFlag'}
          src={austriaflag}
          alt="austria"
          onClick={() => handleCountryChange('Austria')}
        />
        <img
          className={country === 'Germany' ? 'selectedFlag' : 'otherFlag'}
          src={germanyflag}
          alt="germany"
          onClick={() => handleCountryChange('Germany')}
        />
      </div>

      <div className="trucks-container">
        {country === 'Austria' && <Austria country="Austria" />}
        {country === 'Germany' && <Germany country="Germany" />}
      </div>
    </div>
  );
}

export default Main;
