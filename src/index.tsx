import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { render } from "@testing-library/react";
import { store } from "./Redux/store";
import { Provider } from "react-redux";

render(
  <Provider store={store}>
    <App />
  </Provider>
);
reportWebVitals();
