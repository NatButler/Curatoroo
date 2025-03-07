import { Routes, Route } from 'react-router-dom';
import SkipToContent from './components/SkipToContent';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Curate from './pages/Curate';
import Exhibition from './pages/Exhibition';
import './App.css';

function App() {
  return (
    <>
      <SkipToContent />
      <Header />
      <main id="main">
        <Routes>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/curate" element={<Curate />}></Route>
          <Route path="/curate/:id" element={<Exhibition />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
