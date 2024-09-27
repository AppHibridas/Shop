import {
  TypesOrders,
  useGetOrdersDetails,
} from "@/services/orders/get-details";
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
  IonThumbnail,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

type DetailOrderProps = {
  guid: string;
};

const DetailOrder: React.FC = () => {
  const { guid } = useParams<{ guid: string }>();

  const [showDetailsOrder, setShowDetailsOrder] = useState(false);
  const [showBtnPrint, setShowBtnPrint] = useState(true);
  const [orderDetails, setOrderDetails] = useState<TypesOrders["order"]>(
    {} as TypesOrders["order"]
  );

  const { data, isLoading } = useGetOrdersDetails(guid);

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

  useEffect(() => {
    if (data?.order) {
      setOrderDetails(data.order);
      setShowDetailsOrder(true);
    }
  }, [data]);

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
              <IonCardTitle>Payment</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel>ID orden</IonLabel>
                  <IonLabel>{orderDetails.uuid}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Productos</IonLabel>
                </IonItem>
                {orderDetails.productos?.map((product, index) => (
                  <IonItem key={index}>
                    <IonThumbnail slot="start">
                      <img
                        src={product.producto.field_image}
                        alt={product.producto.title}
                      />
                    </IonThumbnail>
                    <IonLabel>{product.producto.title}</IonLabel>
                    <IonLabel>Cantidad. {product.stock}</IonLabel>
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
        )}
      </IonContent>
    </IonPage>
  );
};

export default DetailOrder;
