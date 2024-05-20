import { colors, HexColor } from '@/schemas/board.schema'
import React, { useState } from 'react'
import clsx from 'clsx'

interface ColorPickerProps {
  setColor : (color: HexColor) => void
  color: HexColor
}
const ColorPicker = ({ setColor, color }: ColorPickerProps) => {

  const [visible, setVisible] = useState<boolean>(false)

  const setColorAction = (color: HexColor) => {
    setColor(color)
    setVisible(!visible)
  }

  return (
    <div className="relative w-8 h-8">
                    <div
                        onClick={() => setVisible(!visible)}
                        className={clsx("w-8 h-8 rounded-full border border-black", colors[color])} />
                    {visible && <div className="absolute w-40 bg-base-100 rounded-lg top-10 left-1/2 -translate-x-1/2 grid grid-cols-4 gap-2 p-3 shadow-lg">
                        <div className="w-8 h-8 rounded-full border border-black bg-color1" onClick={() => setColorAction(HexColor.color1)} ></div>
                        <div className="w-8 h-8 rounded-full border border-black bg-color2" onClick={() => setColorAction(HexColor.color2)} ></div>
                        <div className="w-8 h-8 rounded-full border border-black bg-color3" onClick={() => setColorAction(HexColor.color3)} ></div>
                        <div className="w-8 h-8 rounded-full border border-black bg-color4" onClick={() => setColorAction(HexColor.color4)} ></div>
                        <div className="w-8 h-8 rounded-full border border-black bg-color5" onClick={() => setColorAction(HexColor.color5)} ></div>
                        <div className="w-8 h-8 rounded-full border border-black bg-color6" onClick={() => setColorAction(HexColor.color6)} ></div>
                        <div className="w-8 h-8 rounded-full border border-black bg-color7" onClick={() => setColorAction(HexColor.color7)} ></div>
                        <div className="w-8 h-8 rounded-full border border-black bg-color8" onClick={() => setColorAction(HexColor.color8)} ></div>
                    </div>}
                </div>
  )
}

export default ColorPicker