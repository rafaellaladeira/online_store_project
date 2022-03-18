import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import { fetchProduct } from '../services/api';

class Details extends React.Component {
  constructor() {
    super();

    this.state = {
      productName: '',
      price: 0,
      image: '',
      productCart: [],
    };
  }

  componentDidMount() {
    this.gettingProduct();
  }

  gettingProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await fetchProduct(id);
    this.setState({
      productName: product.title,
      price: product.price,
      image: product.thumbnail,
    });
  }

  addCart = (e) => {
    e.preventDefault();
    let localSt = JSON.parse(localStorage.getItem('productCart'));
    console.log(localSt);
    if (localSt === null) {
      localSt = [];
    }
    const { price, image, productName } = this.state;
    const dataObj = { productName, price, image };
    this.setState(() => ({
      productCart: [...localSt, dataObj],
    }), () => {
      const { productCart } = this.state;
      localStorage.setItem('productCart', JSON.stringify(productCart));
    });
  }

  render() {
    const { productName, price, image } = this.state;
    return (
      <div>
        <Link
          to="/Cart"
          data-testid="shopping-cart-button"
        >
          <BsCart2 />
        </Link>
        <div>
          <p data-testid="product-detail-name">{ productName }</p>
          <p>{ `R$ ${price}` }</p>
          <img src={ image } alt={ productName } />
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ this.addCart }
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    );
  }
}

export default Details;

Details.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  params: PropTypes.instanceOf(Object).isRequired,
  id: PropTypes.string.isRequired,
};
