import React from 'react';
import { MdOutlineClose } from "react-icons/md";
import { useCartStore } from '../../../store/useCartStore';

const SingleCartProduct = ({ product }) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateCart = useCartStore((state) => state.updateCart);

  const increment = () => updateCart(product.productId, product.quantity + 1);
  const decrement = () => {
    if (product.quantity > 1) {
      updateCart(product.productId, product.quantity - 1);
    } else {
      removeFromCart(product.productId); // Eğer miktar 1 ise ürünü kaldır
    }
  };

  return (
    <tr className="bg-white dark:bg-gray-800">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <button className='w-[30px] h-[30px]' onClick={() => removeFromCart(product.productId)}>
          <MdOutlineClose />
        </button>
      </td>
      <td className="px-6 py-4">
        <img src={product.productPic} className='w-[100px] h-[100px]' alt={product.name} />
      </td>
      <td className="px-6 py-4">{product.name}</td>
      <td className="px-6 py-4">{product.price}$</td>
      <td className="px-6 py-4">
        <div className='flex items-center gap-2'>
          <button className='w-10 h-10' onClick={decrement}>-</button>
          <p>{product.quantity}</p>
          <button className='w-10 h-10' onClick={increment}>+</button>
        </div>
      </td>
      <td className="px-6 py-4">{(product.price * product.quantity).toFixed(2)}$</td>
    </tr>
  );
};


export default SingleCartProduct;