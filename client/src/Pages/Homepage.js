import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const history = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history("/chats");
  }, [history]);

  return (
    <Container centerContent >
      <Box w="100%" p={4} borderRadius="lg" >
        <Tabs isFitted variant="hard-rounded">
          <TabList mb="1em">
            <Tab colorScheme="blue"
        width="100%"
        style={{ marginRight: 10 }}
        >Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
       </Box>
     </Container>
  );
}

export default Homepage;
