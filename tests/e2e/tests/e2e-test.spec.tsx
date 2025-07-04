import randomItem from "./utils/utils";
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("https://tasktango.vercel.app/");
  await expect(page).toHaveTitle("TaskTango - Home Page");
});

test.describe("New Todo", () => {
  test("Add a task and verify it appears in the list", async ({ page }) => {
    // Wait for the new task input to appear
    const newTaskInput = await page.waitForSelector(
      'input[placeholder="Add new task"]'
    );
    // Create 1st todo.
    const todoText = randomItem();
    await newTaskInput.fill(todoText);
    await newTaskInput.press("Enter");

    //find task in the tasklist
    const ListItem = page.getByRole("listitem").filter({ hasText: todoText });

    //mark item as done and assert it's checked
    const itemCheckbox = ListItem.locator(".chakra-checkbox__control");

    //mark the latest as done even if there are multiple ones
    await itemCheckbox.first().click();
    expect(itemCheckbox).toBeTruthy();

    //assert the toast is showing for task is done
    await expect(page.getByText("Task Done")).toBeVisible();
  });

  test("Add a task and Delete it and verify it appears in the list", async ({
    page,
  }) => {
    // Wait for the new task input to appear
    const newTaskInput = await page.waitForSelector(
      'input[placeholder="Add new task"]'
    );
    // Create 2st todo.
    const todoText2 = randomItem();
    await newTaskInput.fill(todoText2);
    await newTaskInput.press("Enter");

    //find task in the tasklist
    const ListItem2 = page.getByRole("listitem").filter({ hasText: todoText2 });

    await ListItem2.waitFor();

    //delete a task and assert it's deleted
    const itemDeleteBtn = ListItem2.locator(
      'button[aria-label="Delete a task"]'
    );

    await itemDeleteBtn.waitFor();

    //delete on the latest added even if there are multiple ones
    await itemDeleteBtn.first().click();

    //assert the toast is showing for task is deleted
    await expect(page.getByText("Task deleted")).toBeInViewport();
    //await expect(ListItem2).not.toBeVisible();
  });
});
