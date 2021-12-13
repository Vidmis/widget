import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addPrice, addTaxes } from "../../features/orderSlice";
import useNavigation from "../../hooks/useNavigation";
import httpService from "../../httpService/httpService";
import Card, { Button } from "../styles/CardUi/Card";
import styles from "./OrderReview.module.scss";

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

  const [products, setProducts] = useState(null);
  const [userIp, setUserIp] = useState(null);
  const [taxes, setTaxes] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    Promise.all([
      httpService.get(
        "https://run.mocky.io/v3/b5eb9a17-4e56-4841-bb9a-094cd3fcec96"
      ),
      httpService.get("http://ipwhois.app/json/"),
      httpService.get(
        "https://run.mocky.io/v3/fdaf218e-8fb8-4548-92ce-1a505c81d9c8"
      ),
    ])
      .then((res) => {
        setProducts(res[0].data);
        setUserIp(res[1].data);
        setTaxes(res[2].data);
      })
      .catch((err) => console.log(err));
  }, []);

  const productsPrice = () => {
    const sumPrice = products
      ?.filter((prod) => order?.products.includes(prod.id))
      .map((prod) => prod.price.amount);
    if (sumPrice?.length > 0) {
      return sumPrice?.reduce(reducer);
    }
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

  const total: number = productsPrice();
  const priceSummary: PriceSummary = {
    netTotal: total,
    taxes: (total * taxInfo?.rate) / 100,
    grossTotal: total + (total * taxInfo?.rate) / 100,
    currency: userIp?.currency_code,
  };

  const handleClick = () => {
    dispatch(addTaxes(taxInfo));
    dispatch(addPrice(priceSummary));
    onNextStep();
  };

  return (
    <Card className={styles.order_card_wrapper}>
      <div className={styles.order_wrapper}>
        <h3>{t("order_review.main_header")}</h3>

        <div className={styles.details_wrapper}>
          <div className={styles.products}>
            <h4>{t("order_review.inner_headers.products")}</h4>
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
            <h4>{t("order_review.inner_headers.contact")}</h4>
            <div>
              <label htmlFor='name'>Name </label>
              <span id='name'>
                {order?.contacts.firstName} {order?.contacts.lastName}
              </span>
            </div>
          </div>

          <div className='price-cont'>
            <h4>{t("order_review.inner_headers.price")}</h4>
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
            <h4>{t("order_review.inner_headers.total")}</h4>
            <div>
              <label htmlFor='total'>Taxes </label>
              <span id='total'>{priceSummary.grossTotal.toFixed(2)} €</span>
            </div>
          </div>
        </div>

        <div className={styles.buttons_wrapper}>
          <Button type='button' onClick={onPrevStep}>
            {t("button.back")}
          </Button>
          <Button type='button' onClick={handleClick}>
            {t("button.next")}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OrderReview;
