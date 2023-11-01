import { createRoot } from 'react-dom/client';
import App from "./app/App";
import { StoreProvider } from './app/providers/StoreProvider';
import { BrowserRouter } from 'react-router-dom';
import { FormProvider } from 'app/providers/DataProvider/FormProvider';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')).render(
    <StoreProvider>
        <BrowserRouter>
            <FormProvider>
                <ApolloProvider client={client}>
                    <App />
                </ApolloProvider>
            </FormProvider>
        </BrowserRouter>
    </StoreProvider>
)