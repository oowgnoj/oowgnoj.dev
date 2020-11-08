import React from 'react';
import { Router } from '@reach/router';
import Test from './test';
const App = () => {
    return (
        <Router basepath="/">
            <Test path="/test" />
        </Router>
    );
};
export default App;
