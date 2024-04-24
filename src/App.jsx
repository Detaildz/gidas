import './reset.css';
import './App.css';
import io from 'socket.io-client';
//Components
import Main from './Components/Main/Main';
import Header from './Components/Header/Header';
const socket = io.connect('https://gidas-api.vercel.app', {
  secure: true,
  transports: ['polling'],
  reconnectionDelay: 500,
  reconnection: true,
  timeout: 5000,
  reconnectionAttempts: Infinity,
  autoConnect: true,
});
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
