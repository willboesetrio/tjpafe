import { useState } from 'react';
import './App.css';
import { LoginContext } from './contexts/LoginContext';
import Routing from './pages/Routing';

function App() {

  const [isLogged, setIsLogged] = useState(false);
  const [userProfile, setUserProfile] = useState();

  return (
    <div className="App">
      <LoginContext.Provider value={{isLogged, setIsLogged, userProfile, setUserProfile}}>
        <Routing />
      </LoginContext.Provider>
    </div>
  );
}

export default App;
