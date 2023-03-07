import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import ArticlePage from './components/ArticlePage'
import Header from "./components/Header";
function MainRouter() {
    return (
        <div>
            <Header /><br/>
            <Routes>
                <Route path='/' element={<Home />}></Route>
               <Route path='/:id' element={<ArticlePage />}></Route>
            </Routes>
        </div>
    );
}

export default MainRouter;
