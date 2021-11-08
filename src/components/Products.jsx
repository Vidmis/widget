import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, addPrice, subtractPrice } from "../features/orderSlice";
import useFetch from "../hooks/useFetch.js";
<<<<<<< HEAD
import { CardStyle } from "./styles/Card.style.js";
import { Form, List } from "./styles/Products.style";
=======
import Card from "./styles/CardUi/Card.js";
import styles from "./Products.module.scss";
>>>>>>> prodBuild

const Products = ({ setStep }) => {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
<<<<<<< HEAD
=======
  const [clickedItems, setClickedItems] = useState([]);
>>>>>>> prodBuild
  const { data: products } = useFetch(
    "https://run.mocky.io/v3/b5eb9a17-4e56-4841-bb9a-094cd3fcec96"
  );

<<<<<<< HEAD
  const handleSelect = (e) => {
    if (e.target.checked) {
      dispatch(addPrice(Number(e.target.value)));
      setSelectedProd([...selectedProd, e.target.name]);
    } else if (selectedProd.some((val) => val === e.target.name)) {
      dispatch(subtractPrice(Number(e.target.value)));
      setSelectedProd(selectedProd.filter((val) => val !== e.target.name));
=======
  const handleSelect = (id, price) => {
    if (clickedItems.find((item) => item === id)) {
      dispatch(subtractPrice(Number(price)));
      setClickedItems(clickedItems.filter((item) => item !== id));
    } else {
      dispatch(addPrice(Number(price)));
      setClickedItems([...clickedItems, id]);
>>>>>>> prodBuild
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
<<<<<<< HEAD
        onChange={(e) => handleSelect(e)}
=======
>>>>>>> prodBuild
      >
        <h3>Select product(s)</h3>
        <ul>
          {products?.map(({ id, title, price }) => (
<<<<<<< HEAD
            <List key={id}>
              <input
                type='checkbox'
                id={id}
                value={price.amount}
                name={id}
                className='checkbox'
              />
              <label htmlFor={id}>
                {title} {price.amount} €
              </label>
            </List>
=======
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
>>>>>>> prodBuild
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
