import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaxes, applyPrice, applyTaxes } from "../features/orderSlice";
import useFetch from "../hooks/useFetch";
import { CardStyle } from "./styles/Card.style";


const OrderReview = ({ setStep }) => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const { data: products } = useFetch(
    "https://run.mocky.io/v3/b5eb9a17-4e56-4841-bb9a-094cd3fcec96"
  );
  const { data: userIp } = useFetch("http://ipwhois.app/json/");
  const { data: taxes } = useFetch(
    "https://run.mocky.io/v3/fdaf218e-8fb8-4548-92ce-1a505c81d9c8"
  );

  const fetchOrder = (orderPayload) =>
    fetch("https://run.mocky.io/v3/240a6dfa-24d9-41b7-b224-ae870ddfbc95", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    })
      .then((res) => res.json())
      .then((postOrder) => console.log(postOrder));

  useEffect(() => {
    taxes?.filter((taxRate) => {
      if (
        taxRate.countryCode.toLowerCase() === userIp?.country_code.toLowerCase()
      ) {
        dispatch(
          addTaxes({
            countryCode: taxRate.countryCode.toUpperCase(),
            rate: taxRate.rate,
          })
        );
        dispatch(applyTaxes(order.price.netTotal));
        dispatch(applyPrice());
      }
    });
  }, [taxes, userIp]);

  const handleComplete = () => {
    fetchOrder().then(setStep(4));
  };

  return (
    <CardStyle>
      <div>
        <h3>Order Review</h3>
        <div className='products-cont'>
          <h4>Products</h4>
          <ul>
            {products
              ?.filter((prod) => order.products.includes(prod.id))
              .map(({ id, title, price }) => (
                <li key={id}>
                  {title} {price.amount} €
                </li>
              ))}
          </ul>
        </div>

        <div className='contact-cont'>
          <h4>Contact</h4>
          <div>
            <label htmlFor='name'>Name </label>
            <span id='name'>
              {order.contacts.firstName} {order.contacts.lastName}
            </span>
          </div>
        </div>

        <div className='price-cont'>
          <h4>Price</h4>
          <div>
            <label htmlFor='products'>Products </label>
            <span id='products'>{order.price.netTotal.toFixed(2)} €</span>
          </div>
          <div>
            <label htmlFor='taxes'>Taxes </label>
            <span id='taxes'>{order.price.taxes.toFixed(2)} €</span>
          </div>
        </div>

        <div className='total-cont'>
          <h4>Total</h4>
          <div>
            <label htmlFor='total'>Taxes </label>
            <span id='total'>{order.price.grossTotal.toFixed(2)} €</span>
          </div>
        </div>

        <button onClick={handleComplete}>Next</button>
      </div>
    </CardStyle>
  );
};

export default OrderReview;
