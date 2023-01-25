import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './Calculator.css'

const buttonIds = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
]

const operations = [
    {
        id: 'add',
        operator: '+'
    },
    {
        id: 'subtract',
        operator: '-'
    },
    {
        id: 'multiply',
        operator: '*'
    },
    {
        id: 'divide',
        operator: '/'
    }
]

function Calculator () {

    const input = useSelector(state=>state.input)
    const output = useSelector(state=>state.output)
    const dispatch = useDispatch()
    const [entry, setEntry] = useState([])

    function backspace () {
        if (entry.length > 0) {
            let backsp = [...entry];
            backsp.pop()
            setEntry(backsp)
        } else if (input.length > 0) {
            let backsp = [...input];
            backsp.pop()
            dispatch({type: 'input', payload: backsp})
        } else {return}
    }

    function clear () {
        dispatch({type: 'clear'})
        setEntry([])
    }

    function equals () {
        const result = eval(input.join('') + entry.join(''));
        dispatch({type: 'output', payload: result});
        dispatch({type: 'input', payload: [...input, ...entry]})
        setEntry([])
    }

    function operation (operator) {
        if (entry.length === 0 || entry[0] === '-') {
            if (output !== 0) {
                dispatch({type: 'input', payload: [output, operator]});
                dispatch({type: 'output', payload: 0})
                return;
            }
            if (operator === '-') {
                setEntry([operator])
            } else {
                let arr = [...input];
                arr.pop()
                arr.push(operator)
                console.log(arr.join(''))
                dispatch({type: 'input', payload: arr})
                setEntry([])
                
            }
            return;
        }
        const result = [...input, ...entry, operator];
        dispatch({type: 'input', payload: result});
        setEntry([]);
    }

    const numberPad = () => {
        let buttons = [];
        for (let i=0; i<=9; i++){
            buttons.push(
                <button 
                    key={i}
                    id={buttonIds[i]}
                    onClick={()=>{
                        if(entry[entry.length-1] === 0 && i === 0){return}
                        setEntry([...entry, i])}}
                >
                    {i}
                </button>
            )
        }
        return(buttons);
    }

    const operationPad = () => {
        return operations.map(e=>
        <button key={e.id} id={e.id} onClick={()=>operation(e.operator)}>
            {e.operator}
        </button>
        )
    }

    return (
        <div id="calculator">
            <div id="display-container">
                <div id="display">
                    <h4 id="expression">{output !== 0 ? output : input.join('')+entry.join('') || 0}</h4>
                </div>
                <h2 id="entry">{entry.length > 0 ? entry : 0}</h2>
            </div>
            
            
            <div id="button-pad">
                <button id="decimal" onClick={()=>{
                    if (entry.join('').includes('.')){return console.log('already has decimal')}
                    else {
                        setEntry([...entry, '.'])
                    }      
                }}>.</button>
                
                {numberPad()}
                
                {operationPad()}
                <button id="equals" onClick={()=>equals()}>=</button>

                <button id="delete" onClick={()=>backspace()} >DELETE</button>
                <button id="clearEntry" onClick={()=>setEntry([])}>CE</button>
                <button id="clear" onClick={()=>clear()}>CLEAR</button>
                

            </div>
        </div>
    )
}


export default Calculator