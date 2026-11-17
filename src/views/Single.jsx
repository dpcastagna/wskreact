import {useLocation, useNavigate} from 'react-router';
import {useUser} from '../hooks/apiHooks';
import {useState} from 'react';

const Single = () => {
  const {getUserInformation} = useUser();
  const [owner, setOwner] = useState(null);
  const {state} = useLocation();
  const item = state;
  const navigate = useNavigate();

  const getUser = async () => {
    const user = await getUserInformation(item.user_id);
    setOwner(user);
  };
  return (
    <>
      <h2>Single media file</h2>
      <h3>{item.title}</h3>
      {item.media_type.startsWith('image') ? (
        <img src={item.filename} alt={item.description} />
      ) : (
        <video controls>
          <source src={item.filename} />
        </video>
      )}
      <p>Description: {item.description}</p>
      <h4
        onClick={() => {
          getUser();
        }}
      >
        Owner: {item.username}
      </h4>
      {owner && (
        <p>
          Email: {owner.email}, User level: {owner.level_name}
        </p>
      )}
      <p>Created: {new Date(item.created_at).toLocaleString('fi-FI')}</p>
      <p>Size: {item.filesize}</p>
      <p>Type: {item.media_type}</p>
      <p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </p>
    </>
  );
};

export default Single;
