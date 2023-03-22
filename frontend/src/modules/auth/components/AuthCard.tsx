import { Flex, Button, Icon, Box, Text } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  title: string;
}

export const AuthCard = ({ children, title }: Props) => {
  const navigate = useNavigate();
  return (
    <Flex
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Box boxShadow="2xl" p="10" rounded="md" width="100%">
        <Button
          onClick={() => navigate("/")}
          variant="link"
          leftIcon={<Icon as={AiOutlineArrowLeft} />}
        >
          Вернуться
        </Button>
        <Flex direction="column">
          <Text marginBottom={2} fontSize="2xl" align="center">
            {title}
          </Text>
          {children}
        </Flex>
      </Box>
    </Flex>
  );
};
