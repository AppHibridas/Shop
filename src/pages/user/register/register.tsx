import "./register.css";

import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonModal,
  IonDatetime,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { FormRegisterComponent } from "./components/form/form";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    photo: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (e: any) => {
    setFormData({ ...formData, birthDate: e.detail.value });
    setShowModal(false);
  };

  const handlePhotoChange = async () => {
    const photo = await takePhoto();
    setFormData({ ...formData, photo });
  };

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    });
    return image.dataUrl!;
  };

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

              <FormRegisterComponent
                formData={formData}
                handleInputChange={handleInputChange}
                handlePhotoChange={handlePhotoChange}
                setShowModal={setShowModal}
              />

              <IonButton expand="full" onClick={() => console.log(formData)}>
                Registrar
              </IonButton>

              <IonModal
                isOpen={showModal}
                onDidDismiss={() => setShowModal(false)}
              >
                <div className="register-page-modal-date">
                  <IonDatetime onIonChange={handleDateChange} />
                </div>
                <IonButton onClick={() => setShowModal(false)}>
                  Cerrar
                </IonButton>
              </IonModal>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
