import React from "react";
import Header from "../Header";
import { Route,Routes } from "react-router-dom";
import SearchPage from "../Pages/SearchPage";
import SongDetail from "../Pages/SongDetail";
import FavoritesList from "../FavoritesList";

const App = () => {
  return (
    <div>
        <Header appName='Music'/>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/song/:id" element={<SongDetail />} />
          <Route path="/favorites" element={<FavoritesList />} />
        </Routes>
    </div>
  );
}

export default App;
