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

const ProductsCard: React.FC<
  TypesProduct & {
    className: string;
    key: number;
  }
> = (props) => {
  const { className, key, title, image, tags, body } = props;

  const user = useUserStore()?.user;
  const access_token = user?.access_token;

  const [showMdlInfo, setShowMdlInfo] = useState(false);

  const handleImageError: React.ReactEventHandler<HTMLImageElement> = (
    event
  ) => {
    event.currentTarget.src = imageDefault;
  };

  const handleAddToCart = () => {
    console.log("Producto agregado al carrito:", title);
  };

  const handleShowMdlInfo = () => {
    setShowMdlInfo(!showMdlInfo);
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
