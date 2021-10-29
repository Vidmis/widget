import React, { useState } from "react";
import { List } from "./styles/Products.style";

const ProductsList = () => {
  const [isCurrent, setIsCurrent] = useState(false);

  return (
    <List
      onClick={() => {
        setIsCurrent(true);
      }}
      color={isCurrent ? "yellow" : ""}
      bgColor={isCurrent ? "black" : ""}
    >
      <p>Value</p>
    </List>
  );
};

export default ProductsList;
