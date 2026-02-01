
import { useEffect } from 'react';
import { StatusBar } from '@capacitor/status-bar';
import Home from './components/Home'

function App() {
  useEffect(() => {
    const setFullScreen = async () => {
      try {
        await StatusBar.hide();
        await StatusBar.setOverlaysWebView({ overlay: true });
      } catch (err) {
        console.log('Status bar control not available', err);
      }
    };
    
    setFullScreen();
  }, []);

  return <Home />
}

export default App
