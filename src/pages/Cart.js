import React from 'react';

class Cart extends React.Component {
  constructor() {
    super();

    this.state = {
      counter: 0,
      products: [],
    };
  }

  componentDidMount() {
    this.gettingProductFromLocal();
  }

   gettingProductFromLocal = () => {
     let cartProducts = JSON.parse(localStorage.getItem('productCart'));
     if (cartProducts === null) {
       cartProducts = 0;
     }
     this.setState({
       products: cartProducts,
       counter: cartProducts.length,
     });
   }

   render() {
     const { counter, products } = this.state;
     return (

       counter > 0
         ? (
           <div>
             <ul>
               {
                 products.map((product) => (
                   <li
                     key={ product.productName }
                   >
                     <p
                       data-testid="shopping-cart-product-name"
                     >
                       { product.productName }
                     </p>
                     <p>{ `R$ ${product.price}` }</p>
                     <img src={ product.image } alt={ product.productName } />
                   </li>
                 ))
               }
             </ul>
             <p data-testid="shopping-cart-product-quantity">{ `Itens: ${counter}` }</p>
           </div>
         )
         : <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
     );
   }
}

export default Cart;
