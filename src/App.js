import React, { useState, useEffect } from 'react';
import Particles from 'react-particles-js';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Modal from './components/Modal/Modal';

import './App.css';

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
  const [route, setRoute] = useState('home'); //tmp state (should be signin)
  const [isSignedIn, setIsSignedIn] = useState(true); //tmp state (should be false)
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  });

  const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

  const onInputChange = (event) => {
    setInput(event.target.value);
    if (boxes.length != 0) setBoxes([]);
  };

  const handlePictureSubmit = () => {
    setImageUrl(input);
    fetch(`${baseUrl}/imageurl`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch(`${baseUrl}/image`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser({ ...user, entries: count });
            });
        }
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
    if (route === 'signout' || route === 'signin') {
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  const handleSignIn = (email, password) => {
    fetch(`${baseUrl}/signin`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.id) {
          const { id, name, email, entries, joined } = data;
          setUser({ id, name, email, entries, joined });
          setIsSignedIn(true);
          setRoute('home');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegister = (email, password, name) => {
    fetch(`${baseUrl}/register`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        if (data.id) {
          const { id, name, email, entries, joined } = data;
          setUser({ id, name, email, entries, joined });
          setIsSignedIn(true);
          setRoute('home');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='App'>
      <Particles className='particles' params={particlesOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === 'home' ? (
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onPictureSubmit={handlePictureSubmit}
          />
          <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
        </div>
      ) : route === 'signin' ? (
        <Signin onRouteChange={onRouteChange} handleSignIn={handleSignIn} />
      ) : (
        <Register
          onRouteChange={onRouteChange}
          handleRegister={handleRegister}
        />
      )}
    </div>
  );
};

export default App;
