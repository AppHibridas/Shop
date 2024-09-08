import React from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonList,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

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
              <IonText>
                <h2>¡Bienvenido!</h2>
              </IonText>
              <IonList>
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
                <IonButton expand="full" onClick={handleSubmit}>
                  Iniciar sesión
                </IonButton>
              </IonList>
              <IonItem lines="none">
                <IonLabel>¿No tienes cuenta?</IonLabel>
                <Link to="/register">Regístrate</Link>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
