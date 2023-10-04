// Container component
import { ApolloClient, InMemoryCache, ApolloProvider, TypePolicies } from '@apollo/client';

const typePolicies: TypePolicies = {
  Query: {
    fields:{
      postPaginatedList : {
        keyArgs: false,
        merge(existing = [], incoming){ 
          return [...existing, ...incoming]
        }
      }
    }
  }
}

const client = new ApolloClient({
  uri: 'https://campegine.stepzen.net/api/alert-mink/__graphql',
  headers: {'Authorization':'apikey campegine::stepzen.io+1000::1cbb3d14b1d329bbc5794f6b945afd43195fb26ca1aea565087db4edb329ff96'},
  cache: new InMemoryCache({ typePolicies }),
});

export default client;