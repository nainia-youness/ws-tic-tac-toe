import {React,useEffect,useState} from 'react';
import Play from './pages/Play'
import CreateJoinGame from './pages/CreateJoinGame'
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import SignInSignUp from './pages/SignInSignUp';
import SignIn from './pages/SignIn';
import PageNotFound from './pages/PageNotFound';
import SignUp from './pages/SignUp';
import {w3cwebsocket} from 'websocket';
//import { WebSocketServer } from 'ws'
function App() {
  const [websocketError, setWebsocketError] = useState();
  const [websocketResponse, setWebsocketResponse] = useState();
  const [wsConnectionError, setWsConnectionError] = useState();

  const  ws = new w3cwebsocket('ws://127.0.0.1:8080/websocket');

  useEffect(() => {
    try{
      ws.onmessage = (message) =>{
        const response=JSON.parse(message.data)
        console.log(response)
        setWebsocketError('')
      }
    }
    catch(err){
      console.log(err)
      setWebsocketError(response.error.message)
    }
  }, [])
  
  
  return (
    <BrowserRouter>
         <Switch>
            <Route path="/play" render={() => (<Play client={ws} wsConnectionError={wsConnectionError}/>)}/>
            <Route path="/createJoinGame" render={() => (<CreateJoinGame client={ws} wsConnectionError={wsConnectionError}/>)}/>
            <Route path="/signInSignUp" component={SignInSignUp}/>
            <Route path="/signIn"  render={() => (<SignIn client={ws} wsConnectionError={wsConnectionError}/>)}/>
            <Route path="/signUp"  render={() => (<SignUp client={ws} wsConnectionError={wsConnectionError}/>)}/>
            <Route  path='*' exact={true}  component={PageNotFound}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;