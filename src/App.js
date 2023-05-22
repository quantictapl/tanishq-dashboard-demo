
import './App.css';
import Dashboard from "./Components/Dashboard"
import { DateProvider } from './Components/DateContext';
import ErrorBoundary from './Components/ErrorBoundary';

function App() {
  return (
    <DateProvider>
      <ErrorBoundary>
        <div className="App">
          <Dashboard />
        </div>
      </ErrorBoundary>
    </DateProvider>
  );
}

export default App;
