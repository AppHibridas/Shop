import {
  IonAlert,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonViewWillLeave,
} from "@ionic/react";
import "./products.css";
import ProductsCard from "./components/card";
import dataExample from "./helpers/data-example.json";
import { TypesProduct } from "./types";
import { useEffect, useState } from "react";
import { useProducts } from "../../services/products/get-products";
import { useConfigStore } from "../../store/config/app";

const Products: React.FC = () => {
  const titlePage = "Productos";
  const className = "products-page";
  const optionsApp = useConfigStore();

  const [dataProducts, setDataProducts] = useState<TypesProduct[]>();
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);

  const { optionsDataExample, urlBackend } = optionsApp;

  const { data, error, isLoading } = useProducts();

  useEffect(() => {
    if (data) {
      if (!data?.[0]?.error || optionsDataExample) {
        if (optionsDataExample) {
          setDataProducts(dataExample);
        } else {
          setDataProducts(data);
        }
      }
    }

    if (!isLoading) {
      setIsLoadingProducts(false);
    }
  }, [data, isLoading]);

  useIonViewWillLeave(() => {
    console.log("Componente Products desmontado");
  });

  return (
    <IonPage>
      {isLoadingProducts ? (
        <IonSpinner></IonSpinner>
      ) :
      //  !data?.[0]?.error
       false ? (
        <IonAlert
          isOpen={true}
          onDidDismiss={() => {}}
          header={"Error"}
          message={"Error al cargar los productos"}
          buttons={["OK"]}
        />
      ) : (
        <>
          <IonHeader>
            <IonGrid>
              <IonToolbar>
                <IonRow>
                  <IonCol size="6">
                    <IonToolbar>
                      <IonTitle> {titlePage} </IonTitle>
                    </IonToolbar>
                  </IonCol>
                  <IonCol size="6">
                    <IonSearchbar
                      animated={true}
                      placeholder="Buscar"
                    ></IonSearchbar>
                  </IonCol>
                </IonRow>
              </IonToolbar>
            </IonGrid>
          </IonHeader>

          <IonContent fullscreen>
            <div className={className}>
              {dataProducts?.map((product, index) => (
                <ProductsCard
                  className={className}
                  key={index}
                  title={product.title}
                  image={urlBackend + product.image}
                  tags={product.tags}
                  body={product.body}
                />
              )) ?? (
                <IonItem lines="none">
                  <IonAlert
                    isOpen={true}
                    onDidDismiss={() => {}}
                    header={"Error"}
                    message={"No hay productos"}
                    buttons={["OK"]}
                  />
                </IonItem>
              )}
            </div>
          </IonContent>
        </>
      )}
    </IonPage>
  );
};

export default Products;
