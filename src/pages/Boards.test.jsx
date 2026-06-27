import { expect, test, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Boards from "./Boards";
import { MemoryRouter } from "react-router-dom";
import {
  createBoard,
  deleteBoard,
  getBoards,
  updateBoard,
} from "../service/board";

vi.mock("../service/board", () => ({
  getBoards: vi.fn(() =>
    Promise.resolve({
      data: [],
    }),
  ),
  createBoard: vi.fn(),
  updateBoard: vi.fn(),
  deleteBoard: vi.fn(),
}));

describe("Boards Coponent", () => {
  test("renders page tittle", () => {
    render(
      <MemoryRouter>
        <Boards />
      </MemoryRouter>,
    );
    expect(screen.getByText("Project Boards")).toBeInTheDocument();
  });
  test("renders board title input", () => {
    render(
      <MemoryRouter>
        <Boards />
      </MemoryRouter>,
    );
    expect(screen.getByPlaceholderText("Board Title")).toBeInTheDocument();
  });

  test("updates input value when user types", () => {
    render(
      <MemoryRouter>
        <Boards />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText("Board Title");

    fireEvent.change(input, {
      target: { value: "Sprint Board" },
    });

    expect(input.value).toBe("Sprint Board");
  });

  test("Renders add board button", () => {
    render(
      <MemoryRouter>
        <Boards />
      </MemoryRouter>,
    );

    expect(screen.getByText("Add Board")).toBeInTheDocument();
  });

  test("shows alert when board title is empty", () => {
    window.alert = vi.fn();

    render(
      <MemoryRouter>
        <Boards />
      </MemoryRouter>,
    );

    const button = screen.getByText("Add Board");

    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith("Board Title is required");
  });

  test("calls createBoard when valid title is entered", async () => {
    render(
      <MemoryRouter>
        <Boards />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText("Board Title");
    const button = screen.getByText("Add Board");

    fireEvent.change(input, {
      target: { value: "Sprint Board" },
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(createBoard).toHaveBeenCalled();
    });
  });

 
});
