import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import ValidationForm from './App.jsx'
import LayoutPage from './layout.jsx'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ValidationForm />} />
        <Route path="/layout" element={<LayoutPage />} />
      </Routes>
    </Router>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);