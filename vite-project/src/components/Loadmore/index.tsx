import React from 'react'
import Button from '../Button'

type Props = {
    limit: number;
    handleClick: () => void;
}

const Loadmore = ({ limit, handleClick }: Props) => {
    return (
        <div className='w-full flex-center my-10'>
            {limit < 30 && (<Button handleClick={handleClick} title="Devamini Yukle" />)}

        </div>
    )
}

export default Loadmore
