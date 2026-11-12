import PropTypes from 'prop-types';

const MediaRow = ({item, setItem}) => {
  return (
    <tr onClick={() => setItem(item)}>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
    </tr>
  );
};

export default MediaRow;

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
};
