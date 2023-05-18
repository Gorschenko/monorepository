import React from 'react';
import './App.css';

export enum ImageType {
  Png = 'png',
  Jpg = 'jpg',
  Webp = 'webp',
}

export const format = [
  { label: 'png', value: ImageType.Png },
  { label: 'jpg', value: ImageType.Jpg },
  { label: 'webp', value: ImageType.Webp },
];

function App() {
  const checkApi = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  };
  return (
    <div>
      <button onClick={checkApi}>Check api</button>
    </div>
  );
}

export default App;
