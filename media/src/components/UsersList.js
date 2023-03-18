import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import { useThunk } from '../hooks/use-thunk';

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

  let content; 
  // if we are loading user assign skeleton to the content variable
  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-full" />
  } else if (loadingUsersError) {
    // otherwise assign this div with error to content variable
    content =<div> Error fetching data...</div>
  } else {
    //if not loading user or no error then assign this list to content variable
    content = data.map((user) => {
      return (<div key={user.id} className ="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
      );
    });
  };

  return <div>
    <div className="flex flex-row justify-between items-centers m-3">
      <h1 className="m-2 text-xl">Users</h1>
      <Button loading={isCreatingUser} onClick={handleUserAdd}>
        + Add User 
      </Button>
      {creatingUserError && 'Error creating user...'}
    </div>
    {content}
  </div>;
}

export default UsersList;