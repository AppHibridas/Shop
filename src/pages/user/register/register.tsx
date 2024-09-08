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
  IonLabel,
  useIonViewWillLeave,
} from "@ionic/react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { FormRegisterComponent } from "./components/form/form";
import { useUserStore } from "@/store/auth/use-store";
import { Redirect } from "react-router";

const Register: React.FC = () => {
  const setUser = useUserStore((state) => state.setUser);

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
  const [showMssError, setShowMssError] = useState(false);
  const [mssError, setMssError] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

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

  const handleRegister = () => {
    if (
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.birthDate === "" ||
      formData.photo === "" ||
      formData.gender === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      setMssError("Todos los campos son obligatorios");
      setShowMssError(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMssError("Las contraseñas no coinciden");
      setShowMssError(true);
      return;
    }

    setUser({
      access_token: "dummy_access_token",
      csrf_token: "dummy_csrf_token",
      logout_token: "dummy_logout_token",
      current_user: {
        uid: "dummy_uid",
        name: formData.firstName,
        lastName: formData.lastName,
      },
    });

    setRedirectToHome(true);
  };

  useIonViewWillLeave(() => {
    console.log("Componente Register desmontado");
  });

  if (redirectToHome) {
    return <Redirect to="/home" />;
  }

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

              {showMssError && (
                <IonLabel className="ion-text-center">
                  <p className="error-message">{mssError}</p>
                </IonLabel>
              )}

              <IonLabel className="ion-text-center">
                <p>
                  Al hacer clic en "Registrar", aceptas nuestros Términos y
                  Política de privacidad.
                </p>
              </IonLabel>
              <IonButton expand="full" onClick={handleRegister}>
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
