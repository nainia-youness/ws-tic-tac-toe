import {React,useEffect,useState} from 'react';
import Play from './pages/Play'
import CreateJoinGame from './pages/CreateJoinGame'
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import SignInSignUp from './pages/SignInSignUp';
import SignIn from './pages/SignIn';
import PageNotFound from './pages/PageNotFound';
import SignUp from './pages/SignUp';
import {w3cwebsocket} from 'websocket';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
  const [wsConnectionError, setWsConnectionError] = useState();
  
  const  ws = new w3cwebsocket('ws://127.0.0.1:8080/websocket');

  useEffect(() => {
    try{
      ws.onmessage = (message) =>{
        const response=JSON.parse(message.data)
        console.log(response)
        setWsConnectionError('')
      }
    }
    catch(err){
      console.log(err)
      setWsConnectionError(response.error.message)
    }
  }, [])
  
  return (
    <BrowserRouter>
         <Switch>
            <PrivateRoute  path="/createJoinGame" component={CreateJoinGame} ws={ws} wsConnectionError={wsConnectionError}/>
            <PrivateRoute  path="/play" component={Play} ws={ws} wsConnectionError={wsConnectionError}/>
            <PublicRoute path="/signInSignUp" component={SignInSignUp} ws={ws} wsConnectionError={wsConnectionError}/>
            <PublicRoute path="/signIn" component={SignIn} ws={ws} wsConnectionError={wsConnectionError}/>
            <PublicRoute path="/signUp" component={SignUp} ws={ws} wsConnectionError={wsConnectionError}/>
            <Route  path='*' exact={true}  component={PageNotFound}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;