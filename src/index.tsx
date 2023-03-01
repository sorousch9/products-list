import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { render } from "@testing-library/react";
import { persistor, store } from "./Redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
reportWebVitals();
