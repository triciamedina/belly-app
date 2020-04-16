import React from 'react';

import { Button, ButtonLink } from './Utils/Utils'

function App() {
  return (
    <main className='App'>
      <ButtonLink href='#' className='ButtonLink ghost'>
        Sign in
      </ButtonLink>
      <Button className='Button'>
        Sign in
      </Button>
    </main>
  );
}

export default App;