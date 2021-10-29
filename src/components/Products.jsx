import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, addPrice, subtractPrice } from "../features/orderSlice";
import useFetch from "../hooks/useFetch.js";
import ProductsList from "./ProductsList.jsx";
import { CardStyle } from "./styles/Card.style.js";
import { Form, List } from "./styles/Products.style";

const Products = ({ setStep }) => {
  const dispatch = useDispatch();
  const [selectedProd, setSelectedProd] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSelected, setIsSelected] = useState("blue");
  const [isCurrent, setIsCurrent] = useState(false);
  const { data: products } = useFetch(
    "https://run.mocky.io/v3/b5eb9a17-4e56-4841-bb9a-094cd3fcec96"
  );

  const handleSelect = (e) => {
    console.log("clicked", e.target);
    if (e.target) {
      setIsCurrent(e.target.id)
      dispatch(addPrice(Number(e.target.value)));
      setSelectedProd([...selectedProd, e.target.id]);
      console.log("Product selected");
    } else if (selectedProd.some((val) => val === e.target.id)) {
      console.log("Product UNselected");
      dispatch(subtractPrice(Number(e.target.value)));
      setSelectedProd(selectedProd.filter((val) => val !== e.target.id));
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
        // onChange={(e) => handleSelect(e)}
      >
        <h3>Select product(s)</h3>
        <ul>
          {products?.map(({ id, title, price }) => (
            <ProductsList
              // color={isCurrent === id && isChecked ? "yellow" : ""}
              // bgColor={isCurrent === id ? "black" : ""}
              key={id}
              id={id}
              value={price.amount}
              onClick={(e) => handleSelect(e)}
              // style={isSelected === currentItem ? currentStyle : newStyle}
            >
              {/* <input
                type='checkbox'
                id={id}
                value={price.amount}
                name={id}
                className='checkbox'
              />
              <label htmlFor={id}>
                {title} {price.amount} €
              </label> */}
              {title} {price.amount} €
            </ProductsList>
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

// is stackOverflow
// function YourComponent() {    
//   ...
//   const [currentStyle, setCurrentStyle] = useState();
//       ...
//       array.map(val => (<ItemComponent style={currentStyle}>{val.name}</ItemComponent>)
//   ...
//   }
  
//   function ItemComponent({style, children}) {
//      const [changeStyle, setChangeStyle] = useState(false)
//      return (
//          <li onClick={() => {setChangeStyle(true)}} style={changeStyle ? style : null}>{children}</li>
//       )
//   }