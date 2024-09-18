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

  const handleImageError: React.ReactEventHandler<HTMLImageElement> = (
    event
  ) => {
    event.currentTarget.src = imageDefault;
  };

  const handleAddToCart = () => {
    console.log("Producto agregado al carrito:", title);
  };

  return (
    <IonCard key={key} className="ion-card">
      <IonCardHeader>
        <img
          className={className + "-img"}
          src={image}
          alt={title}
          onError={handleImageError}
          role="presentation"
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
