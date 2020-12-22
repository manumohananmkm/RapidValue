import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserList from "./components/user-list";
import UserInfo from "./components/user-info";
function App() {
  return (
    <div>
      <div className="App-intro">
        <BrowserRouter>
          <Switch>
            <Route exact path="/"  component={UserList} />
            <Route path="/UserInfo/:id" component={UserInfo} />
          </Switch>
          </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
