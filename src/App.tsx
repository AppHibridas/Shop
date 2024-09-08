import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { cart, home, logIn, logOut, person } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Products from "./pages/products/products";
import Login from "./pages/user/login/login";
import Register from "./pages/user/register/register";
import { useUserStore } from "./store/auth/use-store";
import { FC, useEffect, useState } from "react";
import Account from "./pages/user/account/account";
import Exit from "./pages/user/exit/exit";

setupIonicReact();

const App: FC = () => {
  const user = useUserStore().user;

  const [showTabLogin, setShowTabLogin] = useState(true);

  useEffect(() => {
    const accessToken = user?.access_token;
    console.log("accessToken", accessToken);
    setShowTabLogin(!accessToken);
  }, [user]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Products />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            {/* <Route path="/cart">
              <IonLabel>Carrito</IonLabel>
            </Route> */}

            <Route path="/account">
              <Account />
            </Route>

            <Route path="/exit">
              <Exit />
            </Route>

            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon aria-hidden="true" icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            {showTabLogin && (
              <IonTabButton tab="login" href="/login">
                <IonIcon aria-hidden="true" icon={logIn} />
                <IonLabel>Login</IonLabel>
              </IonTabButton>
            )}

            {!showTabLogin && (
              <IonTabButton tab="cart" href="/cart">
                <IonIcon aria-hidden="true" icon={cart} />
                <IonLabel>Carrito</IonLabel>
              </IonTabButton>
            )}
            {!showTabLogin && (
              <IonTabButton tab="account" href="/account">
                <IonIcon aria-hidden="true" icon={person} />
                <IonLabel>Cuenta</IonLabel>
              </IonTabButton>
            )}
            {!showTabLogin && (
              <IonTabButton tab="exit" href="/exit">
                <IonIcon aria-hidden="true" icon={logOut} />
                <IonLabel>Salir</IonLabel>
              </IonTabButton>
            )}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
