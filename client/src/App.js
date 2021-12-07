import "./App.css";
//working generic chat
// import Homepage from "./Pages/Homepage";
import { Route, Routes } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";

// emochat styled components
import Login from "./components/login/index";
import Register from "./components/register/index";
// import Menu from "./components/menu/index";
// import Room from "./components/message/index";

//For graphql on login and register
import {  ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />}/>
            {/* <Route path="/" element={<Homepage />} exact /> */}
            <Route path="/chats" element={<Chatpage />} />
          </Routes> 
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;