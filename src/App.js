
import React from 'react'
import RootNaivgation from 'src/navigation/RootNavigation'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider} from '@apollo/client'; 


const client = new ApolloClient({
    uri: 'https://bk-dev.eonbit.com/graphql',
    cache: new InMemoryCache()
});
  
const App = () => {  

    return (        
        <ApolloProvider client={client}>
            <RootNaivgation />
        </ApolloProvider>        
    )    
}
export default App


