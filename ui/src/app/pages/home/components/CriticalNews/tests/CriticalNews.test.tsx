// import { criticalArticleMockData } from "@/app/api/articleApi/mock-data/articleMockData";
// import homeJson from "@content/home.json";
// import { IonApp } from "@ionic/react";
// import {
//   CriticalNews,
//   testId as CriticalNewsTestId,
// } from "@pages/home/components/CriticalNews";
// import { render, screen, within } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { vi } from "vitest";
//
// test("renders all slide contents based on data length", async () => {
//   const { mockRenderFn } = renderCriticalNews();
//
//   expect(mockRenderFn).toBeCalledTimes(criticalArticleMockData.length);
// });
// test("opens popover with more info list items when clicked", async () => {
//   const { user } = renderCriticalNews();
//
//   const newsMenuIcon = screen.getByTestId(CriticalNewsTestId.moreInfoBtn);
//
//   await user.click(newsMenuIcon);
//
//   const popover = screen.getByTestId(CriticalNewsTestId.popoverContent);
//   expect(
//     within(popover).getByText(homeJson.criticalNews.menuItem.criticalNews),
//   ).toBeVisible();
//   expect(
//     within(popover).getByText(homeJson.criticalNews.menuItem.rumors),
//   ).toBeVisible();
// });
//
// function renderCriticalNews() {
//   const mockRenderFn = vi.fn();
//   const user = userEvent.setup();
//   const utils = render(
//     <IonApp>
//       <CriticalNews
//         articles={criticalArticleMockData}
//         handleBookmark={mockRenderFn}
//       />
//     </IonApp>,
//   );
//
//   return { ...utils, mockRenderFn, user };
// }
