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
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillLeave,
} from "@ionic/react";
import "./products.css";
import dataExample from "./helpers/data-example.json";
import { TypesProduct } from "./types";
import { useEffect, useState } from "react";
import { useProducts } from "../../services/products/get-products";
import { useConfigStore } from "../../store/config/app";
import { generateGUID } from "@/utils/generate-guid";
import ProductsCard from "./components/card";

const Products: React.FC = () => {
  const titlePage = "Productos";
  const className = "products-page";
  const optionsApp = useConfigStore();

  const [dataProducts, setDataProducts] = useState<TypesProduct[]>();
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [isSearchProduct, setIsSearchProduct] = useState<boolean>(false);

  const { optionsDataExample, urlBackend } = optionsApp;

  const { data, error, isLoading } = useProducts();

  const RenderNoProducts = () => {
    return (
      <IonItem lines="none">
        {/* <IonAlert
          isOpen={true}
          onDidDismiss={() => {}}
          header={"Error"}
          message={"No hay productos"}
          buttons={["OK"]}
        />
         */}
        <IonText>No hay productos</IonText>
      </IonItem>
    );
  };

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

  useEffect(() => {
    if (searchProduct) {
      setIsSearchProduct(true);
    } else {
      setIsSearchProduct(false);
    }
  }, [searchProduct]);

  useIonViewWillLeave(() => {
    console.info("Componente Products desmontado");
  });

  return (
    <IonPage>
      {isLoadingProducts && <IonSpinner></IonSpinner>}

      {!isLoadingProducts &&
        (error || data?.[0]?.error ? (
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
                        onIonChange={(e) => setSearchProduct(e.detail.value!)}
                      ></IonSearchbar>
                    </IonCol>
                  </IonRow>
                </IonToolbar>
              </IonGrid>
            </IonHeader>

            <IonContent fullscreen>
              <div className={className}>
                {!isSearchProduct &&
                  (dataProducts?.map((product, index) => (
                    <ProductsCard
                      className={className}
                      key={product.nid}
                      nid={product.nid}
                      title={product.title}
                      image={urlBackend + product.image}
                      tags={product.tags}
                      body={product.body}
                    />
                  )) ?? <RenderNoProducts />)}

                {isSearchProduct &&
                  (dataProducts
                    ?.filter((product) =>
                      product.title
                        .toLowerCase()
                        .includes(searchProduct.toLowerCase())
                    )
                    .map((product, index) => (
                      <ProductsCard
                        className={className}
                        key={product.nid}
                        nid={product.nid}
                        title={product.title}
                        image={urlBackend + product.image}
                        tags={product.tags}
                        body={product.body}
                      />
                    )) ?? <RenderNoProducts />)}
              </div>
            </IonContent>
          </>
        ))}
    </IonPage>
  );
};

export default Products;
