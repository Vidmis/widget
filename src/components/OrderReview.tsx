import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addTaxes,
  applyPrice,
  applyTaxes,
  addNetTotal,
} from "../features/orderSlice";
import useFetch from "../hooks/useFetch";
import useNavigation from "../hooks/useNavigation";
import Card from "./styles/CardUi/Card";

const OrderReview = () => {
  const [netTotal, setNetTotal] = useState(0);
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state);
  const { onNextStep, onPrevStep } = useNavigation();
  const { data: products } = useFetch(
    "https://run.mocky.io/v3/b5eb9a17-4e56-4841-bb9a-094cd3fcec96"
  );
  const { data: userIp } = useFetch("http://ipwhois.app/json/");
  const { data: taxes } = useFetch(
    "https://run.mocky.io/v3/fdaf218e-8fb8-4548-92ce-1a505c81d9c8"
  );

  const fetchOrder = (orderPayload: Object) =>
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

  const productsPrice = () => {
    const sumPrice = products
      ?.filter((prod) => order?.products.includes(prod.id))
      .map((prod) => prod.price.amount);

    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;

    setNetTotal(sumPrice?.reduce(reducer));
  };

  useEffect(() => {
    productsPrice();
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
        dispatch(addNetTotal(netTotal));
        dispatch(applyTaxes(netTotal));
        dispatch(applyPrice(userIp?.currency_code));
      }
    });
  }, [userIp]);

  const handleComplete = () => {
    fetchOrder(order).then(onNextStep);
  };

  return (
    <Card>
      <div>
        <h3>Order Review</h3>
        <div className='products-cont'>
          <h4>Products</h4>
          <ul>
            {products
              ?.filter((prod) => order?.products.includes(prod.id))
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
              {order?.contacts.firstName} {order?.contacts.lastName}
            </span>
          </div>
        </div>

        <div className='price-cont'>
          <h4>Price</h4>
          <div>
            <label htmlFor='products'>Products </label>
            <span id='products'>{netTotal?.toFixed(2)} €</span>
          </div>
          <div>
            <label htmlFor='taxes'>Taxes </label>
            <span id='taxes'>{order?.price.taxes.toFixed(2)} €</span>
          </div>
        </div>

        <div className='total-cont'>
          <h4>Total</h4>
          <div>
            <label htmlFor='total'>Taxes </label>
            <span id='total'>{order?.price.grossTotal.toFixed(2)} €</span>
          </div>
        </div>

        <button type='button' onClick={onPrevStep}>
          Back
        </button>
        <button type='button' onClick={handleComplete}>
          Next
        </button>
      </div>
    </Card>
  );
};

export default OrderReview;
