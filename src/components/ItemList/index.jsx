import './styles.css';

function ItemList({title, description, link}) {
  return (
    <div className="item-list">
      <a href={link} target="_blank" rel="noreferrer">{title}</a>
      <p>{description}</p>
    </div>
  )
}

export default ItemList;
