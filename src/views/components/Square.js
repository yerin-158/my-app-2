import React, {useState} from "react";

const Square = ({index}) => {
    const [value, setValue] = useState(index);

    return (
        <button className="square" onClick={() => setValue('X')}>
            {value}
        </button>
    );
}

export default Square;
