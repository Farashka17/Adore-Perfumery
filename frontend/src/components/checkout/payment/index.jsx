import React, { useState } from "react";
import OrangeShape from "../../../assets/OrangeShape.svg";
import SingleCheckoutProduct from "../singleCheckoutProduct";
import { useCartStore } from "../../../store/useCartStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Payment = ({ subtotal, userDetails }) => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCartStore(); // clearCart fonksiyonunu import ettik
  const total = subtotal;

  // Shipping cost logic
  const shippingCost = total > 200 ? 0 : 3.99;
  const isShippingFree = shippingCost === 0;

  const [isLoading, setIsLoading] = useState(false); // Yükleme durumu

  // Sipariş oluşturma işlemi
  const handlePlaceOrder = async () => {
    setIsLoading(true); // Yükleme başladığında true
  
    // Kullanıcı bilgilerini almak için (örneğin: userId)
    const userId = localStorage.getItem("userId"); // Kullanıcı ID'sini buradan temin edebilirsiniz.
  
    // Sipariş verisi
    const orderData = {
      userId,
      products: cart,
      totalAmount: total + shippingCost,
      // userDetails'i JSON string formatına çeviriyoruz
      details: JSON.stringify(userDetails), // Burada JSON.stringify kullanıyoruz
      paymentMethod: "Cash", // Ödeme yöntemi burada sabit olarak "Cash" olarak ayarlandı
    };
  
   try {
  const response = await fetch("http://localhost:3000/orders", { 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (response.ok) {
    toast.success("Siparişiniz başarıyla alındı.");
    clearCart(); // Sipariş başarılı olduktan sonra sepetteki ürünleri temizle
    navigate("/"); // Ana sayfaya yönlendir
   
  } else {
    const errorResponse = await response.json(); // Hata mesajını backend'den al
    throw new Error(errorResponse.message || "Sipariş oluşturulurken bir hata oluştu.");
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

        {/* Shipping Cost */}
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
          Cash
        </p>
      </div>

      <button
        className={`font-raleway text-[15px] font-thin w-full justify-center items-center py-5 border border-[#232323] uppercase hover:bg-yellow-500`}
        onClick={handlePlaceOrder}
        disabled={isLoading} // Yükleme sırasında butonu devre dışı bırak
      >
        {isLoading ? "Processing..." : "Place order"}
      </button>
    </div>
  );
};

export default Payment;
