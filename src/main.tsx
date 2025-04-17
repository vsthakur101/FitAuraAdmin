import ReactDOM from "react-dom/client";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import RedirectOnRefresh from "./utils/RedirectOnRefresh";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <RedirectOnRefresh />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
