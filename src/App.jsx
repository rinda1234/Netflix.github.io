import Header from "./components/Header";
import AppRouter from "./router/Router";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;