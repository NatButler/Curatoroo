import { Routes, Route } from 'react-router-dom';
import SkipToContent from './components/SkipToContent';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Curate from './pages/Curate';
import SaveExhibition from './pages/SaveExhibition';
import Exhibition from './pages/Exhibition';
import Collection1 from './pages/Collection1';
import Collection2 from './pages/Collection2';
import './App.css';

function App() {
  return (
    <>
      <SkipToContent />
      <Header />
      <main id="main" className="main">
        <Routes>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/explore" element={<Explore />}>
            <Route
              path="/explore/collection1"
              element={<Collection1 />}
            ></Route>
            <Route
              path="/explore/collection2"
              element={<Collection2 />}
            ></Route>
          </Route>
          <Route path="/curate" element={<Curate />}></Route>
          <Route
            path="/curate/save-exhibition/:id?"
            element={<SaveExhibition />}
          ></Route>
          <Route path="/curate/:id" element={<Exhibition />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
