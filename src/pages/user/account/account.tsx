import React, { useEffect, useState } from "react";
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
  IonButton,
  IonModal,
  IonDatetime,
  useIonViewWillLeave,
} from "@ionic/react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useUserStore } from "@/store/auth/use-store";
import { FormAcountComponent } from "./components/form/form";

const Account: React.FC = () => {
  const user = useUserStore()?.user?.current_user;
  const [name, setName] = useState(user?.name ?? "");

  const [formData, setFormData] = useState({
    firstName: name,
    lastName: "",
    birthDate: "",
    photo: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
      setFormData((prevFormData) => ({
        ...prevFormData,
        firstName: user.name,
      }));
    }
  }, [user]);

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

  useIonViewWillLeave(() => {
    console.log("Componente Account desmontado");
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

              <FormAcountComponent
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
                <div className="account-page-modal-date">
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

export default Account;
