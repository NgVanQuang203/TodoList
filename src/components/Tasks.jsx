import React, { useLayoutEffect } from 'react';
import { useStore } from '../store';
import Main from '../share/Main';
import storage from '../store/storage';
import { Helmet } from 'react-helmet';
const Tasks = ({ value }) => {
  const [state, dispatch] = useStore();
  let { todos } = state;
  useLayoutEffect(() => {
    storage.set(todos);
  }, [todos]);
  return (
    <div>
      <Helmet>
        <title>ToDo List</title>
      </Helmet>
      <Main margin={'mt-56'} value={todos} title={'Task'} />
    </div>
  );
};

export default Tasks;
