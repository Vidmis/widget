import React, { useState } from "react";
import { Anchor } from "./styles/Products.style";

const ProductsList = ({children}) => {
  const [isCurrent, setIsCurrent] = useState(false);

  return (
    <Anchor
      onClick={() => {
        isCurrent ? setIsCurrent(false) : setIsCurrent(true);
      }}
      color={isCurrent ? "yellow" : ""}
      bgColor={isCurrent ? "black" : ""}
    >
      {children}
    </Anchor>
  );
};

export default ProductsList;
