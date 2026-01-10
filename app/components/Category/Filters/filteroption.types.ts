export type StyleTypes = "Style" | "Metal" | "Stonetype" | "Shape" | "Setting Type" | "By Recipient" | "Carat";

export type Styles = {
  [K in StyleTypes]: Array<{
    label: string
    icon: string
  }>
}