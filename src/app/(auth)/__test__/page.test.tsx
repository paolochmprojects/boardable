import { render } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import RootLayout from "@/app/layout"
import AuthLayout from "../layout"
import HomePage from "../signin/page"



describe("Prueba de SignInPage", () => {

    test("El objeto document debe existir", () => {
        expect(document).toBeDefined()
    })

})
