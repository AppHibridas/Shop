import { useUserStore } from "@/store/auth/use-store";
import "./card.css";
import {
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

export const AcountComponent = () => {
  const className = "account-info";
  const user = useUserStore()?.user?.current_user;

  return (
    <div className={className}>
      <IonItem>
        <IonLabel>Foto</IonLabel>
        {user?.picture && (
          <IonImg className={`${className}-img`} src={user?.picture} />
        )}
      </IonItem>
      <IonItem>
        <IonLabel>Nombre</IonLabel>
        <IonLabel>{user?.name}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Apellido</IonLabel>
        <IonLabel>{user?.last_name}</IonLabel>
      </IonItem>
      {/*
      <IonItem>
        <IonLabel position="floating">Fecha de Nacimiento</IonLabel>
        <IonInput
          name="birthDate"
          value={formData.birthDate}
          onIonFocus={() => setShowModal(true)}
        />
      </IonItem>
     
      <IonItem>
        <IonLabel position="floating">Género</IonLabel>
        <IonSelect
          name="gender"
          value={formData.gender}
          onIonChange={handleInputChange}
        >
          <IonSelectOption value="male">Masculino</IonSelectOption>
          <IonSelectOption value="female">Femenino</IonSelectOption>
          <IonSelectOption value="other">Otro</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Correo</IonLabel>
        <IonInput
          name="email"
          type="email"
          value={formData.email}
          onIonChange={handleInputChange}
        />
      </IonItem>
       */}
    </div>
  );
};
