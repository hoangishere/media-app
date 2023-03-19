import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };
  
  let content; // if loading is true show skeleton
  // also have to pass in a times prop for skeleton to show # boxes
  if (isLoading) {
    content = <Skeleton times={3}/>
    // check if error if error display the div
  } else if (error) {
    content = <div> Error loading albums.</div>
    // otherwise if not loading or no error mean we have data
  } else {
    // map over each album oject and for each one create expandable panel
    // also make sure it has a header of album title
    content = data.map(album => {
      // header props
      const header = <div>{album.title}</div>;
    
      return <ExpandablePanel key={album.id} header={header}>
       List of photos in the album
      </ExpandablePanel>
    })
  }


  return (
    <div> 
      <div> Albums for {user.name} 
        <Button onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div> {content} </div>
    </div>
  );
}

export default AlbumsList;