import "./register.css";

import React, { useEffect, useState } from "react";
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
import { Redirect } from "react-router";
import { TypesCreateUser, useCreateUserQuery } from "@/services/auth/register";
import { validatePassword } from "./helpers/validate-password";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<
    TypesCreateUser & { shouldFetch: boolean }
  >({
    firstName: "",
    lastName: "",
    birthDate: "",
    photo: "",
    gender: null,
    email: "",
    password: "",
    confirmPassword: "",
    shouldFetch: false,
  });

  const [showModal, setShowModal] = useState(false);
  const [showMssError, setShowMssError] = useState(false);
  const [mssError, setMssError] = useState<string | null | undefined>("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const { data, error, refetch } = useCreateUserQuery(formData);

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
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      setMssError("Todos los campos son obligatorios");
      setShowMssError(true);
      formData.shouldFetch = false;
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMssError("Las contraseñas no coinciden");
      setShowMssError(true);
      formData.shouldFetch = false;
      return;
    }

    if (validatePassword(formData.password) === false) {
      setMssError(
        "La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una letra minúscula y un número"
      );
      setShowMssError(true);
      formData.shouldFetch = false;
      return;
    }

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(formData.email)) {
      setMssError("El correo no es válido");
      setShowMssError(true);
      formData.shouldFetch = false;
      return;
    }

    setFormData({ ...formData, shouldFetch: true });
    refetch();
  };

  useEffect(() => {
    if (data) {
      if (data?.isCreated) {
        alert("Usuario creado correctamente");
        setRedirectToLogin(true);
      }
    }

    if (error || !data?.isCreated) {
      setMssError(data?.error);
      setShowMssError(true);
      setTimeout(() => {
        setShowMssError(false);
      }, 5000);
    }
  }, [data, error]);

  useIonViewWillLeave(() => {
    console.info("Componente Register desmontado");
  });

  if (redirectToLogin) {
    return <Redirect to="/login" />;
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
                  <IonDatetime
                    onIonChange={handleDateChange}
                    min="1920-01-01"
                    max="2020-12-31"
                  />
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
