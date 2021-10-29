import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, addPrice, subtractPrice } from "../features/orderSlice";
import useFetch from "../hooks/useFetch.js";
import { CardStyle } from "./styles/Card.style.js";
import { Form, List } from "./styles/Products.style";

const Products = ({ setStep }) => {
  const dispatch = useDispatch();
  const [selectedProd, setSelectedProd] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const { data: products } = useFetch(
    "https://run.mocky.io/v3/b5eb9a17-4e56-4841-bb9a-094cd3fcec96"
  );

  const handleSelect = (e) => {
    if (e.target.checked) {
      dispatch(addPrice(Number(e.target.value)));
      setSelectedProd([...selectedProd, e.target.name]);
    } else if (selectedProd.some((val) => val === e.target.name)) {
      dispatch(subtractPrice(Number(e.target.value)));
      setSelectedProd(selectedProd.filter((val) => val !== e.target.name));
    }
  };

  useEffect(() => {
    if (selectedProd.length) {
      setIsDisabled(true);
    } else if (!selectedProd.length) {
      setIsDisabled(false);
    }
  }, [selectedProd]);

  const handleSubmit = () => {
    dispatch(addProduct(selectedProd));
    setStep(2);
  };

  return (
    <CardStyle>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        onChange={(e) => handleSelect(e)}
      >
        <h3>Select product(s)</h3>
        <ul>
          {products?.map(({ id, title, price }) => (
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
          ))}
        </ul>
        <button type='submit' disabled={!isDisabled}>
          Next
        </button>
      </Form>
    </CardStyle>
  );
};

export default Products;
