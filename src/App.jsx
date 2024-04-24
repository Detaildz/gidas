import './reset.css';
import './App.css';
import io from 'socket.io-client';
//Components
import Main from './Components/Main/Main';
import Header from './Components/Header/Header';
const socket = io('https://gidas-api.vercel.app');
function App() {
  console.log(socket);
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
