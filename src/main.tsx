import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from '@routes/AppRouter';
import "../src/styles/globalStyles.css"

//REDUX 
import { Provider } from 'react-redux';
import {store, persistor} from '@store/store';

//AXIOS
import "./services/axios_global.js";

//PErsistor 
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
    <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
            <AppRouter/>
        </PersistGate>
    </Provider>
)
