import randomItem from "./utils/utils";
import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page).toHaveTitle("TaskTango - Home Page");


  // Close modal if it appears
  const closeModalBtn = page.locator('button:has-text("Close")');
  if (await closeModalBtn.isVisible({ timeout: 1000 })) {
    await closeModalBtn.click();
    await page.waitForTimeout(500);
    // Verify modal is closed 
    const modal = page.locator('[role="dialog"]');
    await modal.waitFor({ state: 'hidden', timeout: 2000 });
  }

});

test.describe("New Todo", () => {
  test("Add a task and verify it appears in the list", async ({ page }: { page: Page }) => {

    // Wait for the new task input to appear
    // const newTaskInput = await page.waitForSelector('input[placeholder="Add new task"]');
    const newTaskInput = page.locator('h3').locator('..').locator('input[placeholder="Add new task"]');

    // Create 1st todo.
    const todoText = randomItem() + `${Date.now()}`; // Unique text to avoid duplicates
    await newTaskInput.fill(todoText);
    await newTaskInput.press("Enter");

    // Wait for the task to appear in the DOM
    await page.waitForTimeout(2000);

    //find task in the tasklist
    // const ListItem = page.getByRole("listitem").filter({ hasText: todoText });
    const taskContainer = page.locator('h3').locator('..');
    const matchedTasks = await taskContainer.locator('ul > li').filter({ hasText: todoText }).all();
    // expect length to be 1
    expect(matchedTasks.length).toBe(1);
    // Verify the match contains our exact text
    expect(await matchedTasks[0].textContent()).toBe(todoText);
    const ListItem = matchedTasks[0];

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
    // const newTaskInput = await page.waitForSelector('input[placeholder="Add new task"]');
    const newTaskInput = page.locator('h3').locator('..').locator('input[placeholder="Add new task"]');

    // Create 2st todo.
    const todoText2 = randomItem() + `${Date.now()}`; // Unique text to avoid duplicates
    await newTaskInput.fill(todoText2);
    await newTaskInput.press("Enter");

    // Wait for the task to appear in the DOM
    await page.waitForTimeout(2000);

    //find task in the tasklist
    // const ListItem2 = page.getByRole("listitem").filter({ hasText: todoText2 });
    // await ListItem2.waitFor();

    //find task in the tasklist
    // NOTE: getByRole don't work correct in  VSCode devcontainer on Ubunt 24.04
    // const ListItem = page.getByRole("listitem").filter({ hasText: todoText });
    const taskContainer = page.locator('h3').locator('..');
    const matchedTasks = await taskContainer.locator('ul > li').filter({ hasText: todoText2 }).all();
    // expect length to be 1
    expect(matchedTasks.length).toBe(1);
    // Verify the match contains our exact text
    expect(await matchedTasks[0].textContent()).toBe(todoText2);
    const ListItem2 = matchedTasks[0];

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
