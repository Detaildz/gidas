import Trucks from '../Trucks/Trucks';
import { ChangeWeek } from '../buttons/changeWeek';

import './main.scss';

function Main() {
  return (
    <div className="main-container">
      <div className="header">
        <ChangeWeek></ChangeWeek>
      </div>
      <div className="trucks-container">
        <h1>IMPORT</h1>
        <Trucks category="import"></Trucks>
        <h1>EXPORT</h1>
        <Trucks category="export"></Trucks>
      </div>
    </div>
  );
}

export default Main;
