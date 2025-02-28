import React, { useContext } from "react";
import { renderHook, act } from "@testing-library/react";
import { AccountProvider } from "./accountContext"; 
import AccountContext from "./accountContext"; 
import api from "./api";

vi.mock("./api"); // Mockear la API

describe("AccountProvider - fetchFinanceGoals", () => {
  test("fetchFinanceGoals actualiza las metas financieras correctamente", async () => {
    // Simular datos de respuesta de la API
    const mockGoals = [
      { id: 1, name: "Goal 1", amount: 100 },
      { id: 2, name: "Goal 2", amount: 200 },
    ];

    api.get.mockResolvedValueOnce({ data: mockGoals });
    // Renderizar el proveedor del contexto
    const { result } = renderHook(() => useContext(AccountContext), {
      wrapper: AccountProvider,
    });

    // Ejecutar fetchFinanceGoals
    await act(async () => {
      await result.current.fetchFinanceGoals();
    });

    // Verificar que el estado de las metas financieras se actualizó correctamente
    expect(result.current.financeGoals).toEqual(mockGoals);
  });

  test("fetchFinanceGoals maneja errores correctamente", async () => {
    // Simular un error en la API
    api.get.mockRejectedValueOnce(new Error("API Error"));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useContext(AccountContext), {
      wrapper: AccountProvider,
    });

    // Ejecutar fetchFinanceGoals
    await act(async () => {
      await result.current.fetchFinanceGoals();
    });

    // Verificar que el estado no cambió y permanece vacío
    expect(result.current.financeGoals).toEqual([]);

    // Verificar que se llamó a console.error con el mensaje correcto
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to fetch finance goals",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
