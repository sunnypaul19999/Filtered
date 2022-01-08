import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class NumCards extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      range: 0,
      randomNumberList: [],
    };
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
    let generateNumber = document.querySelector(`.generate-number>button`);
    generateNumber.addEventListener('click', this.generateOnButtonClick.bind(this));
    let odd = document.querySelector(`.options>button[data-testid="oddbutton"]`);
    odd.addEventListener('click', this.showFilterOdd.bind(this));
    let even = document.querySelector(`.options>button[data-testid="evenbutton"]`);
    even.addEventListener('click', this.showFilterEven.bind(this));
  }

  generateOnButtonClick() {
    ReactDOM.render(<div></div>, document.querySelector('.filtered'));
    let input = document.querySelector(`.number-of-input>input`);
    let value = input.value;
    console.log(`entered value: ${value}`);
    this.setState({
      range: value,
      randomNumberList: this.generate(value),
    });
  }


  generate(range) {
    let randomNumberList = [];
    let randomNumber;
    while (range > 0) {
      //let digits = console.log(Math.pow(10, range.toString().length));
      randomNumber = parseInt(Math.random() * 10);
      randomNumberList.push(randomNumber);
      range--;
    }

    return randomNumberList;
  }


  showFilterOdd() {
    console.log('odd filter');
    ReactDOM.render(this.createNumCards('odd'), document.querySelector('.filtered'));
  }

  showFilterEven() {
    console.log('even filter');
    ReactDOM.render(this.createNumCards('even'), document.querySelector('.filtered'));
  }

  numCard(value, filter = false) {
    let idValue = 'originalList';
    if (filter) {
      idValue = 'filteredList';
    }
    return (
      <div className="card num-card" >
        <div className="card-body">
          <div className="card-title" data-testid={idValue}>{value}</div>
        </div>
      </div>
    );
  }


  createNumCards(filter) {

    if (this.state.randomNumberList.length > 0) {
      let numCards = [];

      if (filter !== undefined) {
        numCards.push(
          (
            <div style={{ width: '100%', 'text-align': 'center' }}>
              <h1>
                <b>Filtered Array</b>
              </h1>
            </div>
          )
        );
      }

      this.state.randomNumberList.forEach((value) => {
        if (filter === 'odd') {
          if (value % 2 !== 0) {
            numCards.push(this.numCard(value, true));
          }
        } else if (filter === 'even') {
          if (value % 2 === 0) {
            numCards.push(this.numCard(value, true));
          }
        } else {
          numCards.push(this.numCard(value));
        }
      });
      return numCards;
    } else {
      return [];
    }
  }

  render() {
    return (
      <div className="num-cards">
        {this.createNumCards()}
      </div>
    );
  }
}


class Filter extends React.Component {

  render() {
    return (
      <div className="container">

        <div className="number-of-input">
          <input data-testid="numberOfInput" className="form-control form-control-lg" type="text"
            placeholder="Enter the numbers of inputs" />
        </div>

        <div className="generate-number">
          <button data-testid="generateNumber" type="button" className="btn btn-success btn-lg btn-block">
            Generate Random Number</button>
        </div>

        <NumCards />

        <div className="options">
          <button data-testid="oddbutton" type="button" className="btn btn-success">ODD</button>

          <button data-testid="evenbutton" type="button" className="btn btn-success">EVEN</button>
        </div>

        <div className="filtered num-cards"></div>

      </div>
    );
  }
}

ReactDOM.render(<Filter />, document.getElementById('root'));