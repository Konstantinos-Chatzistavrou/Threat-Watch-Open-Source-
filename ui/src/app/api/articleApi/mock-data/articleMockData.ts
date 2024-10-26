import { Article } from "@/app/api/articleApi/ArticleTypes";
import {
  getRandomDate,
  sampleSummary,
  sampleText,
} from "@/app/api/articleApi/mock-data/mockDataUtils";

// export const articleMockData: Article[] = [...Array(15)].map((_, i) => ({
//   id: i,
//   title: `Article ${i + 1}`,
//   isCritical: i < 5,
//   isBookmarked: false,
//   isDownloaded: false,
//   summary: sampleSummary,
//   text: sampleText,
//   createdBy: "Author",
//   createdDate: getRandomDate(7),
//   updatedDate: getRandomDate(0.08),
// }));

// export const criticalArticleMockData = articleMockData.filter(
//   (article) => article.isCritical,
// );
// export const nonCriticalArticleMockData = articleMockData.filter(
//   (article) => !article.isCritical,
// );
