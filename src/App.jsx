import Router from 'router';
import 'assets/styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './setup/redux/Store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        <Router />
      </PersistGate>
    </Provider>
  );
}

export default App;
