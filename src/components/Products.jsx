import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../ui/Card.jsx";
import { addProduct } from "../features/productsSlice";
import useFetch from "../hooks/useFetch.js";

const Products = ({ setStep }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.value);
  const [selectedProd, setSelectedProd] = useState([]);
  const { data: productsData } = useFetch(
    "https://run.mocky.io/v3/b5eb9a17-4e56-4841-bb9a-094cd3fcec96"
  );

  const handleSelect = (e) => {
    if (e.target.checked) {

      /// Cia reikia dispachint ir paselektintu produktu kaina ir ja sudeti i bendra
      
      // dispatch(increment(e.target.value));
      setSelectedProd([...selectedProd, e.target.id]);
    } else if (selectedProd.some((val) => val === e.target.id)) {
      setSelectedProd(selectedProd.filter((val) => val !== e.target.id));
    }
  };

  const handleSubmit = () => {
    dispatch(addProduct(selectedProd));
    setStep(2);
    console.log("Selected products: ", products);
  };

  return (
    <Card>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          onChange={(e) => handleSelect(e)}
        >
          <h3>Select product(s)</h3>
          <ul>
            {productsData?.map((product) => (
              <li key={product.id}>
                <input
                  type='checkbox'
                  id={product.id}
                  value={product.price.amount}
                  name={product.title}
                  className='checkbox'
                />
                <label htmlFor={product.id}>
                  {product.title} {product.price.amount} €
                </label>
              </li>
            ))}
          </ul>
          <button type='submit'>Next</button>
        </form>
      </div>
    </Card>
  );
};

export default Products;
