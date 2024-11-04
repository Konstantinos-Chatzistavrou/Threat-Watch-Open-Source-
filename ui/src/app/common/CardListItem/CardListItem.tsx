import gridLockImage from "@assets/grid-lock.jpeg";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import { timeSharp } from "ionicons/icons";
import React from "react";
import "./CardListItem.css";

export interface CardListItemProps {
  title: string;
  date: Date;
  media: string;
}

const CardListItem = ({ title, date, media }: CardListItemProps) => {
  return (
    <div className="bookmark-card-container">
      <img alt={"alt"} src={media} className="bookmark-image" />

      <div className="bookmark-data-div">
        <IonText className="bookmark-title">{title}</IonText>
        <div className="bookmark-date-div">
          <IonIcon
            icon={timeSharp}
            className="bookmark-date-icon"
            color="light"
          />
          <IonText className="bookmark-date-date">
            {new Date(date).toLocaleDateString()}
          </IonText>
        </div>
      </div>
    </div>
  );
};

export default CardListItem;
