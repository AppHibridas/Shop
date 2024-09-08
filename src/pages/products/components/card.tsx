import "./card.css";
import React, { useState, useEffect } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonContent,
} from "@ionic/react";
import { TypesProduct } from "../types";
import { validateFileExist } from "../../../utils/validate-file-exist";
import { c } from "vitest/dist/reporters-5f784f42";
import { cartOutline } from "ionicons/icons";
import { useUserStore } from "../../../store/auth/use-store";
import { decodeHtmlEntities } from "../helpers/decode-html";
import imageDefault from "../../../assets/img/noimage.jpg";

const ProductsCard: React.FC<
  TypesProduct & {
    className: string;
    key: number;
  }
> = (props) => {
  const { className, key, title, image, tags, body } = props;

  const user = useUserStore()?.user;
  const access_token = user?.access_token;

  const [imageExist, setImageExist] = useState(false);

  useEffect(() => {
    const checkImage = async () => {
      const imageExist = await validateFileExist(image);
      setImageExist(imageExist);
    };
    checkImage();
  }, [image]);

  const handleAddToCart = () => {
    console.log("Producto agregado al carrito:", title);
  };

  return (
    <IonCard key={key} className="ion-card">
      <IonCardHeader>
        <img
          className={className + "-img"}
          src={`${imageExist ? image : imageDefault}`}
          alt={`${title}`}
        />
        {tags && <IonCardSubtitle> {tags}</IonCardSubtitle>}
        <IonCardTitle>{decodeHtmlEntities(title)}</IonCardTitle>
      </IonCardHeader>
      {/* {body && <IonCardContent>{body}</IonCardContent>} */}

      {access_token && (
        <IonButton
          fill="clear"
          className="add-to-cart-button"
          onClick={handleAddToCart}
        >
          <IonIcon icon={cartOutline} />
        </IonButton>
      )}
    </IonCard>
  );
};

export default ProductsCard;
