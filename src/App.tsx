import { BrowserRouter, Route, Routes } from "react-router";
import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import { Analitic } from "./pages/Analitic/Analitic";
import { Generator } from "./pages/Generator/Generator";
import { History } from "./pages/History/History";

function App() {
  console.log(styles);
  return (
    <div className={styles.app__container}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index path="/" element={<Analitic />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
