import Header from "@common/Header/Header";
import articleDetails from "@content/article-details.json";
import {
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonText,
  IonIcon,
} from "@ionic/react";
import { star } from "ionicons/icons";
import React from "react";
import { useLocation } from "react-router";
import "./ArticleDetails.css";

export const ArticleDetails = (a: Article) => {
  const location = useLocation();
  // @ts-ignore
  const article = location?.state?.article || a.a;
  if (!article) return <div>No article found.</div>;

  return (
    <IonPage>
      <Header title={article.title} inModal={true} />
      <IonContent className="article-container ion-padding">
        <IonGrid>
          <IonRow>
            <p className="article-title">{article.title}</p>
            <IonText className="article-subtitle">
              <p>
                {"Source: "}
                <a href={"https://" + article.source}>{article.source}</a>
                <br />
                {articleDetails.writtenBy}
                {article.author}
                <br />
                {articleDetails.createdDate}
                {new Date(article.publishedDate).toLocaleString()}
              </p>
            </IonText>
          </IonRow>
          <IonRow>
            <div className="article-image-div">
              <img
                alt={"security-thumbnail"}
                src={article.media}
                className="article-image"
              />
              {article.isBookmarked && (
                <div className="bookmark-icon-div">
                  <IonIcon icon={star} className="bookmark-icon" />
                </div>
              )}
            </div>
          </IonRow>
          <IonRow>
            <IonText className="article-description">
              <p>{article.description}</p>
            </IonText>
          </IonRow>
          <IonRow>
            <IonText className="article-summary">
              <p>{article.summary}</p>
            </IonText>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
