import logo from "@assets/icons/tw-logo.svg";
import {
  IonBackButton,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { PropsWithChildren } from "react";
import "./Header.css";

interface HeaderProps {
  title?: string;
  inModal?: boolean;
}

const Header = ({
  title,
  inModal = false,
  children,
}: PropsWithChildren<HeaderProps>) => (
  <IonHeader>
    <IonToolbar>
      <IonGrid>
        <IonRow class={"ion-align-items-center ion-justify-content-between"}>
          {inModal && (
            <IonCol>
              <IonBackButton style={{ height: "20px" }} />
            </IonCol>
          )}
          {!inModal && (
            <IonCol>
              <IonIcon className="xl" aria-hidden="true" src={logo} />
            </IonCol>
          )}
          <IonCol>
            {title && (
              <IonTitle className={"ion-text-center header-title"}>
                {title}
              </IonTitle>
            )}
          </IonCol>
          <IonCol>{children}</IonCol>
        </IonRow>
      </IonGrid>
    </IonToolbar>
  </IonHeader>
);

export default Header;
