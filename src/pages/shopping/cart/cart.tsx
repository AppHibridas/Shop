import { useCartStore } from "@/store/cart/use-store-cart";
import {
  InputChangeEventDetail,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonViewWillLeave,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import { ChangeEvent, useState } from "react";
import { Redirect } from "react-router";

const Cart: React.FC = () => {
  const cart = useCartStore((state) => state.cart);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const updateProduct = useCartStore((state) => state.updateProduct);

  const [showErrorQuantity, setShowErrorQuantity] = useState<boolean>(false);
  const [redirectPayment, setRedirectPayment] = useState<boolean>(false);

  const totalProducts = cart?.length;
  const maxProducts = 10;
  const minProducts = 1;

  const deleteProduct = (index: string) => {
    removeProduct(index);
  };

  const updateQuantity = (index: string, quantity: number) => {
    updateProduct(index, quantity);
  };

  const shoppingCart = () => {
    const productsQuantity = cart?.some((product) => {
      return product.quantity < minProducts || product.quantity > maxProducts;
    });

    if (productsQuantity) {
      setShowErrorQuantity(true);
      return;
    }

    setShowErrorQuantity(false);
    setRedirectPayment(true);
  };

  useIonViewWillLeave(() => {
    console.info("Componente Cart desmontado");
  });

  if (redirectPayment) {
    return <Redirect to="/payment" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Carrito de compras</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {showErrorQuantity && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Error</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonLabel>
                La cantidad de productos individuales no puede ser menor a{" "}
                {minProducts} ni mayor a {maxProducts}
              </IonLabel>
            </IonCardContent>
          </IonCard>
        )}

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Productos seleccionados.</IonCardTitle>
            <IonCardSubtitle>
              <IonList>
                <IonItem>- Este es tu carrito de compras</IonItem>
                <IonItem>
                  - La cantidad de productos individuales no puede ser menor a
                  {minProducts} ni mayor a {maxProducts}
                </IonItem>
              </IonList>
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {cart?.map((product, index) => (
                <IonItem key={index}>
                  <IonLabel onClick={() => deleteProduct(product.id)}>
                    <IonIcon icon={trash} />
                  </IonLabel>
                  <IonThumbnail slot="start">
                    <img alt={product.products} src={product.image} />
                  </IonThumbnail>
                  <IonLabel>{product.products}</IonLabel>
                  <IonItem>
                    <IonInput
                      label="Cantidad"
                      type="number"
                      placeholder="00"
                      step="1"
                      value={product?.quantity || 0}
                      onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
                        updateQuantity(
                          product.id,
                          parseInt(e.detail.value!, 10)
                        )
                      }
                      minlength={minProducts}
                      maxlength={maxProducts}
                      pattern="^[0-9]*$"
                    ></IonInput>
                  </IonItem>
                </IonItem>
              )) || <IonLabel>No hay productos en el carrito</IonLabel>}
            </IonList>
          </IonCardContent>
        </IonCard>

        {totalProducts && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Terminar Compra</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonButton onClick={shoppingCart}>Comprar</IonButton>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Cart;
