import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, addPrice, subtractPrice } from "../features/orderSlice";
import useFetch from "../hooks/useFetch.js";
import ProductsList from "./ProductsList.jsx";
import { CardStyle } from "./styles/Card.style.js";
import { Form } from "./styles/Products.style";

const Products = ({ setStep }) => {
  const dispatch = useDispatch();
  const [selectedProd, setSelectedProd] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSelected, setIsSelected] = useState("blue");
  const [isCurrent, setIsCurrent] = useState(false);

  const [currentStyle, setCurrentStyle] = useState();

  const [clickedItems, setClickedItems] = useState([]);

  const { data: products } = useFetch(
    "https://run.mocky.io/v3/b5eb9a17-4e56-4841-bb9a-094cd3fcec96"
  );

  const handleSelect = (e) => {
    console.log("clicked", e.target);
    if (e.targe) {
      setIsCurrent(e.target.id);
      dispatch(addPrice(Number(e.target.value)));
      setSelectedProd([...selectedProd, e.target.id]);
      console.log("Product selected");
    } else if (selectedProd.some((val) => val === e.target.id)) {
      console.log("Product UNselected");
      dispatch(subtractPrice(Number(e.target.value)));
      setSelectedProd(selectedProd.filter((val) => val !== e.target.id));
    }
  };

  console.log(clickedItems)

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
        // onChange={(e) => handleSelect(e)}
      >
        <h3>Select product(s)</h3>
        <ul>
          {products?.map(({ id, title, price }, index) => (
            <li
              key={id}
              onClick={() =>
                setClickedItems(
                  clickedItems.find((item) => item === index)
                    ? clickedItems
                    : [...clickedItems, index + 1]
                )
              }
              style={
                clickedItems.find((i) => i === index) ? currentStyle : null
              }
            >
              {index}
            </li>
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

// const [currentStyle, setCurrentStyle] = useState();
// const [clickedItems, setClickedItems] = useState([]);

// array.map((val, index) => (
//     <li
//       onClick={() =>
//       setClickedItems(clickedItems.find(item => item===index) ? clickedItems : [...clickedItems, index])}
//       style={clickedItems.find(i => i===index) ? currentStyle : null}
//     >
//       {val.name}
//     </li>
// )
