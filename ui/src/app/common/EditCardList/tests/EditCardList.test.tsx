import { EditCardList, EditCardListProps, testId } from "@common/EditCardList";
import { IonApp } from "@ionic/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

test("displays title and list of items", async () => {
  const { defaultProps } = setup();

  expect(await screen.findByText(defaultProps.pageTitle)).toBeVisible();
  expect(screen.getAllByRole("heading")).toHaveLength(
    defaultProps.cardItemsData.length,
  );
});

test("turning on edit mode displays checkboxes", async () => {
  const { defaultProps, user } = setup();

  const toggleEditBtn = await screen.findByTestId(testId.toggleEditBtn);
  expect(toggleEditBtn).toBeVisible();

  for (const { _id } of defaultProps.cardItemsData) {
    expect(screen.queryByTestId(`${testId.itemCheckbox}-${_id}`)).toBeNull();
  }

  await user.click(toggleEditBtn);

  for (const { _id } of defaultProps.cardItemsData) {
    expect(screen.getByTestId(`${testId.itemCheckbox}-${_id}`)).toBeVisible();
  }
});

test("turning off edit mode hides checkboxes and calls function to clear selection", async () => {
  const { defaultProps, user } = setup();

  const toggleEditBtn = await screen.findByTestId(testId.toggleEditBtn);
  expect(toggleEditBtn).toBeVisible();

  await user.click(toggleEditBtn);
  for (const { _id } of defaultProps.cardItemsData) {
    expect(screen.getByTestId(`${testId.itemCheckbox}-${_id}`)).toBeVisible();
  }

  await user.click(toggleEditBtn);
  for (const { _id } of defaultProps.cardItemsData) {
    expect(screen.queryByTestId(`${testId.itemCheckbox}-${_id}`)).toBeNull();
  }

  expect(defaultProps.clearSelectedItems).toBeCalledTimes(1);
});

test("clicking remove button displays alert confirmation message", async () => {
  const { defaultProps, user } = setup({
    selectedItems: {
      0: true,
    },
  });

  const toggleEditBtn = await screen.findByTestId(testId.toggleEditBtn);
  expect(toggleEditBtn).toBeVisible();

  await user.click(toggleEditBtn);

  expect(screen.queryByText(defaultProps.alertHeaderMessage)).toBeNull();

  const removeButton = screen.getByText(defaultProps.removeButtonText);
  expect(removeButton).toBeVisible();
  await user.click(removeButton);

  expect(
    await screen.findByText(defaultProps.alertHeaderMessage),
  ).toBeInTheDocument();
  screen.debug(undefined, Infinity);
});

test("canceling remove item alert message closes alert", async () => {});

test("confirming remove item alert message closes alert and calls function to remove item", async () => {});

test("allows checking and removing multiple list items", async () => {});
test("clicking the card will navigate to article page details", async () => {});

function setup(customProps?: Partial<EditCardListProps>) {
  const user = userEvent.setup();

  const defaultProps: EditCardListProps = {
    pageTitle: "EditCardList Title",
    cardItemsData: [...Array(3)].map((_, i) => ({
      _id: ""+i,
      title: `Title ${i}`,
      date: new Date(),
    })),
    handleRemoveItem: vi.fn(),
    alertHeaderMessage: "Test alert message",
    removeButtonText: "Remove Button",
    handleSelected: vi.fn(),
    selectedItems: {},
    clearSelectedItems: vi.fn(),
    cardDetailsApiUrl: "",
  };

  render(
    <IonApp>
      <EditCardList {...defaultProps} {...customProps} />
    </IonApp>,
  );

  return { user, defaultProps };
}
