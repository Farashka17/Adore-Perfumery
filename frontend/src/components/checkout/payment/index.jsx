import React, { useEffect, useState } from "react";
import OrangeShape from "../../../assets/OrangeShape.svg";
import SingleCheckoutProduct from "../singleCheckoutProduct";
import { useCartStore } from "../../../store/useCartStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Payment = ({ subtotal }) => {
  const navigate = useNavigate();
  const { cart } = useCartStore();
  const total = subtotal;

  // Shipping cost logic
  const shippingCost = total > 200 ? 0 : 3.99;
  const isShippingFree = shippingCost === 0;

  const [payPalEnabled, setPayPalEnabled] = useState(false); // PayPal seçeneği

  useEffect(() => {
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total.toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Ödeme başarıyla tamamlandı!");
            handlePlaceOrder();
          });
        },
        onError: (err) => {
          console.error(err);
          toast.error("PayPal ile ödeme sırasında bir hata oluştu.");
        },
      }).render("#paypal-button-container");
    }
  }, [total]);
  

  const handlePlaceOrder = async () => {
    try {
      // Adım 1: createPayment API çağrısı
      const paymentResponse = await fetch(
        "http://localhost:3000/payment/create-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalAmount: total + shippingCost, // Ödeme miktarı
            userId: "yourUserIdHere", // Kullanıcı ID'si (doğru kullanıcı ID'sini kullanın)
            products: cart, // Sepet detayları
            address: "yourUserAddressHere", // Kullanıcı adresi
          }),
        }
      );

      const paymentData = await paymentResponse.json();

      if (!paymentData.success) {
        throw new Error("create-payment API başarısız.");
      }

      const orderId = paymentData.orderId;

      // Adım 2: capturePayment API çağrısı
      const captureResponse = await fetch(
        "http://localhost:3000/payment/capture-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: orderId,
            userId:  localStorage.getItem("userID"),
            products: cart,
            address:  localStorage.getItem("fullAddress"),
          }),
        }
      );

      const captureData = await captureResponse.json();

      if (captureData.success) {
        toast.success("Siparişiniz başarıyla oluşturuldu!", {
          position: "top-right",
          autoClose: 3000,
        });

        // Sepeti temizle ve kullanıcıyı yönlendir
        clearCart(); // Bu fonksiyonun doğru çalıştığından emin olun
        setTimeout(() => navigate("/"), 3000);
      } else {
        throw new Error("capture-payment API başarısız.");
      }
    } catch (error) {
      // Hata yönetimi
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(error); // Hata detaylarını kontrol edin
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
      </div>

      {/* PayPal ödeme butonu */}
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default Payment;
