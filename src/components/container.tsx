// src/components/StarWarsPerson.tsx
import React, { useEffect, useState } from 'react';

const StarWarsPerson: React.FC = () => {
  const [person, setPerson] = useState<any | null>(null);
  const apiUrl = 'https://swapi.dev/api/people/1/';

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Import and start the msw server only in development
      const { server } = require('../mocks/server');
      server.listen();
    }

    // Make the API request
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setPerson(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    return () => {
      if (process.env.NODE_ENV === 'development') {
        // Clean up and stop the msw server in development when the component unmounts
        const { server } = require('../mocks/server');
        server.close();
      }
    };
  }, []);

  return (
    <div>
      {person ? (
        <div>
          <h2>{person.name}</h2>
          <p>Height: {person.height} cm</p>
          <p>Mass: {person.mass} kg</p>
          {/* Add more properties as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StarWarsPerson;
