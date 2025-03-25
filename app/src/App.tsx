import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((res) => res.text())
      .then(console.log);
  }, []);
  return <h1>Vite + React</h1>;
}

export default App;
