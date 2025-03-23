import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
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
      <div className="layout-container">
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
            <Route path="/exhibitions" element={<Curate />}></Route>
            <Route
              path="/exhibitions/save-exhibition/:id?"
              element={<SaveExhibition />}
            ></Route>
            <Route path="/exhibitions/:id" element={<Exhibition />}></Route>
          </Routes>
        </main>
        <ToastContainer autoClose={1400} hideProgressBar />
      </div>
    </>
  );
}

export default App;
