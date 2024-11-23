import React, { useState } from "react";
import OrangeShape from "../../../assets/OrangeShape.svg";
import SingleCheckoutProduct from "../singleCheckoutProduct";
import { useCartStore } from "../../../store/useCartStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Payment = ({ subtotal, userDetails }) => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCartStore();
  const total = subtotal;

  const shippingCost = total > 200 ? 0 : 3.99;
  const isShippingFree = shippingCost === 0;

  const [isLoading, setIsLoading] = useState(false); 

  
  const handlePlaceOrder = async () => {
    setIsLoading(true);
    
    const userId = localStorage.getItem("userId");
  
    const orderData = {
      userId,
      products: cart,
      totalAmount: total + shippingCost,
      details: JSON.stringify(userDetails),
      paymentMethod: "Cash",
    };
  
    try {
      const response = await fetch("http://localhost:3000/orders", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        toast.success("Your order has been successfully received.");
        clearCart(); 
        navigate("/"); 
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "An error occurred while creating the order.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="w-[390px] p-6 md:pt-6 md:p-0">
      <div>
        <img src={OrangeShape} className="w-[30px] h-[6px]" />
        <p className="font-raleway text-[#232323] text-[24px] font-thin">
          Your order
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {cart.map((product) => (
          <SingleCheckoutProduct
            key={product.id}
            product={product}
            name={product.name}
            productPic={product.productPic}
            quantity={product.quantity}
            price={product.price}
          />
        ))}
      </div>
      <div className="mt-14">
        <img src={OrangeShape} className="w-[30px] h-[6px]" />
        <p className="font-raleway text-[#232323] text-[24px] font-thin">
          Cart Totals
        </p>
      </div>
      <div className="mt-5 flex flex-col">
        <div className="flex justify-between items-center">
          <p className="text-[18px] font-extralight font-nunito text-[#232323">
            Subtotal
          </p>
          <p className="text-[18px] font-extralight font-raleway text-[#232323">
            {subtotal}$
          </p>
        </div>

   
        <div className="flex justify-between items-center">
          <p className="text-[18px] font-extralight font-nunito text-[#232323]">
            Shipping Cost
          </p>
          {isShippingFree ? (
            <div className="flex items-center gap-1">
              <span className="text-[18px] line-through">$3.99</span>
              <span className="text-red-500 font-thin text-[20px]">Free</span>
            </div>
          ) : (
            <p className="text-[18px] font-extralight font-raleway text-[#232323]">
              $3.99
            </p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[18px] font-extralight font-nunito text-[#232323]">
            Total
          </p>
          <p className="text-[18px] font-extralight font-raleway text-[#232323]">
            {total + shippingCost}$
          </p>
        </div>
      </div>

      <div className="mt-14">
        <img src={OrangeShape} className="w-[30px] h-[6px]" />
        <p className="font-raleway text-[#232323] text-[24px] font-thin">
          Payment Method
        </p>
        <p className="font-raleway text-[#232323] text-[24px] font-thin">
        Paycash at the door
        </p>
      </div>

      <button
        className={`font-raleway text-[15px] font-thin w-full justify-center items-center py-5 border border-[#232323] uppercase hover:bg-yellow-500`}
        onClick={handlePlaceOrder}
        disabled={isLoading} 
      >
        {isLoading ? "Processing..." : "Place order"}
      </button>
    </div>
  );
};

export default Payment;
