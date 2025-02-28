import React, { useContext } from "react";
import { renderHook, act } from "@testing-library/react";
import { AccountProvider } from "./accountContext"; 
import AccountContext from "./accountContext"; 
import api from "./api";

vi.mock("./api"); 

describe("AccountProvider - fetchTips", () => {
  test("fetchTips actualiza los tips y selecciona un tip actual", async () => {
    const mockTips = [
      { id: 1, content: "Tip 1" },
      { id: 2, content: "Tip 2" },
    ];

    api.get.mockResolvedValueOnce({ data: mockTips });

    const { result } = renderHook(() => useContext(AccountContext), {
      wrapper: AccountProvider,
    });

    await act(async () => {
      await result.current.fetchTips();
    });

    expect(result.current.tips).toEqual(mockTips);
    expect(mockTips).toContainEqual(result.current.currentTip);
  });

  test("fetchTips maneja errores correctamente", async () => {
    api.get.mockRejectedValueOnce(new Error("API Error"));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useContext(AccountContext), {
      wrapper: AccountProvider,
    });

    await act(async () => {
      await result.current.fetchTips();
    });

    expect(result.current.tips).toEqual([]);
    expect(result.current.currentTip).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith("Failed to fetch tips", expect.any(Error));

    consoleSpy.mockRestore();
  });
});
