import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Dashboard from './views/Dashboard'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import RenderRecipePage from './views/RenderRecipePage'
//import 'typeface-roboto';


const App = () => {
    return (
    <Router>
        <div className="App">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/recipe">Recipe</Link>
            <Switch>
                <Route path="/dashboard" exact>
                    <Dashboard />
                </Route>
                <Route path="/recipe/:id" component={RenderRecipePage} exact/>
            </Switch>
        </div>
    </Router>
    );
}

export default App;
