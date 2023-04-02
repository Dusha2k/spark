import { Header } from '@/modules/header';

export const HeaderLayout = ({ children }: { children: JSX.Element }) => {

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};
