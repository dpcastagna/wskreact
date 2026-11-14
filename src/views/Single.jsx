import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const item = state;
  const navigate = useNavigate();
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
      <p>Created: {new Date(item.created_at).toLocaleString('fi-FI')}</p>
      <p>Size: {item.filesize}</p>
      <p>Type: {item.media_type}</p>
      {/* TODO: add all media file details and video/image player here */}
      <p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </p>
    </>
  );
};

export default Single;
