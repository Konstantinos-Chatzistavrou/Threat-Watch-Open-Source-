import { Article } from "@/app/api/articleApi/ArticleTypes";
// import { downloadedArticleMockData } from "@/app/api/articleApi/mock-data/downloadedArticleMockData";
import { EditCardList } from "@common/EditCardList";
import downloadsContent from "@content/downloads.json";
import "./Downloads.css";
import React, { useState } from "react";

export const Downloads: React.FC = () => {
  const [downloadedArticles, setDownloadedArticles] = useState<Article[]>(
    []
  );
  const [selectedArticles, setSelectedArticles] = useState<
    Record<number, boolean>
  >({});
  const handleArticledSelected = (articleId: string, checked: boolean) => {
    setSelectedArticles((prev) => ({ ...prev, [articleId]: checked }));
  };

  const handleRemovedDownloads = () => {
    setDownloadedArticles((prev) =>
        // @ts-ignore
      prev.filter((article) => !selectedArticles[article._id]),
    );
    setSelectedArticles({});
  };

  const clearSelectedArticles = () => {
    setSelectedArticles({});
  };

  return (
    <EditCardList
      pageTitle={downloadsContent.pageTitle}
      cardItemsData={downloadedArticles.map(({ _id, title, publishedDate }) => ({
        _id,
        title,
        date: publishedDate,
      }))}
      handleRemoveItem={handleRemovedDownloads}
      alertHeaderMessage={downloadsContent.alertConfirmation}
      removeButtonText={downloadsContent.removeArticlesButton}
      handleSelected={handleArticledSelected}
      selectedItems={selectedArticles}
      clearSelectedItems={clearSelectedArticles}
      cardDetailsApiUrl={"downloads"}
    />
  );
};
