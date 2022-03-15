import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchProduct } from '../services/api';

class Details extends React.Component {
  constructor() {
    super();

    this.state = {
      productName: '',
      price: 0,
      image: '',
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

  render() {
    const { productName, price, image } = this.state;
    return (
      <div>
        <p data-testid="product-detail-name">{ productName }</p>
        <p>{ `R$ ${price}` }</p>
        <img src={ image } alt={ productName } />
        <Link
          to="/Cart"
        >
          Ir para o carrinho
        </Link>
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
