import { ReactElement } from 'react';
import Logo from '../Logo/Logo';

const Navigation = (): ReactElement => (
  <header className="fixed flex w-full flex-row justify-between">
    <Logo />
    <span className="mr-3 mt-3 cursor-pointer font-sans text-lg font-light tracking-wide text-slate-800 underline hover:text-slate-500">
      Sign out
    </span>
  </header>
);
export default Navigation;
