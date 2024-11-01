import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { ChakraProvider } from "@chakra-ui/react";
import { Record } from "../domain/record";

const records = [...Array(4)].map(
  (_, i) => new Record(String(i + 1), `タイトル${i + 1}`, i + 1)
);

const mockStudyRecords = jest.fn().mockResolvedValue(records);
const mockDeleteStudyRecords = jest.fn().mockImplementation((id: string) => {
  const index = records.findIndex((value) => value.id === id);
  records.splice(index, 1);
  return new Promise((resolve) => resolve(records));
});

jest.mock("../models/getRecords", () => {
  return {
    getRecords: () => mockStudyRecords(),
  };
});
jest.mock("../models/deleteRecord", () => {
  return {
    deleteRecord: (id: string) => mockDeleteStudyRecords(id),
  };
});

describe("App", () => {
  test("ロード画面が表示される", () => {
    render(<App />);
    const loading = screen.getByTestId("loading");
    expect(loading).toBeDefined();
  });

  test("ロード画面後にタイトルが表示される", async () => {
    render(
      <ChakraProvider>
        <App />
      </ChakraProvider>
    );
    const title = await waitFor(() => screen.getByTestId("title"));
    expect(title).toBeDefined();
  });

  test("ロード画面後にテーブルが表示される", async () => {
    render(
      <ChakraProvider>
        <App />
      </ChakraProvider>
    );
    await waitFor(() => screen.getByTestId("table"));
    const records = screen.getByTestId("table").querySelectorAll("tr");
    expect(records.length - 1).toBe(4);
  });

  test("ロード画面後に新規登録ボタンが表示される", async () => {
    render(
      <ChakraProvider>
        <App />
      </ChakraProvider>
    );
    await waitFor(() => screen.getByTestId("createButton"));
    const button = screen.getByTestId("createButton");
    expect(button).toBeDefined();
  });

  test("学習記録が削除できること", async () => {
    render(
      <ChakraProvider>
        <App />
      </ChakraProvider>
    );
    await waitFor(() => screen.getByTestId("title"));
    const deleteIcons = screen.getAllByTestId("delete-icon");
    const index = Math.floor(Math.random() * deleteIcons.length);
    await userEvent.click(deleteIcons[index]);
    const deleteButton = screen.getByTestId("delete-button");
    await userEvent.click(deleteButton);
    const rows = screen.getByTestId("table").querySelectorAll("tr");
    expect(rows.length - 1).toBe(3);
  });
});

describe("FormModal", () => {
  beforeEach(async () => {
    render(
      <ChakraProvider>
        <App />
      </ChakraProvider>
    );
    await waitFor(() => screen.getByTestId("title"));
    const button = screen.getByTestId("createButton");
    await userEvent.click(button);
  });

  test("クリックでモーダルが表示される", async () => {
    const modalTitle = screen.getByTestId("formModal-title");
    expect(modalTitle.textContent).toEqual("新規作成");
  });

  test("学習内容がないときに登録するとエラーがでる", async () => {
    await userEvent.type(screen.getByTestId("time-input"), "1");
    await userEvent.click(screen.getByTestId("save-button"));
    expect(screen.getByTestId("title-error")).toBeDefined();
  });

  test("学習時間がないときに登録するとエラーがでる", async () => {
    await userEvent.type(screen.getByTestId("title-input"), "タイトル");
    await userEvent.click(screen.getByTestId("save-button"));
    expect(screen.getByTestId("time-error")).toBeDefined();
  });

  test("未入力のエラー", async () => {
    await userEvent.click(screen.getByTestId("save-button"));
    expect(
      screen.getByTestId("title-error") && screen.getByTestId("time-error")
    ).toBeDefined();
  });

  test("0以上でないときのエラー", async () => {
    await userEvent.type(screen.getByTestId("title-input"), "タイトル");
    await userEvent.type(screen.getByTestId("time-input"), "-1");
    await userEvent.click(screen.getByTestId("save-button"));
    expect(screen.getByTestId("time-error")).toBeDefined();
  });
});
