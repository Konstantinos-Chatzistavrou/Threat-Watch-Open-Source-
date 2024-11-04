import { buildElementId } from "@/app/utils/idUtils";
import { Button } from "@common/Button";
import CardListItem from "@common/CardListItem/CardListItem";
import Header from "@common/Header/Header";
import {
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonNav,
  IonNavLink,
  IonPage,
  IonRow,
  IonToggle,
  useIonAlert,
} from "@ionic/react";
import { ArticleDetails } from "@pages/article-details/ArticleDetails";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export interface CardProps {
  _id: string;
  title: string;
  publishedDate: Date;
  media: string;
}

export interface EditCardListProps {
  pageTitle: string;
  cardItemsData: CardProps[];
  handleRemoveItem: () => void;
  alertHeaderMessage: string;
  removeButtonText: string;
  handleSelected: (id: string, checked: boolean) => void;
  selectedItems: Record<string, boolean>;
  clearSelectedItems: () => void;
  cardDetailsApiUrl: string;
}

export const EditCardList = ({
  pageTitle,
  cardItemsData,
  handleRemoveItem,
  alertHeaderMessage,
  removeButtonText,
  handleSelected,
  selectedItems,
  clearSelectedItems,
}: EditCardListProps) => {
  const [presentAlert] = useIonAlert();
  const [editMode, setEditMode] = useState<boolean>(false);
  const history = useHistory();

  const handleEditMode = (checked: boolean) => {
    setEditMode(checked);
    if (!checked) {
      clearSelectedItems();
    }
  };
  const shouldShowRemoveBtn = () => {
    let moreThanOneSelected = false;
    for (const k in selectedItems) {
      if (selectedItems[k]) {
        moreThanOneSelected = true;
        break;
      }
    }

    return editMode && moreThanOneSelected;
  };

  const handleRemove = () => {
    setEditMode(false);
    handleRemoveItem();
  };
  const onBookmarkClick = (article: any) => {
    return history.push({ pathname: "/article", state: { article: article } });
  };

  return (
    <IonNav
      root={() => (
        <IonPage>
          <Header title={pageTitle} />
          <IonContent fullscreen className="ion-padding">
            <IonGrid>
              <IonRow className={"ion-padding-vertical"}>
                <IonToggle
                  checked={editMode}
                  onIonChange={(e) => handleEditMode(e.detail.checked)}
                  data-testid={testId.toggleEditBtn}
                  enableOnOffLabels={true}
                >
                  Edit
                </IonToggle>
              </IonRow>
              {cardItemsData.length > 0 ? (
                cardItemsData.map((article) => (
                  <IonRow
                    className={"ion-align-items-center"}
                    key={article._id}
                  >
                    <IonCol
                      size={editMode ? "11" : "12"}
                      className={"ion-no-padding ion-padding-bottom"}
                      onClick={() => onBookmarkClick(article)}
                    >
                      <CardListItem
                        title={article.title}
                        date={article.publishedDate}
                        media={article.media}
                      />
                    </IonCol>
                    {editMode && (
                      <IonCol>
                        <IonCheckbox
                          checked={selectedItems[article._id] || false}
                          onIonChange={(e) =>
                            handleSelected(article._id, e.detail.checked)
                          }
                          data-testid={`${testId.itemCheckbox}-${article._id}`}
                        ></IonCheckbox>
                      </IonCol>
                    )}
                  </IonRow>
                ))
              ) : (
                <IonRow className={"ion-justify-content-center"}>
                  <h2>No Bookmarks</h2>
                </IonRow>
              )}
              {shouldShowRemoveBtn() ? (
                <IonRow className={"ion-justify-content-center"}>
                  <Button
                    classes={"ion-margin-bottom"}
                    type={"button"}
                    ariaLabel={"remove-card-item-btn"}
                    ionButtonProps={{
                      id: "present-alert",
                      style: {
                        position: "fixed",
                        bottom: "0",
                      },
                      onClick: () => {
                        presentAlert({
                          header: alertHeaderMessage,
                          buttons: [
                            {
                              text: "Yes",
                              role: "confirm",
                              handler: handleRemove,
                            },
                            {
                              text: "No",
                              role: "cancel",
                            },
                          ],
                        });
                      },
                    }}
                  >
                    {removeButtonText}
                  </Button>
                </IonRow>
              ) : undefined}
            </IonGrid>
          </IonContent>
        </IonPage>
      )}
    />
  );
};

const buildId = (element: string) =>
  buildElementId("Common", "EditCardList", element);
export const testId = {
  toggleEditBtn: buildId("toggleEditBtn"),
  itemCheckbox: buildId("itemCheckbox"),
};
