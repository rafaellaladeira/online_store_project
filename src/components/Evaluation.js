import React from 'react';

class Evaluation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      comment: '',
      index: 0,
      evaluation: [],
      gettingEvaluation: [],
    };
  }

  componentDidMount() {
    // this.gettingProps();
    let localSt = JSON.parse(localStorage.getItem('item'));
    if (localSt === null) {
      localSt = [];
    }
    this.setState({
      gettingEvaluation: localSt,
    });
  }

    sendEvaluation = () => {
      let localSt = JSON.parse(localStorage.getItem('item'));
      console.log(localSt);
      if (localSt === null) {
        localSt = [];
      }
      const { email, comment, index } = this.state;
      const dataObj = { email, comment, index };
      this.setState(() => ({
        evaluation: [...localSt, dataObj],
        email: '',
        comment: '',
      }), () => {
        const { evaluation } = this.state;
        localStorage.setItem('item', JSON.stringify(evaluation));
        this.setState({
          gettingEvaluation: evaluation,
        });
      });
    }

    render() {
      const { email, comment, gettingEvaluation } = this.state;

      return (
        <div>
          <h2>Comentários sobre o produto: </h2>
          { !gettingEvaluation
            ? null
            : (gettingEvaluation.map((evaluatioon) => (
              <div
                key={ evaluatioon.email }
              >
                <p>{ evaluatioon.email }</p>
                <p>{ evaluatioon.comment }</p>
              </div>
            )))}
          <label htmlFor="email">
            E-mail:
            <input
              id="email"
              type="email"
              data-testid="product-detail-email"
              placeholder=" email@email.com"
              value={ email }
              onChange={ ({ target }) => this.setState({ email: target.value }) }
            />
          </label>
          <label htmlFor="evaluNumber">
            Nota:
            <input name="evalu" type="radio" data-testid="1-rating" />
            1
            <input name="evalu" type="radio" data-testid="2-rating" />
            2
            <input name="evalu" type="radio" data-testid="3-rating" />
            3
            <input name="evalu" type="radio" data-testid="4-rating" />
            4
            <input id="evaluNumber" name="evalu" type="radio" data-testid="5-rating" />
            5
          </label>
          <label htmlFor="comentario">
            Comentário sobre o produto:
            <textarea
              id="comentario"
              data-testid="product-detail-evaluation"
              placeholder=" Digite aqui seu comentário sobre o produto"
              value={ comment }
              onChange={ ({ target }) => this.setState({ comment: target.value }) }
            />
          </label>
          <button
            className="btnevaluation"
            type="submit"
            data-testid="submit-review-btn"
            onClick={ (e) => this.sendEvaluation(e.target.value) }
          >
            Enviar
          </button>
        </div>
      );
    }
}

export default Evaluation;
