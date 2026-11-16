import {useState, useEffect} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {fetchData} from '../utils/fetchdata';

const MEDIA_API = import.meta.env.VITE_MEDIA_API + '/media';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    try {
      const getMedia = async () => {
        const json = await fetchData(MEDIA_API);
        setMediaArray(json);
      };
      getMedia();
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(mediaArray);
  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
      {selectedItem && (
        <SingleView item={selectedItem} setItem={setSelectedItem} />
      )}
    </>
  );
};
export default Home;
