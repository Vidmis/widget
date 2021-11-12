import React, { useState } from "react";
import { addProduct } from "../features/orderSlice";
import useFetch from "../hooks/useFetch";
import Card from "./styles/CardUi/Card.js";
import styles from "./Products.module.scss";
import useNavigation from "../hooks/useNavigation";
import { useAppDispatch } from "../app/hooks";

const Products = () => {
  const dispatch = useAppDispatch();
  const [selectedProd, setSelectedProd] = useState<Array<string>>([]);
  const { onNextStep, selectStep } = useNavigation();

  const { data: products } = useFetch(
    "https://run.mocky.io/v3/b5eb9a17-4e56-4841-bb9a-094cd3fcec96"
  );

  const handleSelect = (id: string) => {
    if (selectedProd.includes(id)) {
      setSelectedProd(selectedProd.filter((item) => item !== id))
    } else {
      setSelectedProd([...selectedProd, id])
    }
  };

  const handleSumbit = () => {
    dispatch(addProduct(selectedProd));
    onNextStep();
  }

  return (
    <Card>
      <form className={styles.form_content} onSubmit={handleSumbit}>
        <h3>Select product(s)</h3>
        <ul>
          {products?.map(({ id, title, price }) => (
            <li
              key={id}
              onClick={() => handleSelect(id)}
              style={
                selectedProd.includes(id)
                  ? { background: "purple" }
                  : null
              }
            >
              {title} - {price.amount} €
            </li>
          ))}
        </ul>
        <button type='submit'>Next</button>
      </form>
    </Card>
  );
};

export default Products;
