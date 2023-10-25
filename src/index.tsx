import { createRoot } from 'react-dom/client';
import App from "./app/App";
import { StoreProvider } from './app/providers/StoreProvider';
import { BrowserRouter } from 'react-router-dom';
import { FormProvider } from 'app/providers/DataProvider/FormProvider';

createRoot(document.getElementById('root')).render(
    <StoreProvider>
        <BrowserRouter>
            <FormProvider>
                <App />
            </FormProvider>
        </BrowserRouter>
    </StoreProvider>
)