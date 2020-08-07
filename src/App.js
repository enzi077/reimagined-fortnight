import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './components/Main'
import City from './components/City'
function App() {
  return (
    <Switch>
        <Route exact path="/" render={(props)=><Main {...props}/>}/>
        <Route exact path="/:cityId" render={(props)=><City {...props}/>}/>
    </Switch>
  );
}

export default App;
