import { useContext } from 'react';

import './reset.css';
import './App.css';

//Components
import Main from './Components/Main/Main';
import Header from './Components/Header/Header';
import { ThemeContext } from './context/ThemeConstext';

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`App ${theme}`}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
