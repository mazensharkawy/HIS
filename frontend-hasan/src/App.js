import React from 'react';
import {Switch , Route ,Redirect} from 'react-router-dom'


import SearchDoctors from "./pages/search-doctors/search-doctors.component";

class App extends React.Component  {
  
  render()
  {
    return (
      <div >
        <Switch>
            <Route exact path='/' component={SearchDoctors} />
            

        </Switch>
        
      </div>
    );
 
  }
}

export default App;
