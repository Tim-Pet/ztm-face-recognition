import { ReactElement } from 'react';
import Tilt from 'react-parallax-tilt';

const Logo = (): ReactElement => (
  <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25}>
    <div className="my-2 ml-4 grid h-20 w-20 cursor-default place-items-center rounded-lg bg-transparent ">
      <h1 className="text-2xl">🧠</h1>
    </div>
  </Tilt>
);
export default Logo;
