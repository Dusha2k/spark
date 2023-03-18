import Head from 'next/head';
import Image from 'next/image';
import { Homepage } from '../src';
import { Inter } from 'next/font/google';
import { Flex } from '@chakra-ui/layout';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return <Homepage />;
}
