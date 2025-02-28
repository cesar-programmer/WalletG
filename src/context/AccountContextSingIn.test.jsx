import { render, fireEvent, waitFor } from "@testing-library/react";
import React, { useContext } from "react";
import AccountContext from "./accountContext";
import { AccountProvider } from "./accountContext";
import api from "./api";

vi.mock("./api"); // Mock de la API

describe("AccountProvider - handleSignIn", () => {
  const TestComponent = () => {
    const { handleSignIn } = useContext(AccountContext);

    const signIn = () => {
      handleSignIn("test@example.com", "password123");
    };

    return (
      <button data-testid="signin-button" onClick={signIn}>
        Sign In
      </button>
    );
  };

  test("handleSignIn maneja errores de la API correctamente", async () => {
    // Simular error en la llamada a la API
    api.post.mockRejectedValueOnce(new Error("Invalid credentials"));

    const { getByTestId } = render(
      <AccountProvider>
        <TestComponent />
      </AccountProvider>
    );

    const button = getByTestId("signin-button");
    fireEvent.click(button);

    // Verificar que los valores de localStorage no se han modificado
    await waitFor(() => {
      expect(localStorage.getItem("access_token")).toBeNull();
      expect(localStorage.getItem("refresh_token")).toBeNull();
      expect(localStorage.getItem("isLoggedIn")).toBeNull();
      expect(localStorage.getItem("user")).toBeNull();
    });
  });

  test("handleSignIn almacena tokens, actualiza el estado y carga datos del usuario", async () => {
    const mockTokenResponse = {
      status: 200,
      data: {
        access: "mock_access_token",
        refresh: "mock_refresh_token",
      },
    };

    const mockUserResponse = {
      status: 200,
      data: { id: 1, name: "Test User" },
    };

    api.post.mockResolvedValueOnce(mockTokenResponse); // Simular respuesta de /api/token/
    api.get.mockResolvedValueOnce(mockUserResponse);

    const { getByTestId } = render(
      <AccountProvider>
        <TestComponent />
      </AccountProvider>
    );

    const button = getByTestId("signin-button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorage.getItem("access_token")).toBe("mock_access_token");
      expect(localStorage.getItem("refresh_token")).toBe("mock_refresh_token");
      expect(localStorage.getItem("isLoggedIn")).toBe("true");
      expect(localStorage.getItem("user")).toBe(JSON.stringify(mockUserResponse.data));
    });
  });
});
