import { Article } from "@/app/api/articleApi/ArticleTypes";
import { buildElementId } from "@/app/utils/idUtils";
import gridLockImage from "@assets/grid-lock.jpeg";
import Button from "@common/Button/Button";
import Header from "@common/Header/Header";
import "./HomeStyles.css";
import homeContent from "@content/home.json";
import {
    IonCol,
    IonContent,
    IonGrid,
    IonPage,
    IonRow,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonSearchbar, IonText, IonInfiniteScroll, IonInfiniteScrollContent,
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {sparkles, star, syncCircle} from "ionicons/icons";
import { CriticalNews } from "./components/CriticalNews";
import axios from "axios";
import { useHistory} from "react-router-dom";

export const Home: React.FC = () => {

  const history = useHistory();
  const [bookmarks,setBookmarks] = useState<string[]>([]);
  const [criticalArticles, setCriticalArticles] = useState<Article[]>([]);
  const [newsArticles, setNewsArticles] = useState<Article[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(1);
  // const baseUrl = 'http://localhost:8000/articles/';
  const baseUrl = 'https://threat-watch.onrender.com/articles/';

    useEffect(() => {
        const localStorageItem = localStorage.getItem('bookmarkedArticles');
        if(localStorageItem !== null){
            setBookmarks(JSON.parse(localStorageItem));
        }
    },[]);

    useEffect(() => {
        if(isFetching){
            getNewsArticles();
            setIsFetching(false);
        }
    },[isFetching]);

  useEffect(() => {
    const url = baseUrl+'latest';
    const bookmarkedArticles = bookmarks;
    axios.get(url).then((r: any)=>{
        const newArticles = r.data.map((a:any) => {
            if(bookmarkedArticles.includes(a._id)) {
                a.isBookmarked = true;
            }
            a.isBookmarked = false;
            return a;
        });
      setCriticalArticles(newArticles);
    }).catch(err=>console.log(err));
  },[]);

  const getNewsArticles = () => {
      const url = baseUrl+'get';
      const bookmarkedArticles = bookmarks;
      axios.get(url,{params:{page:page}}).then((r: any)=>{
          const newArticles = r.data.map((a:any) => {
              if(bookmarkedArticles.includes(a._id)) {
                  a.isBookmarked = true;
              }
              a.isBookmarked = false;
              return a;
          });
          const articlesNew = [...newsArticles, ...newArticles];
          setNewsArticles(articlesNew);
          console.log(articlesNew);
    }).catch(err=>console.log(err));
      setPage(page+1);
  }

  const handleBookmarkArticles = () => {
      const bookmarkedArticles = bookmarks;
      const newsArticlesCopy = newsArticles.map((article) => {
         if(bookmarkedArticles.includes(article._id)){
             return {...article, isBookmarked:true};
         }
         return {...article, isBookmarked:false};
      });
      setNewsArticles(newsArticlesCopy);
  }

    useEffect(() => {
        if((!isFetching) && (bookmarks.length > 0)){
            handleBookmarkArticles();
        }
    },[bookmarks,isFetching]);

    // TODO: Implement search functionality

  const onArticleClick = (id: string) => {
      console.log(id);
      const article = newsArticles.find((article) => article._id === id);
      return history.push({pathname:'/article',state:{article:article}});
  }

  const handleBookmark = (id: string) => () => {
      console.log(bookmarks);
      if(!bookmarks.includes(id)){
          const bookmarkedArticles = [id, ...bookmarks];
          localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarkedArticles));
          setBookmarks(bookmarkedArticles);
      } else {
          let bookmarkedArticles = bookmarks;
          bookmarkedArticles = bookmarkedArticles?.filter((articleId: string) => articleId !== id);
          localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarkedArticles));
          setBookmarks(bookmarkedArticles);
      }
  }

  const handleSearchChange = () => {};

  // @ts-ignore
    const renderNews = ({ title, _id, media, isBookmarked }: Article) => {
        return (
            <IonCol size="6" key={_id}>
                <IonCard
                    className={"ion-no-margin ion-margin-end"}
                    style={{
                        height:"100%",
                        maxHeight: "20rem",
                    }}
                >
                    <img
                        alt="security-thumbnail"
                        src={media || gridLockImage}
                        onClick={()=>onArticleClick(_id)}
                        style={{
                            width: "100%",
                            maxHeight: "40%",
                            objectFit: "contain"
                        }}/>

                    <IonCardHeader>
                        <IonRow>
                            <IonCol>
                                <IonCardTitle onClick={()=>onArticleClick(_id)}>{title}</IonCardTitle>
                            </IonCol>
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
            </IonCol>
        );
    }

  // const handleDownload = (id: number) => {
  //   setArticles((list) =>
  //     list.map((article) => {
  //       if (article.id !== id) return article;
  //       return { ...article, isDownloaded: !article.isDownloaded };
  //     }),
  //   );
  // };

    return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonGrid className={""}>
          <IonRow
            className={"ion-align-items-center"}
            data-testid={testId.homeSearchRow}
          >
            <IonCol size={"2"}>
              <Button
                type="icon"
                ariaLabel={"search-reload"}
                classes={"default-square"}
                ionIconProps={{ icon: syncCircle }}
              />
            </IonCol>
            <IonCol>
              <IonSearchbar
                aria-label="home-search-input"
                animated={true}
                placeholder={homeContent.searchPlaceholder}
                debounce={500}
                onIonInput={handleSearchChange}
                className={"custom"}
              ></IonSearchbar>
            </IonCol>
            <IonCol size={"2"}>
              <Button
                type="icon"
                ariaLabel={"sparkles-placeholder-aria-label"}
                classes={"ion-float-right default-square"}
                ionIconProps={{ icon: sparkles }}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <CriticalNews articles={criticalArticles}/>
            </IonCol>
          </IonRow>
            <IonRow>
                <IonCol size='12'>
                    <IonText><h2>News</h2></IonText>
                </IonCol>
                    {newsArticles.map((article) => renderNews(article))}
                <IonInfiniteScroll
                    onIonInfinite={(ev) => {
                        setIsFetching(true);
                        setTimeout(() => ev.target.complete(), 100);
                    }}
                >
                    <IonInfiniteScrollContent></IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

const prefixId = (section: string, element: string) => buildElementId("home", section, element);
export const testId = {
  homeSearchRow: prefixId("search-bar", "row"),
};
