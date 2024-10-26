import {Article} from "@/app/api/articleApi/ArticleTypes";
import {buildElementId} from "@/app/utils/idUtils";
import Button from "@common/Button/Button";
import homeContent from "@content/home.json";
import {IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonLabel, IonRow,} from "@ionic/react";
import {caretDownCircle, caretForwardCircle, star,} from "ionicons/icons";
import "swiper/swiper-bundle.min.css";

import "swiper/swiper.min.css";
import React, {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import gridLockImage from "@assets/grid-lock.jpeg";
import {useHistory} from "react-router-dom";

export const CriticalNews = ({ articles }: CriticalNewsProps) => {
    const history = useHistory();
    const [bookmarks,setBookmarks] = useState<string[]>([]);
    const [showSwiper, setShowSwiper] = useState(false);
  const [criticalArticles, setCriticalArticles] = useState<Article[]>(articles);

    useEffect(() => {
        if(articles){
            setCriticalArticles(articles);
        }
    }, [articles]);

    useEffect(() => {
        const localStorageItem = localStorage.getItem('criticalBookmarkedArticles');
        if(localStorageItem !== null){
            setBookmarks(JSON.parse(localStorageItem));
        }
    },[]);
    const onArticleClick = (id: string) => {
        console.log(id);
        const article = articles.find((article) => article._id === id);
        console.log(article);
        return history.push({pathname:'/article',state:{article:article}});
    }

    const handleBookmarkArticles = () => {
        const articlesCopy = criticalArticles.map((article) => {
            if(bookmarks.includes(article._id)){
                return {...article, isBookmarked:true};
            }
            return {...article, isBookmarked:false};
        });
        setCriticalArticles(articlesCopy);
    }

    useEffect(() => {
        if(bookmarks.length > 0){
            handleBookmarkArticles();
        }
        }, [bookmarks]);

    const handleBookmark = (id: string) => () => {
        console.log(bookmarks);
        if(!bookmarks.includes(id)){
            const bookmarkedArticles = [id, ...bookmarks];
            localStorage.setItem('criticalBookmarkedArticles', JSON.stringify(bookmarkedArticles));
            setBookmarks(bookmarkedArticles);
        } else {
            let bookmarkedArticles = bookmarks;
            bookmarkedArticles = bookmarkedArticles?.filter((articleId: string) => articleId !== id);
            localStorage.setItem('criticalBookmarkedArticles', JSON.stringify(bookmarkedArticles));
            setBookmarks(bookmarkedArticles);
        }
    }

    const renderCriticalNews = ({ title, _id, media, isBookmarked }: Article) => {
        return (
            <IonCard
                className={"ion-no-margin ion-margin-end"}
                key={_id}
                style={{
                    maxWidth: "15rem",
                    maxHeight: "20rem",
                    height:"100%",
                }}
                data-testid={`${testId.criticalNewsArticle}-${_id}`}
            >
                <img
                    alt="security-thumbnail"
                    src={media || gridLockImage}
                    onClick={()=>onArticleClick(_id)}
                    style={{
                        width: "100%",
                        maxHeight: "40%",
                        objectFit: "contain"
                    }}
                />

                <IonCardHeader>
                    <IonRow>
                        <IonCardTitle onClick={()=>onArticleClick(_id)}>{title}</IonCardTitle>
                        <IonCol>
                            <Button
                                type="icon"
                                ariaLabel={`favorite-btn-${_id}`}
                                classes={"small-square ion-float-bottom"}
                                ionButtonProps={{
                                    size: "small",
                                    // shape: "round",
                                    onClick: handleBookmark(_id),
                                }}
                                ionIconProps={{
                                    icon: star,
                                    size: "small",
                                    color: isBookmarked ? "yellow":"white"
                                }}
                            />
                        </IonCol>
                    </IonRow>
                </IonCardHeader>
            </IonCard>
        );
    }

  return (
    <IonGrid class={"ion-no-padding"}>
      <IonRow class={"ion-align-items-center ion-justify-content-center"}>
        <IonCol size={"1"}>
          <Button
            type={"icon"}
            ariaLabel={"critical-news-dropdown-button"}
            classes={"none"}
            ionButtonProps={{
              id: "critical-news-dropdown-button",
              onClick: () => {
                setShowSwiper((prev) => !prev);
              },
            }}
            ionIconProps={{
              size: "small",
              icon: showSwiper ? caretDownCircle : caretForwardCircle,
            }}
          ></Button>
        </IonCol>
        <IonCol size={"6"}>
          <IonRow>
            <IonLabel>{homeContent.criticalNews.heading}</IonLabel>
          </IonRow>
        </IonCol>
        <IonCol/>
      </IonRow>
      <IonRow
        class={!showSwiper ? "ion-hide" : ""}
        data-testid={testId.swiperContainer}
      >
        <Swiper slidesPerView={"auto"}>
          {criticalArticles.map((article) => (
            <SwiperSlide key={article.url} style={{ width:"max-content" }}>
              {renderCriticalNews(article)}
            </SwiperSlide>
          ))}
        </Swiper>
      </IonRow>
    </IonGrid>
  );
};

interface CriticalNewsProps {
  articles: Article[];
}

const prefixId = (name: string) => buildElementId("home", "critical-news", name);
export const testId = {
    criticalNewsArticle: prefixId("critical-news"),
    moreInfoBtn: prefixId("more-info"),
  popoverContent: prefixId("popover-content"),
  swiperContainer: prefixId("swiper-container"),
};
