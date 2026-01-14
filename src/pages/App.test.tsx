/* eslint-disable react/react-in-jsx-scope */
import { screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import App from './App'
import { renderWithMantine } from "../test/utils";

describe("App component test", function () {
    it("should render app", async () => {
    renderWithMantine(
        <App />
    );

    const title = await screen.findByTestId("title");
    expect(title).toBeInTheDocument();
    })
})