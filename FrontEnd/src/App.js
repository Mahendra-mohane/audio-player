import logo from "./logo.svg";
import "./App.css";
import AudioBookPlayer from "./components/AudioBookPlayer";
// import { audiobook } from "./components/audiobook";
import { useEffect, useState } from "react";

function App() {
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAudioList = async () => {
    setLoading(true);
    const response = await fetch(
      "https://shy-blue-magpie-wrap.cyclic.app/api/audiobook/getAudiobooks"
    );
    const data = await response.json();
    setAudiobooks(data.audiobooks);
    setLoading(false);
  };

  useEffect(() => {
    getAudioList();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <AudioBookPlayer audiobooks={audiobooks} />
    </div>
  );
}

export default App;
