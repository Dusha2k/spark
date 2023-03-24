import { socket } from '@/shared/configs/websocket/websocket';
import { Button, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    socket.on('send_message', (headers) => {
      console.log('lol')
    })
  }, [])
  return <Flex><Button onClick={() => socket.emit('send_message')}/></Flex>;
}
