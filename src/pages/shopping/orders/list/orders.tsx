import { useGetOrders } from "@/services/orders/get-orders";
import { useUserStore } from "@/store/auth/use-store";
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
  IonLoading,
  IonPage,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";

const Orders: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const [showDetailsOrder, setShowDetailsOrder] = useState(false);
  const [redirectDetails, setRedirectDetails] = useState(false);
  const [guid, setGuid] = useState("");

  const { data, isLoading } = useGetOrders(user?.current_user.uid as number);

  useEffect(() => {
    if (data?.orders) {
      console.log(data.orders);
      setShowDetailsOrder(true);
    }
  }, [data]);

  if (redirectDetails) {
    return <Redirect to={`/details/${guid}`} />;
  }

  return (
    <IonPage>
      <IonContent>
        {isLoading && (
          <div>
            <IonLoading isOpen={true} message="Cargando..." />
          </div>
        )}

        {showDetailsOrder && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Ordenes finalizadas</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {data?.orders.map((order) => (
                  <IonItem key={order.id_orden}>
                    <IonLabel>ID orden</IonLabel>
                    <IonLabel>{order.id_orden}</IonLabel>
                    <IonButton
                      onClick={() => {
                        setGuid(order.id_orden);
                        setRedirectDetails(true);
                      }}
                    >
                      Ver detalles
                    </IonButton>
                  </IonItem>
                ))}
              </IonList>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Orders;
