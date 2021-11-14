import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addPrice, addTaxes } from "../features/orderSlice";
import useFetch from "../hooks/useFetch";
import useNavigation from "../hooks/useNavigation";
import Card from "./styles/CardUi/Card";

interface PriceSummary {
  netTotal: number;
  taxes: number;
  grossTotal: number;
  currency: string;
}

interface ITax {
  countryCode: string;
  rate: number;
}

const OrderReview = () => {
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const dispatch = useAppDispatch();
  const [taxInfo, setTaxInfo] = useState<ITax>({ countryCode: "", rate: 0 });
  const { order } = useAppSelector((state) => state);
  const { onNextStep, onPrevStep } = useNavigation();
  const { data: products } = useFetch(
    "https://run.mocky.io/v3/b5eb9a17-4e56-4841-bb9a-094cd3fcec96"
  );
  const { data: userIp } = useFetch("http://ipwhois.app/json/");
  const { data: taxes } = useFetch(
    "https://run.mocky.io/v3/fdaf218e-8fb8-4548-92ce-1a505c81d9c8"
  );

  const productsPrice = () => {
    const sumPrice = products
      ?.filter((prod) => order?.products.includes(prod.id))
      .map((prod) => prod.price.amount);
    if (sumPrice?.length > 0) {
      return sumPrice?.reduce(reducer);
    }
  };

  const total: number = productsPrice();
  const priceSummary: PriceSummary = {
    netTotal: total,
    taxes: (total * taxInfo?.rate) / 100,
    grossTotal: total + (total * taxInfo?.rate) / 100,
    currency: userIp?.currency_code,
  };

  useEffect(() => {
    taxes?.find((taxRate) => {
      if (
        taxRate.countryCode
          .toLowerCase()
          .includes(userIp?.country_code.toLowerCase())
      ) {
        setTaxInfo({
          countryCode: taxRate.countryCode.toUpperCase(),
          rate: taxRate.rate,
        });
      }
    });
  }, [userIp, taxes]);

  const handleClick = () => {
    dispatch(addTaxes(taxInfo));
    dispatch(addPrice(priceSummary));
    onNextStep();
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
            <span id='products'>{priceSummary.netTotal?.toFixed(2)} €</span>
          </div>
          <div>
            <label htmlFor='taxes'>Taxes </label>
            <span id='taxes'>{priceSummary.taxes.toFixed(2)} €</span>
          </div>
        </div>

        <div className='total-cont'>
          <h4>Total</h4>
          <div>
            <label htmlFor='total'>Taxes </label>
            <span id='total'>{priceSummary.grossTotal.toFixed(2)} €</span>
          </div>
        </div>

        <button type='button' onClick={onPrevStep}>
          Back
        </button>
        <button type='button' onClick={handleClick}>
          Next
        </button>
      </div>
    </Card>
  );
};

export default OrderReview;
