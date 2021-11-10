import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, addPrice, subtractPrice } from "../features/orderSlice";
import useFetch from "../hooks/useFetch.js";
import Card from "./styles/CardUi/Card.js";
import styles from "./Products.module.scss";
import useNavigation from "../hooks/useNavigation.js";

const Products = () => {
  const dispatch = useDispatch();
  const { onNextStep } = useNavigation();
  const order = useSelector((state) => state.order);

  const { data: products } = useFetch(
    "https://run.mocky.io/v3/b5eb9a17-4e56-4841-bb9a-094cd3fcec96"
  );

  const findProducts = (val) => {
    return order.products.find((item) => item === val);
  };

  const handleSelect = (id, price) => {
    if (findProducts(id)) {
      dispatch(subtractPrice(Number(price)));
      dispatch(addProduct(order.products.filter((item) => item !== id)));
    } else {
      dispatch(addPrice(Number(price)));
      dispatch(addProduct([...order.products, id]));
    }
  };

  return (
    <Card>
      <form className={styles.form_content} onSubmit={onNextStep}>
        <h3>Select product(s)</h3>
        <ul>
          {products?.map(({ id, title, price }) => (
            <li
              key={id}
              onClick={() => handleSelect(id, price.amount)}
              style={
                findProducts(id)
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
