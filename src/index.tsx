import React, { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./i18n";

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback='Loading...'>
        <App />
      </Suspense>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
