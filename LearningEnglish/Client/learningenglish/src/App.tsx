import './App.css'
import './firebaseConfig'
import PlayGame from './components/PlayGame'
import './firebaseConfig'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import OnePlayer from './components/OnePlayer'
import MultiPlayer from './components/MultiPlayer'
import VocabularyLearning from './components/VocabularyLearning';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PlayGame />} />
          <Route path="/oneplayer/" element={<OnePlayer />} />
          <Route path="/oneplayer/:id" element={<OnePlayer />} />
          <Route path="/multiplayer" element={<MultiPlayer />} />
          <Route path="/VocabularyLearning/:id" element={<VocabularyLearning />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
