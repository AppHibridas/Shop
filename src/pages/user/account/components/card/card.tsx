import "./card.css";

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
} from "@ionic/react";

import { getGender } from "../../helpers/gender";
import { useUserStore } from "@/store/auth/use-store";

export const AccountComponent = () => {
  const className = "account-info";
  const user = useUserStore()?.user?.current_user;

  const formattedBirthDate = user?.birth_date
    ? new Date(user.birth_date).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <IonCard className={className}>
      <IonCardHeader>
        <IonCardTitle>Perfil de Usuario</IonCardTitle>
        <IonCardSubtitle>Información Personal</IonCardSubtitle>
      </IonCardHeader>
      <IonGrid>
        <IonRow>
          <IonCol>
            {user?.picture && (
              <IonImg className={`account-info-img`} src={user?.picture} />
            )}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size-sm="12" size-md="6">
            <IonText className="label">Nombre</IonText>
          </IonCol>
          <IonCol size-sm="12" size-md="6">
            <IonText className="responsive-text">{user?.full_name}</IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size-sm="12" size-md="6">
            <IonText className="label">Apellido</IonText>
          </IonCol>
          <IonCol size-sm="12" size-md="6">
            <IonText className="responsive-text">{user?.last_name}</IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size-sm="12" size-md="6">
            <IonText className="label">Fecha de Nacimiento</IonText>
          </IonCol>
          <IonCol size-sm="12" size-md="6">
            <IonText className="responsive-text">{formattedBirthDate}</IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size-sm="12" size-md="6">
            <IonText className="label">Género</IonText>
          </IonCol>
          <IonCol size-sm="12" size-md="6">
            <IonText className="responsive-text">
              {getGender(user?.gender)}
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size-sm="12" size-md="6">
            <IonText className="label">Usuario</IonText>
          </IonCol>
          <IonCol size-sm="12" size-md="6">
            <IonText className="responsive-text">{user?.name}</IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};
