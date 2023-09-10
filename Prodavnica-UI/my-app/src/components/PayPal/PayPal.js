import React, { useRef, useEffect, useState, useContext } from "react";
import CartContext from "../../contexts/cart-context";
import { createOrder } from "../../services/PorudzbinaService";
import { useNavigate } from "react-router-dom";

const PayPal = ({ data1, onClose }) => {
  const exceptionRead = (value) => value.split(":")[1].split("at")[0];
  const cartCtx = useContext(CartContext);
  const totalPrice = cartCtx.totalAmount;
  const [payPal, setPaypal] = useState(false);
  const paypal = useRef();
  const navigate = useNavigate();

  const [data, setData] = useState({
    PorudzbinaProizvods: cartCtx.items.map((item) => ({
      ProizvodId: item.id,
      Kolicina: item.amount,
    })),
    Adresa: data1.Adresa,
    Komentar: data1.Komentar,
  });

  data.Adresa = data1.Adresa
  data.Komentar = data1.Komentar

  console.log(data)
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  value: totalPrice.toFixed(2).toString(),
                  currency_code: "USD",
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaypal(true);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  useEffect(() => {
    if (payPal) {
      const payPalOrder = async () => {
        try {
          const response = await createOrder(data);
          onClose();
          cartCtx.clearCart();
        } catch (error) {
          if (error) alert(error.response.data);
          return;
        }
      };
      payPalOrder();
    } else return;
  }, [payPal]);

  return <div ref={paypal}></div>;
};

export default PayPal;