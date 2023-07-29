

type Sizes = "xl" |"lg" |"md" |"sm" |"xs"
type Colors = "primary" |"primary-soft" |"success" |"success-soft" |"warning" |"warning-soft" |"error" | "error-soft" |"gray";
type CheckBoxColors = "primary" |"error" | "blue" |"green";
type Hovers =  "primary" | "success" | "warning" | "error" | "gray";

export type ButtonProps = {

    size  : Sizes,
    color : Colors ,
    form : "square"|  "rounded",
    hover : Hovers,
    outline : Boolean,
    disabled : Boolean,
    className : String,
    type : 'submit' | 'reset' | 'button' | undefined,
    callback : Function,
    loading : Boolean,
    spanClass : String,
    loadingclass : String
  }


