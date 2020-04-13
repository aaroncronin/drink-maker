import React from 'react'

export const CheckBox = props => {
    return (
        <li>
            <input onClick={props.handleCheckChieldElement} type="checkbox" checked={!props.isChecked} value={props.ingred} /> {props.ingred}
      </li>
    )
}

export default CheckBox

