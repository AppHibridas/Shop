import { useCartStore } from "@/store/cart/use-store-cart";
import { generateGUID } from "@/utils/generate-guid";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonThumbnail,
} from "@ionic/react";
import { useEffect, useState } from "react";

const Payment: React.FC = () => {
  const cart = useCartStore((state) => state.cart);
  const orderNumber = generateGUID();

  const [showBtnPrint, setShowBtnPrint] = useState(true);

  const printPayment = () => {
    setShowBtnPrint(false);

    setTimeout(() => {
      window.print();
    }, 1000);
  };

  useEffect(() => {
    const handleAfterPrint = () => {
      setShowBtnPrint(true);
    };
    window.addEventListener("afterprint", handleAfterPrint);
    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  return (
    <IonPage>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Payment</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>ID orden</IonLabel>
                <IonLabel>{orderNumber}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Productos</IonLabel>
              </IonItem>
              {cart?.map((product) => (
                <IonItem key={product.id}>
                  <IonThumbnail slot="start">
                    <img src={product.image} alt={product.products} />
                  </IonThumbnail>
                  <IonLabel>{product.products}</IonLabel>
                  <IonLabel>Cantidad. {product.quantity}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>

          {showBtnPrint && (
            <IonCardContent>
              <IonButton onClick={printPayment}>Imprimir</IonButton>
            </IonCardContent>
          )}
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Payment;
