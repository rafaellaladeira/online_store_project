import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      categorie: [],
      products: [],
    };
  }

  componentDidMount() {
    this.handleCategorie();
  }

  handleCheck = async ({ target }) => {
    const response = await getProductsFromCategoryAndQuery(target.value, '');
    this.setState({
      products: response.results,
    });
  }

  handleCategorie = async () => {
    const categories = await getCategories();
    this.setState({ categorie: categories });
  }

  render() {
    const { categorie, products } = this.state;
    return (
      <div>
        { categorie.map((obj) => (
          <label key={ obj.id } data-testid="category" htmlFor={ obj.name }>
            <input
              type="radio"
              id={ obj.name }
              name="radio-btn"
              value={ obj.id }
              onChange={ this.handleCheck }
            />
            { obj.name }
          </label>
        )) }
        { products.map((product) => (
          <div
            key={ product.id }
            data-testid="product"
            id={ product.id }
          >
            <p>{product.id}</p>
            <p>{ product.title}</p>
            <p>{product.price}</p>
            <img src={ product.thumbnail } alt={ product.title } />
          </div>
        ))}
      </div>
    );
  }
}

export default Categories;
