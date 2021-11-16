import React, { useEffect, useState } from "react";
import { addProduct } from "../features/orderSlice";
import Card from "./styles/CardUi/Card.js";
import styles from "./Products.module.scss";
import useNavigation from "../hooks/useNavigation";
import { useAppDispatch } from "../app/hooks";
import httpService from "../httpService/httpService";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [selectedProd, setSelectedProd] = useState<Array<string>>([]);
  const [products, setProducts] = useState(null);
  const { onNextStep } = useNavigation();

  useEffect(() => {
    httpService
      .get("https://run.mocky.io/v3/b5eb9a17-4e56-4841-bb9a-094cd3fcec96")
      .then((res) => setProducts(res.data));
  }, []);

  const handleSelect = (id: string) => {
    if (selectedProd.includes(id)) {
      setSelectedProd(selectedProd.filter((item) => item !== id));
    } else {
      setSelectedProd([...selectedProd, id]);
    }
  };

  const handleSumbit = () => {
    dispatch(addProduct(selectedProd));
    onNextStep();
  };

  return (
    <Card>
      <form className={styles.form_content} onSubmit={handleSumbit}>
        <h3>{t("products.select_header")}</h3>
        <ul>
          {products?.map(({ id, title, price }) => (
            <li
              key={id}
              onClick={() => handleSelect(id)}
              style={
                selectedProd.includes(id) ? { background: "purple" } : null
              }
            >
              {title} - {price.amount} €
            </li>
          ))}
        </ul>
        <button type='submit'>{t("products.next_button")}</button>
      </form>
    </Card>
  );
};

export default Products;
