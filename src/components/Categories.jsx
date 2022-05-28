import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
// import Details from '../pages/Details';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      categorie: [],
      products: [],
      productCart: [],
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
    const { products } = this.state;
    console.log(products);
  }

  handleCategorie = async () => {
    const categories = await getCategories();
    this.setState({ categorie: categories });
  }

    addCart = (e) => {
      console.log(e.target.id.title);
      e.preventDefault();
      let localSt = JSON.parse(localStorage.getItem('productCart'));
      console.log(localSt);
      if (localSt === null) {
        localSt = [];
      }
      const { products } = this.state;
      const filterProduct = products.filter((product) => product.id === e.target.id);
      this.setState(() => ({
        productCart: [...localSt, ...filterProduct],
      }), () => {
        const { productCart } = this.state;
        localStorage.setItem('productCart', JSON.stringify(productCart));
      });
    }

    render() {
      const { categorie, products } = this.state;
      return (
        <div>
          { categorie.map((obj) => (
            <label className="categories" key={ obj.id } data-testid="category" htmlFor={ obj.name }>
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
              <button
                data-testid="product-add-to-cart"
                type="button"
                id={ product.id }
                onClick={ (e) => this.addCart(e) }
              >
                Adicionar ao carrinho
              </button>
              <Link
                data-testid="product-detail-link"
                to={ `/Details/${product.id}` }
              >
                Detalhes
              </Link>
            </div>
          ))}
        </div>
      );
    }
}

export default Categories;
