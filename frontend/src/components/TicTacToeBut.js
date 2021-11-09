import React from 'react'


const stylingObject = {
    button: {
        width:'100%',
        height:'100%',
        fontSize:'40px',
        fontFamily:'Times New Roman,, Times, serif'
    }
  }

function TicTacToeBut(props) {

    return (
        <>
            <button  onClick={props.onClick} style={stylingObject.button} className='ticTacToeBut'type="button" class={props.butState} data-mdb-ripple-color="dark" disabled={props.isGameEnded}>
                {props.boxState}
            </button>
        </>
    )
}

export default TicTacToeBut
