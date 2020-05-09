import React, { Component } from "react";
import axios from 'axios';

class Calculator extends Component {
    constructor(props) {
      super(props);
      this.state = {
        amount: 0,
        type: 'gross',
        calculatedValue: 0
      }
    };
    callAPI = async () => {
      await axios.get(`/api/salary?amount=${this.state.amount}&type=${this.state.type}`)
          .then(res => {
            console.log(res)
            this.setState({calculatedValue: res.data.value});
          })
          .catch(error => {
            console.log(error.response)
          });
    };
    handleChangeAmount = (e) =>{
      console.log(e.target)
      this.setState({amount: e.target.value});
    }
    handleChangeType = (e) =>{
      console.log(e.target)
      this.setState({type: e.target.value});
    }
    render() {
      return (
        <div>
          Wynagrodzenie brutto:
          <input value={this.state.amount || 0} onChange={(e) => this.handleChangeAmount(e)}></input>
            Umowa:
            <select value={this.state.type} onChange={(e) => this.handleChangeType(e)}>
              <option value='gross'>brutto</option>
              <option value='net'>netto</option>
            </select>
            <button onClick={this.callAPI}>Oblicz</button>
            <br/>
            Wartość:
            {this.state.calculatedValue}

        </div>
      );
    }
}

export default Calculator;