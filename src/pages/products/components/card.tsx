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
  IonModal,
} from "@ionic/react";
import { TypesProduct } from "../types";
import { cartOutline, information } from "ionicons/icons";
import { useUserStore } from "../../../store/auth/use-store";
import { decodeHtmlEntities } from "../helpers/decode-html";
import imageDefault from "../../../assets/img/noimage.jpg";
import { useAddProductCart } from "../helpers/add-product-cart";

const ProductsCard: React.FC<
  TypesProduct & {
    className: string;
    idProduct: string;
  }
> = (props) => {
  const { className, idProduct, title, image, tags, body } = props;

  const user = useUserStore()?.user;
  const access_token = user?.access_token;

  const [showMdlInfo, setShowMdlInfo] = useState(false);

  const addProductCart = useAddProductCart();

  const handleImageError: React.ReactEventHandler<HTMLImageElement> = (
    event
  ) => {
    event.currentTarget.src = imageDefault;
  };

  const handleAddToCart = () => {
    console.info("Producto agregado al carrito:", title);
    addProductCart({
      id: idProduct,
      products: title,
      image: image,
      quantity: 1,
    });
  };

  const handleShowMdlInfo = () => {
    setShowMdlInfo(!showMdlInfo);
  };

  return (
    <IonCard key={idProduct} className="ion-card">
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

      {access_token && (
        <div className="add-to-cart-button">
          <IonButton fill="clear" onClick={handleShowMdlInfo}>
            <IonIcon icon={information} />
          </IonButton>

          <IonButton fill="clear" onClick={handleAddToCart}>
            <IonIcon icon={cartOutline} />
          </IonButton>
        </div>
      )}

      {showMdlInfo && (
        <IonModal
          isOpen={showMdlInfo}
          onDidDismiss={() => setShowMdlInfo(false)}
          className="custom-modal"
        >
          <IonCard className="full-height-card">
            <IonCardHeader>
              <IonCardTitle>{decodeHtmlEntities(title)}</IonCardTitle>
              <IonCardSubtitle>{tags}</IonCardSubtitle>
            </IonCardHeader>
            <img
              className={className + "-img"}
              src={image}
              alt={title}
              onError={handleImageError}
              role="presentation"
            />
            <IonCardContent>{decodeHtmlEntities(body)}</IonCardContent>
            <IonButton onClick={handleShowMdlInfo}>Cerrar</IonButton>
          </IonCard>
        </IonModal>
      )}
    </IonCard>
  );
};

export default ProductsCard;
