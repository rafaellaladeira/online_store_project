import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchProduct } from '../services/api';
import Evaluation from '../components/Evaluation';

class Details extends React.Component {
  constructor() {
    super();

    this.state = {
      price: 0,
      productCart: [],
      EvaluationId: '',
    };
  }

  componentDidMount() {
    this.gettingProduct();
  }

  gettingProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const { EvaluationId } = this.state;
    this.setState({
      EvaluationId: id,
    });
    console.log(EvaluationId);
    const product = await fetchProduct(id);
    this.setState({
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    });
  }

  addCart = (e) => {
    e.preventDefault();
    let localSt = JSON.parse(localStorage.getItem('productCart'));
    console.log(localSt);
    if (localSt === null) {
      localSt = [];
    }
    const { price, thumbnail, title } = this.state;
    const dataObj = { price, thumbnail, title };
    this.setState(() => ({
      productCart: [...localSt, dataObj],
    }), () => {
      const { productCart } = this.state;
      localStorage.setItem('productCart', JSON.stringify(productCart));
    });
  }

  render() {
    const { price, thumbnail, title, EvaluationId } = this.state;
    console.log(EvaluationId);
    return (
      <div>
        <Link
          to="/Cart"
          data-testid="shopping-cart-button"
        >
          Ir para o carrinho
        </Link>
        <div>
          <p data-testid="product-detail-name">{ title }</p>
          <p>{ `R$ ${price}` }</p>
          <img src={ thumbnail } alt={ title } />
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ this.addCart }
          >
            Adicionar ao carrinho
          </button>
          <Evaluation
            EvaluationIdProps={ EvaluationId }
          />
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
