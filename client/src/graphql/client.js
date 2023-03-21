// Import necessary components from the Apollo Client library
import { ApolloClient, InMemoryCache, ApolloProvider as ApolloClientProvider, HttpLink, ApolloLink } from '@apollo/client'
// Set up an HttpLink to connect to the GraphQL server
const httpLink = new HttpLink({ uri: process.env.REACT_APP_SERVER_URL });
// Create an authentication link to add authorization headers to each request
const authLink = new ApolloLink((operation, forward) => {
    // Get the token from localStorage
    const token = localStorage.getItem('id_token');
// Set the authorization header with the token if it exists
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : ''
        }
    });
// Continue processing the operation
    return forward(operation);
});
// Initialize the ApolloClient with the combined authLink and httpLink, and an InMemoryCache for caching results
const client = new ApolloClient({
    link: authLink.concat(httpLink), 
    cache: new InMemoryCache()
});
// Create an ApolloProvider component that wraps the application with the configured ApolloClient
export default function ApolloProvider({ children }) {
    return (
        <ApolloClientProvider client={client}>
            {children}
        </ApolloClientProvider>
    )
}
