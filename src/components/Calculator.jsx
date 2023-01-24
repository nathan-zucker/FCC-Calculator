import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
    "nine"
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
        <div>
            <div id="display">
                <h2>{output !== 0 ? output : input.join('')+entry.join('') || 0}</h2>
                
            </div>
            
            <div>
                <h3>entry: {entry}</h3>
                
                <button id="decimal" onClick={()=>{
                    if (entry.join('').includes('.')){return console.log('already has decimal')}
                    else {
                        setEntry([entry.join('').toString()+'.'])
                    }
                    
                    }}
                >.</button>
                {numberPad()}
                
            </div>
            <div>
                
                
                {operationPad()}
                <button id="equals" onClick={()=>equals()}>=</button>

                <h3>
                    <button onClick={()=>setEntry([])}>CE</button>
                    <button id="clear" onClick={()=>clear()}>CLEAR</button>
                </h3>

            </div>
        </div>
    )
}


export default Calculator