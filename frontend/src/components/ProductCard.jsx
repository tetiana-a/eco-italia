import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CATS = { oils:'Oleje', cosmetics:'Kosmetika', food:'Potraviny', home:'Domácnost', wellness:'Wellness' };

export default function ProductCard({ product, delay = 0 }) {
  const { dispatch } = useCart();
  return (
    <div className="pcard" style={{ animationDelay: `${delay}ms` }}>
      <Link to={`/produkt/${product.id}`} className="pcard-img">
        <img src={product.image} alt={product.nameCs} loading="lazy" />
        <div className="pcard-overlay"><span className="pcard-qs">Zobrazit detail</span></div>
        <div className="pcard-eco">{'★'.repeat(product.eco)}{'☆'.repeat(5-product.eco)}</div>
      </Link>
      <div className="pcard-body">
        <span className="pcard-cat">{CATS[product.category]}</span>
        <Link to={`/produkt/${product.id}`}><h3 className="pcard-name">{product.nameCs}</h3></Link>
        <p className="pcard-origin">{product.origin}</p>
        <div className="pcard-foot">
          <span className="pcard-price">{product.price} Kč</span>
          <button className="pcard-add" onClick={() => dispatch({ type:'ADD', item:product })}>Přidat</button>
        </div>
      </div>
    </div>
  );
}
