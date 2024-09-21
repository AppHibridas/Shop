import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAlert,
  IonText,
} from "@ionic/react";
import { Link, Redirect } from "react-router-dom";
import dataExample from "./helpers/data-example.json";
import { useConfigStore } from "@/store/config/app";
import { useUserStore } from "@/store/auth/use-store";
import { useLoginQuery } from "@/services/auth/login";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showLabelError, setShowLabelError] = useState(false);
  const [validateFields, setValidateFields] = useState(false);
  const [mssError, setMssError] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

  const optionsDataExample = useConfigStore(
    (state) => state.optionsDataExample
  );
  const setUser = useUserStore((state) => state.setUser);

  const { data, error, isLoading, refetch } = useLoginQuery(
    username,
    password,
    validateFields
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const fieldsAreEmpty = username !== "" || password !== "";
    setValidateFields(fieldsAreEmpty);

    if (!fieldsAreEmpty) {
      setShowAlert(true);
    } else {
      refetch();
    }
  };

  useEffect(() => {
    if (data) {
      if (optionsDataExample) {
        // if (!data?.error && !optionsDataExample) {
        console.log("data error",  data?.error);
        console.log("optionsDataExample", optionsDataExample);
        if (optionsDataExample) {
          setUser(dataExample);
          localStorage.setItem('userSession', JSON.stringify(dataExample));
        } else {
          setUser(data);
          localStorage.setItem('userSession', JSON.stringify(data));
        }
        setRedirectToHome(true);
      }
    }

    if (error || data?.error) {
      setMssError(error?.message ?? "Usuario no encontrado");
      setShowLabelError(true);
      setTimeout(() => {
        setShowLabelError(false);
      }, 5000);
    }
  }, [data, error, setUser]);

  if (redirectToHome) {
    return <Redirect to="/home" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar Sesion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid className="ion-height-100 ion-align-items-center ion-justify-content-center">
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="6" size-lg="4">
              <form onSubmit={handleSubmit}>
                <IonItem>
                  <IonLabel position="floating">Usuario:</IonLabel>
                  <IonInput
                    type="text"
                    value={username}
                    onIonChange={(e) => setUsername(e.detail.value!)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Contraseña:</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                  />
                </IonItem>
                <IonButton expand="full" type="submit">
                  Iniciar sesión
                </IonButton>
              </form>
              <IonItem lines="none">
                <IonLabel>¿No tienes cuenta?</IonLabel>
                <Link to="/register">Regístrate</Link>
              </IonItem>
              {showLabelError && (
                <IonText color="danger">
                  <p>Error: {mssError}</p>
                </IonText>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Datos no completados"
          subHeader="Por favor, completa los campos"
          message="No puedes dejar campos vacíos"
          buttons={["OK"]}
        />
        {isLoading && <div>Loading...</div>}
      </IonContent>
    </IonPage>
  );
};

export default Login;
