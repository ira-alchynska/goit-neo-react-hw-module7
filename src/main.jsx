import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js"; // No persistor is needed
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
