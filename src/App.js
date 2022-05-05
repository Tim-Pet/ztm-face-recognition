import React, { useState } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';

import './App.css';

const app = new Clarifai.App({
  apiKey: 'b6cd2b615d4c49e6b991dec3f7754ba1',
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onInputChange = (event) => {
    setInput(event.target.value);
    if (boxes.length != 0) setBoxes([]);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => {
        const boxList = [];
        response.outputs[0].data.regions.map((region) => {
          const newBox = region.region_info.bounding_box;
          boxList.push(newBox);
        });
        setBoxes(boxList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  const onSubmitSignIn = () => {
    setIsSignedIn(true);
    setRoute('home');
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === 'home' ? (
        <div>
          <Logo />
          <Rank name={'Tim'} entries={3} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
        </div>
      ) : route === 'signin' ? (
        <Signin onRouteChange={onRouteChange} onSubmitSignIn={onSubmitSignIn} />
      ) : (
        <Register
          onRouteChange={onRouteChange}
          onSubmitSignIn={onSubmitSignIn}
        />
      )}
    </div>
  );
};

export default App;
