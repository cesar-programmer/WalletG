import { render, fireEvent } from "@testing-library/react";
import React, { useContext } from "react";
import AccountContext from "./accountContext";
import { AccountProvider } from "./accountContext";

describe("AccountProvider - handleSignOut", () => {
  // Componente de prueba que utiliza el contexto
  const TestComponent = () => {
    const { handleSignOut } = useContext(AccountContext);

    return (
      <button data-testid="signout-button" onClick={handleSignOut}>
        Sign Out
      </button>
    );
  };

  test("handleSignOut resetea el estado y elimina datos del localStorage", () => {
    // Simular datos en localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify({ id: 1, name: "Test User" }));
    localStorage.setItem("profile", JSON.stringify({ id: 1, name: "Profile Test" }));

    const { getByTestId } = render(
      <AccountProvider>
        <TestComponent />
      </AccountProvider>
    );

    // Simular clic en el botón de cierre de sesión
    const button = getByTestId("signout-button");
    fireEvent.click(button);

    expect(localStorage.getItem("isLoggedIn")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("profile")).toBeNull();
  });
});
