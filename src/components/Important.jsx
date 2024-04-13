import React from 'react';
import Main from '../share/Main';
import { useStore } from '../store';
import { Helmet } from 'react-helmet';
const Important = () => {
  const [state, dispatch] = useStore();
  const { todos, todoInput, important } = state;
  return (
    <div>
      <Helmet>
        <title>Important</title>
      </Helmet>
      <Main margin="mt-16" value={important} title={'Important'} />
    </div>
  );
};

export default Important;
