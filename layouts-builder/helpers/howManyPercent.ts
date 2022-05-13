export const howManyPercent = (widthYPixel: number, widthYPercent: number, xPixel: number) => {

const xP = (xPixel * widthYPercent) / widthYPixel

return xP
}