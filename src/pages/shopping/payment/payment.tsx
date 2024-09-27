import {
  TypesCreateProduct,
  useShopProducts,
} from "@/services/products/shop-products";
import { useUserStore } from "@/store/auth/use-store";
import { TypesCartStore, useCartStore } from "@/store/cart/use-store-cart";
import { generateGUID } from "@/utils/generate-guid";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonButton,
  IonLoading,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";

const Payment: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const orderNumber = generateGUID();

  const [showBtnPrint, setShowBtnPrint] = useState(true);
  const [isErrorShop, setIsErrorShop] = useState(false);
  const [showDetailsOrder, setShowDetailsOrder] = useState(false);
  const [redirectDetails, setRedirectDetails] = useState(false);

  const { data, isLoading, refetch } = useShopProducts({
    uid: user?.current_user?.uid as number,
    uuid: orderNumber,
    productos: cart?.map((product) => ({
      nid: product.id,
      stock: product.quantity.toString(),
    })),
  } as TypesCreateProduct);

  useEffect(() => {
    console.log("data", data);
    console.log("isLoading", isLoading);
    if (!isLoading) {
      if (data?.error) {
        setIsErrorShop(true);
      }

      if (data?.status === "success") {
        setIsErrorShop(false);
        setShowDetailsOrder(true);
        clearCart();
        setRedirectDetails(true);
      } else {
        setIsErrorShop(true);
      }
    }
  }, [data, isLoading]);

  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (redirectDetails) {
    return <Redirect to={`/details/${orderNumber}`} />;
  }

  return (
    <IonPage>
      <IonContent>
        {isLoading && (
          <div>
            <IonLoading isOpen={true} message="Cargando..." />
          </div>
        )}

        {isErrorShop && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Error</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel>Error al finalizar la orden</IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Payment;
