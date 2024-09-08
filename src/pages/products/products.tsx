import {
  IonAlert,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./products.css";
import ProductsCard from "./components/card";
import dataExample from "./helpers/data-example.json";
import { TypesProduct } from "./types";
import { useEffect, useState } from "react";
import { useProducts } from "../../services/get-products";

const Products: React.FC = () => {
  const titlePage = "Productos";
  const className = "products-page";
  const dataExampleProducts: TypesProduct[] =
    (dataExample.products as unknown as TypesProduct[]) ??
    ([] as TypesProduct[]);

  // const [dataExampleProducts, setDataExampleProducts] = useState<
  //   TypesProduct[]
  // >([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);

  // const { data, error, isLoading } = useProducts();

  // useEffect(() => {
  //   if (data) {
  //     setDataExampleProducts(data);
  //     setIsLoadingProducts(false);
  //   }
  // }, [data, isLoading]);

  return (
    <IonPage>
      {isLoadingProducts ? (
        <IonSpinner></IonSpinner>
      ) : false ? (
        <IonAlert
          isOpen={true}
          onDidDismiss={() => {}}
          header={"Error"}
          message={"Asdasdads"}
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
              {dataExampleProducts.map((product) => (
                <ProductsCard
                  className={className}
                  key={product.id}
                  id={product.id}
                  titleProduct={product.titleProduct}
                  imageProduct={product.imageProduct}
                  priceProduct={product.priceProduct}
                  contentProduct={product.contentProduct}
                />
              ))}
            </div>
          </IonContent>
        </>
      )}
    </IonPage>
  );
};

export default Products;
