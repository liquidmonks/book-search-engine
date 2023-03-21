import { ApolloClient, InMemoryCache, ApolloProvider as ApolloClientProvider, HttpLink, ApolloLink } from '@apollo/client'

const httpLink = new HttpLink({ uri: process.env.REACT_APP_SERVER_URL });

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : ''
        }
    });

    return forward(operation);
});

const client = new ApolloClient({
    link: authLink.concat(httpLink), 
    cache: new InMemoryCache()
});

export default function ApolloProvider({ children }) {
    return (
        <ApolloClientProvider client={client}>
            {children}
        </ApolloClientProvider>
    )
}
