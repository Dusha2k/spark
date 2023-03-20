import { Button, ButtonProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Props extends ButtonProps {
  isPrefetch?: boolean;
  href: string;
}

export const ButtonLink = ({
  href,
  isPrefetch = true,
  children,
  ...props
}: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (isPrefetch) {
      router.prefetch(href);
    }
  }, []);

  return (
    <Button onClick={() => router.push(href)} {...props}>
      {children}
    </Button>
  );
};
