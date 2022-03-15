import React, { Component } from 'react';
import Button from '../components/Button'
import Display from '../components/Display'
import './Calculator.css'


const startState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}
class Calculator extends Component {

    state = { ...startState}

    constructor(props) {
        super(props)

        this.clearCache = this.clearCache.bind(this)
        this.handleOperation = this.handleOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearCache(){
        this.setState({...startState})
    }

    handleOperation(operation){
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true})
        } else {
            const equal = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e) {
                values[0] = this.state.values[0]
            }
            values[1] = 0

            this.setState({ 
                displayValue: values[0],
                operation: equal ? null : operation,
                current: equal ? 0 : 1, 
                clearDisplay: !equal,
                values
            })
        }
    }

    addDigit(num){
        if (num === '.' && this.state.displayValue.includes('.')){
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue 
        const displayValue = currentValue + num
        this.setState({ displayValue, clearDisplay: false})

        if (num !== '.') {
            const index = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]

            values[index] = newValue
            this.setState({ values })
            console.log(values)
        }   
    }

    render() { 
        return (
            <div className="calculator">
                <Display value = {this.state.displayValue}/>
                <Button label = "AC" click = { this.clearCache} triple/>
                <Button label = "/" click = { this.handleOperation} operation/>
                <Button label = "7" click = { this.addDigit}/>
                <Button label = "8" click = { this.addDigit}/>
                <Button label = "9" click = { this.addDigit}/>
                <Button label = "*" click = { this.handleOperation} operation/>
                <Button label = "4" click = { this.addDigit}/>
                <Button label = "5" click = { this.addDigit}/>
                <Button label = "6" click = { this.addDigit}/>
                <Button label = "-" click = { this.handleOperation} operation/>
                <Button label = "1" click = { this.addDigit}/>
                <Button label = "2" click = { this.addDigit}/>
                <Button label = "3" click = { this.addDigit}/>
                <Button label = "+" click = { this.handleOperation} operation/>
                <Button label = "0" click = { this.addDigit} double/>
                <Button label = "." click = { this.addDigit}/>
                <Button label = "=" click = { this.handleOperation} operation/>
            </div>
        );
    }
}
 
export default Calculator;