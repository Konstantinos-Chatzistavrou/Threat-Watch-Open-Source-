import { EditCardList } from "@common/EditCardList";
import bookmarksContent from "@content/bookmarks.json";
import "./Bookmarks.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Bookmarks: React.FC = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<any[]>([]);
  const [selectedArticles, setSelectedArticles] = useState<
    Record<string, boolean>
  >({});
  const localStorageItem1 = localStorage.getItem("bookmarkedArticles");
  const localStorageItem2 = localStorage.getItem("criticalBookmarkedArticles");
  const newsArticlesBookmarks =
    localStorageItem1 !== null ? JSON.parse(localStorageItem1) : [];
  const criticalArticlesBookmarks =
    localStorageItem2 !== null ? JSON.parse(localStorageItem2) : [];

  useEffect(() => {
    const totalBookmarks = [
      ...newsArticlesBookmarks,
      ...criticalArticlesBookmarks,
    ];

    const getData = async (ids: String[]) => {
      const totalArticles = [];
      const url = "https://threat-watch.onrender.com/articles/get_one";
      for (const id of ids) {
        try {
          const response = await axios.get(url, { params: { id: id } });
          totalArticles.push(response.data);
        } catch (error) {
          console.error(`Error fetching article with id ${id}:`, error);
        }
      }
      return totalArticles;
    };

    const fetchBookmarkedArticles = async () => {
      const articles = await getData(totalBookmarks);
      setBookmarkedArticles(articles);
    };

    fetchBookmarkedArticles();
  }, []);

  const handleArticledSelected = (articleId: string, checked: boolean) => {
    setSelectedArticles((prev) => ({ ...prev, [articleId]: checked }));
  };

  const handleRemovedBookmarks = () => {
    const na = newsArticlesBookmarks.filter((id: string) => {
      if (!selectedArticles[id]) {
        return id;
      }
    });
    const cba = criticalArticlesBookmarks.filter((id: string) => {
      if (!selectedArticles[id]) {
        return id;
      }
    });
    localStorage.setItem("bookmarkedArticles", JSON.stringify(na));
    localStorage.setItem("criticalBookmarkedArticles", JSON.stringify(cba));
    setBookmarkedArticles((prev) =>
      prev.filter((article) => !selectedArticles[article._id])
    );
    setSelectedArticles({});
  };

  const clearSelectedArticles = () => {
    setSelectedArticles({});
  };

  return (
    <EditCardList
      pageTitle={bookmarksContent.pageTitle}
      cardItemsData={bookmarkedArticles}
      handleRemoveItem={handleRemovedBookmarks}
      alertHeaderMessage={bookmarksContent.alertConfirmation}
      removeButtonText={bookmarksContent.removeArticlesButton}
      handleSelected={handleArticledSelected}
      selectedItems={selectedArticles}
      clearSelectedItems={clearSelectedArticles}
      cardDetailsApiUrl={"bookmark"}
    />
  );
};
