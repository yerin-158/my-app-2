import React, {useEffect, useState} from "react";

const Square = ({value, index, handleClick}) => {
    return (
        <button className="square" data-index={index} onClick={handleClick}>
            {value}
        </button>
    );
}

export default Square;
