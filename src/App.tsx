import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
// import Clarifai from 'clarifai';
import FaceRecognition from './FaceRecognition';
import ImageLinkForm from './ImageLinkForm/ImageLinkForm';
import Navigation from './Navigation/Navigation';
import Rank from './Rank/Rank';

// const app = new Clarifai.App({
//   apiKey: 'b6cd2b615d4c49e6b991dec3f7754ba1'
// });
// console.log(app);

const App = (): ReactElement => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    // app.models
    //   .predict('e466caa0619f444ab97497640cefc4dc', inputValue)
    //   .then((response: any) => {
    //     console.log(response);
    //   });
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden">
      <Navigation />
      <main className="grid h-full place-items-center">
        <div className="flex w-full flex-col items-center justify-center">
          <Rank />
          <ImageLinkForm
            onInputChange={handleInputChange}
            onButtonSubmit={handleSubmit}
            inputValue={inputValue}
          />
          <FaceRecognition />
        </div>
      </main>
    </div>
  );
};

export default App;
