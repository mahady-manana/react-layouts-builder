/// <reference types="react" />
import { Rgba } from 'layouts-builder/interface/internalType';
interface ColorPickerProps {
    defaultColor?: Rgba;
    label: string;
    onChange?: (color: string) => void;
    onClose?: (color?: Rgba) => void;
}
export default function ColorPicker({ defaultColor, label, onChange, onClose, }: ColorPickerProps): JSX.Element;
export {};
