import React, { useState, useEffect } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";
import { TypesProduct } from "../types";
import { validateFileExist } from "../../../utils/validate-file-exist";
import { c } from "vitest/dist/reporters-5f784f42";

const ProductsCard: React.FC<
  TypesProduct & {
    className: string;
  }
> = (props) => {
  const imageDefault = "public/products/noimage.jpg";

  const {
    className,
    id,
    titleProduct,
    imageProduct,
    priceProduct,
    contentProduct,
  } = props;

  const [imageExist, setImageExist] = useState(false);
  useEffect(() => {
    const checkImage = async () => {
      const imageExist = await validateFileExist(imageProduct);
      setImageExist(imageExist);
    };

    checkImage();
  }, [imageProduct]);

  return (
    <IonCard key={id}>
      <IonCardHeader>
        <img
          className={className + "-img"}
          src={`${imageExist ? imageProduct : imageDefault}`}
          alt={`${titleProduct}`}
        />
        {priceProduct && <IonCardSubtitle> $. {priceProduct}</IonCardSubtitle>}
        <IonCardTitle>{titleProduct}</IonCardTitle>
      </IonCardHeader>
      {contentProduct && <IonCardContent>{contentProduct}</IonCardContent>}
    </IonCard>
  );
};

export default ProductsCard;
