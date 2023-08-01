import React from 'react'
import { product } from '../models/product';
import { NumericFormat } from 'react-number-format';

const ProductCard = (product: product) => {
  return (
    <div>
        <div className='h-40'>
            <img className='object-cover h-full w-full' src={product.coverImage} alt="Logo" />
        </div>
        <div className='px-3 pt-2 pb-3'>
            <h3>{product.title}</h3>
            <div className='flex flex-row font-bold'>
                <div className='flex-1 text-[#FF003E]'>
                    {product.discount}%
                </div>
                <div>
                    <NumericFormat displayType='text' value={product.price} thousandSeparator="," /> 원
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCard;
