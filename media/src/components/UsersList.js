import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
// hook function
function useThunk(thunk){
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const runThunk = useCallback(() => {
    setIsloading(true);
    dispatch(thunk())
      .unwrap()
      .catch(err => setError(err))
      .finally(() => setIsloading(false));
  }, [dispatch, thunk]);

  return [runThunk, isLoading, error];
}

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
  const { data } = useSelector((state) => {
    return state.users; // { data: [], is loading: false, error: null }
  })

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);
  
  const handleUserAdd = () => {
    doCreateUser();
  };

  if (isLoadingUsers) {
    return <Skeleton times={6} className="h-10 w-full" />
  }

  if (loadingUsersError) {
    return <div> Error fetching data...</div>
  }

  const renderedUsers = data.map((user) => {
    return (<div key={user.id} className ="m-b2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        {user.name}
      </div>
    </div>
    );
  });

  return <div>
    <div className="flex flex-row justify-between m-3">
      <h1 className="m-2 text-xl">Users</h1>
      {isCreatingUser ? (
        'Creating User...'
      ) : ( 
        <Button onClick={handleUserAdd}> + Add User </Button>
      )}
      {creatingUserError && 'Error creating user...'}
    </div>
    {renderedUsers}
  </div>;
}

export default UsersList;