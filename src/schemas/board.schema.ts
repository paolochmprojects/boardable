import {z} from "zod"


export const colors = {
    "#e2e8f0": "bg-color1",
    "#ffcbca": "bg-color2",
    "#ffd6aa": "bg-color3",
    "#fff08b": "bg-color4",
    "#d9f89c": "bg-color5",
    "#bfdaff": "bg-color6",
    "#fbcee9": "bg-color7",
    "#ddd7ff": "bg-color8",
}

export enum HexColor {
    color1 = "#e2e8f0",
    color2 = "#ffcbca",
    color3 = "#ffd6aa",
    color4 = "#fff08b",
    color5 = "#d9f89c",
    color6 = "#bfdaff",
    color7 = "#fbcee9",
    color8 = "#ddd7ff",
}

export const BoardFormSchema = z.object({
    title: z.string().min(3, { message: "El titulo debe tener al menos 3 caracteres." }),
    color: z.nativeEnum(HexColor, {message: "Color invalido."})
})

export type BoardFormType = z.infer<typeof BoardFormSchema>