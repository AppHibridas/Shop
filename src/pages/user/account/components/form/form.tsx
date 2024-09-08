import { useUserStore } from "@/store/auth/use-store";
import "./form.css";
import {
  IonButton,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

export const FormAcountComponent = (props: {
  formData: any;
  handleInputChange: (e: any) => void;
  handlePhotoChange: () => void;
  setShowModal: (value: boolean) => void; // Fixed the missing closing parenthesis and added the return type
}) => {
  const className = "form-account";

  const { formData, handleInputChange, handlePhotoChange, setShowModal } =
    props;
  return (
    <>
      <IonItem>
        <IonLabel position="floating">Nombre</IonLabel>
        <IonInput
          name="firstName"
          value={formData.firstName}
          onIonChange={handleInputChange}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Apellido</IonLabel>
        <IonInput
          name="lastName"
          value={formData.lastName}
          onIonChange={handleInputChange}
        />
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
        <IonButton onClick={handlePhotoChange}>Subir Foto</IonButton>
        {formData.photo && (
          <IonImg className={`${className}-img-temp`} src={formData.photo} />
        )}
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
      <IonItem>
        <IonLabel position="floating">Contraseña</IonLabel>
        <IonInput
          name="password"
          type="password"
          value={formData.password}
          onIonChange={handleInputChange}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Confirmar Contraseña</IonLabel>
        <IonInput
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onIonChange={handleInputChange}
        />
      </IonItem> */}
    </>
  );
};
