import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, addPrice, subtractPrice } from "../features/orderSlice";
import useFetch from "../hooks/useFetch.js";
import Card from "./styles/CardUi/Card.js";
import styles from "./Products.module.scss";

const Products = ({ setStep }) => {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const [clickedItems, setClickedItems] = useState([]);
  const { data: products } = useFetch(
    "https://run.mocky.io/v3/b5eb9a17-4e56-4841-bb9a-094cd3fcec96"
  );

  const handleSelect = (id, price) => {
    if (clickedItems.find((item) => item === id)) {
      dispatch(subtractPrice(Number(price)));
      setClickedItems(clickedItems.filter((item) => item !== id));
    } else {
      dispatch(addPrice(Number(price)));
      setClickedItems([...clickedItems, id]);
    }
  };

  useEffect(() => {
    if (clickedItems.length) {
      setIsDisabled(true);
    } else if (!clickedItems.length) {
      setIsDisabled(false);
    }
  }, [clickedItems]);

  const handleSubmit = () => {
    dispatch(addProduct(clickedItems));
    setStep(2);
  };

  return (
    <Card>
      <form
        className={styles.form_content}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h3>Select product(s)</h3>
        <ul>
          {products?.map(({ id, title, price }) => (
            <li
              key={id}
              onClick={() => handleSelect(id, price.amount)}
              style={
                clickedItems.find((clicked) => clicked === id)
                  ? { background: "purple" }
                  : null
              }
            >
              {title} - {price.amount} €
            </li>
          ))}
        </ul>
        <button type='submit' disabled={!isDisabled}>
          Next
        </button>
      </form>
    </Card>
  );
};

export default Products;