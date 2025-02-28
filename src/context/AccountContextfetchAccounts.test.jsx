import React, { useContext } from "react";
import { renderHook, act } from "@testing-library/react";
import { AccountProvider } from "./accountContext"; 
import AccountContext from "./accountContext";
import api from "./api";

vi.mock("./api"); // Mockear la API

describe("AccountProvider - fetchAccounts", () => {
  test("fetchAccounts actualiza las cuentas correctamente", async () => {
    // Simular datos de respuesta de la API
    const mockAccounts = [
      { id: 1, name: "Account 1", balance: 1000 },
      { id: 2, name: "Account 2", balance: 2000 },
    ];

    api.get.mockResolvedValueOnce({ data: mockAccounts });

    const { result } = renderHook(() => useContext(AccountContext), {
      wrapper: AccountProvider,
    });

    // Ejecutar fetchAccounts
    await act(async () => {
      await result.current.fetchAccounts();
    });

    // Verificar que el estado de las cuentas se actualizó correctamente
    expect(result.current.accounts).toEqual(mockAccounts);
  });

  test("fetchAccounts maneja errores correctamente", async () => {
    api.get.mockRejectedValueOnce(new Error("API Error"));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useContext(AccountContext), {
      wrapper: AccountProvider,
    });

    // Ejecutar fetchAccounts
    await act(async () => {
      await result.current.fetchAccounts();
    });

    expect(result.current.accounts).toEqual([]);

    // Verificar que se llamó a console.error con el mensaje correcto
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to fetch accounts",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
