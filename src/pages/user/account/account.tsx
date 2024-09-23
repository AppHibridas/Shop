import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  useIonViewWillLeave,
} from "@ionic/react";

import { AccountComponent } from "./components/card/card";

const Account: React.FC = () => {
  useIonViewWillLeave(() => {
    console.info("Componente Account desmontado");
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid className="ion-height-100 ion-align-items-center ion-justify-content-center">
          <IonRow className="ion-justify-content-center">
            <IonCol
              size="12"
              size-md="8"
              size-lg="8"
              offset-md="2"
              offset-lg="2"
            >
              <IonText>
                <h2>¡Bienvenido!</h2>
              </IonText>

              <AccountComponent />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Account;
