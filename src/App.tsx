import { useEffect, useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import './App.scss';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('lock-scroll');
    } else {
      document.body.classList.remove('lock-scroll');
    }
  }, [isSidebarOpen]);

  return (
    <div className="App">
      <ScrollRestoration />

      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Sidebar isSidebarOpen={isSidebarOpen} />

      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
