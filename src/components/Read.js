import React, { useState } from 'react'

const Read = () => {
    const [readMore, setReadMore] = useState(false)
  return (
    <div>
        <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat maiores quam alias porro eligendi quasi totam eaque.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat maiores quam alias porro eligendi quasi totam eaque.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat maiores quam alias porro eligendi quasi totam eaque.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat maiores quam alias porro eligendi quasi totam eaque.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat maiores quam alias porro
            <span onClick={()=>setReadMore(true)}>{readMore?null:'...readmore'}</span>
            {
            readMore?
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat maiores quam alias porro eligendi quasi totam eaque.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat maiores quam alias porro eligendi quasi totam eaque.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat maiores quam alias porro eligendi quasi totam eaque.
            <span onClick={()=>setReadMore(false)}>Read less</span></span>
            :null
            }
            </p>
        </div>
    </div>
  )
}

export default Read