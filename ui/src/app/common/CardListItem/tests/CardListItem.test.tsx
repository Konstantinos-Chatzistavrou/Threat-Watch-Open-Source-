import CardListItem, {
  CardListItemProps,
} from "@common/CardListItem/CardListItem";
import { IonApp } from "@ionic/react";
import { render, screen } from "@testing-library/react";

test("renders title and localized date string", async () => {
  const { defaultProps } = setup();

  expect(screen.getByText(defaultProps.title)).toBeVisible();
  expect(
    screen.getByText(new Date(defaultProps.date).toLocaleDateString()),
  ).toBeVisible();
});

function setup(customProps?: Partial<CardListItemProps>) {
  const defaultProps: CardListItemProps = {
    title: "CardListItem Title",
    date: new Date(),
  };

  render(
    <IonApp>
      <CardListItem {...defaultProps} {...customProps} />
    </IonApp>,
  );

  return { defaultProps };
}
