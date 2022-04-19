import {
  hexToRGBA,
  RgbaToHex,
  RgbaToString,
} from '../../helpers/colorHelper';
import React, { useEffect, useRef, useState } from 'react';
import { HexColorInput, RgbaColorPicker } from 'react-colorful';
import { useClickAway } from 'react-use';
import { Rgba } from 'layouts-builder/interface/internalType';

interface ColorPickerProps {
  defaultColor?: Rgba;
  label: string;
  onChange?: (color: string) => void;
  onClose?: (color?: Rgba) => void;
}

export default function ColorPicker({
  defaultColor,
  label,
  onChange,
  onClose,
}: ColorPickerProps) {
  const [color, setColor] = useState<Rgba>(defaultColor as any);

  const [hexColor, setHexColor] = useState('');
  const [show, setShow] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useClickAway(popoverRef, () => {
    setShow(false);

    if (onClose) {
      onClose(color);
    }
  });

  const blackColor = { r: 68, g: 68, b: 68, a: 1 };

  useEffect(() => {
    if (!defaultColor) {
      setColor(blackColor);
      return;
    }
    if (!show) setColor(defaultColor);
  }, [defaultColor, show === true]);

  useEffect(() => {
    if (color) {
      let hexCol = RgbaToHex(color);
      if (hexCol !== null) {
        setHexColor(hexCol);
      }
    }
  }, [color]);

  function updateColor(color: Rgba) {
    setColor(color);
    if (onChange !== undefined) onChange(RgbaToString(color));
  }

  function updateColorViaHex(color: string) {
    setColor(hexToRGBA(color) as Rgba);
    if (onChange !== undefined)
      onChange(RgbaToString(hexToRGBA(color)));
  }

  function updateColorPreset(color: string) {
    setColor(hexToRGBA(color) as Rgba);
    if (onChange !== undefined) onChange(color);
  }

  function showHideColorPicker() {
    setShow(!show);
  }

  return (
    <div className="mb-1">
      <div className="py-2 flex relative">
        <span className="font-medium">{label}</span>
        <div
          className="cursor-pointer rounded-full w-6 h-6  right-1 border-black "
          style={{
            backgroundColor: RgbaToString(color),
            borderWidth: '0.86px',
            width: 30,
            height: 30,
            borderRadius: 30,
            marginLeft: 15,
          }}
          onClick={() => showHideColorPicker()}
        ></div>
      </div>
      {show && (
        <div
          className="py-3 flex flex-col gap-y-2 justify-center items-center popover"
          ref={popoverRef}
        >
          <div
            style={{ width: '95%' }}
            className="flex justify-center items-center"
          >
            <RgbaColorPicker color={color} onChange={updateColor} />
          </div>
          <div style={{ width: '100%' }}>
            <HexColorInput
              color={hexColor}
              onChange={updateColorViaHex}
            />
          </div>
        </div>
      )}
    </div>
  );
}
