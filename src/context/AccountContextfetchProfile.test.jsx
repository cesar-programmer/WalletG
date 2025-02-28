import React, { useContext } from "react";
import { renderHook, act } from "@testing-library/react";
import { AccountProvider } from "./accountContext"; 
import AccountContext from "./accountContext"; 
import api from "./api";

vi.mock("./api"); // Mockear la API

describe("AccountProvider - fetchProfile", () => {
  test("fetchProfile actualiza el perfil actual y lo guarda en localStorage", async () => {
    const mockProfile = { id: 1, name: "Test Profile" };

    // Simular la respuesta de la API
    api.get.mockResolvedValueOnce({ data: mockProfile });

    const { result } = renderHook(() => useContext(AccountContext), {
      wrapper: AccountProvider,
    });

    // Ejecutar fetchProfile
    await act(async () => {
      await result.current.fetchProfile();
    });

    // Verificar que el estado y el localStorage se actualizan correctamente
    expect(result.current.currentProfile).toEqual(mockProfile);
    expect(JSON.parse(localStorage.getItem("profile"))).toEqual(mockProfile);
  });

  test("fetchProfile maneja errores correctamente", async () => {
    // Simular un error en la API
    api.get.mockRejectedValueOnce(new Error("API Error"));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useContext(AccountContext), {
      wrapper: AccountProvider,
    });

    // Ejecutar fetchProfile
    await act(async () => {
      await result.current.fetchProfile();
    });

    // Verificar que el perfil actual no se actualizó
    expect(result.current.currentProfile).toBeNull();

    // Verificar que se llamó a console.error
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to fetch profile",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
