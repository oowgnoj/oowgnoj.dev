import React from 'react';
import { Router } from '@reach/router';
import About from './About';
import Project from './projects';
const App = () => {
    return (
        <Router basepath="/">
            <About path="/about" />
            <Project path="/projects" />
        </Router>
    );
};
export default App;
