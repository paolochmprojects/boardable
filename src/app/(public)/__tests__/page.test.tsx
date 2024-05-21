import { describe, expect, test} from "vitest"
import { render, screen } from "@testing-library/react"
import HomePage from "../page"



describe("Prueba de HomePage", () => {

    test("El objeto document debe existir", () => {
        expect(document).toBeDefined()
    })

    test("El heading 'Boardable Project' debe existir", () => {

        render(<HomePage />)

        const pageTitle = screen.getByRole('heading', { name: /boardable project/i })
        expect(pageTitle).toBeInTheDocument()

    })




})