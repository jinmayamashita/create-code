import { PropsWithChildren } from "react";
//@ts-expect-error
import classes from "./button.module.css";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  label: string;
  isPrimary?: boolean;
}

export function Button({ label, ...rest }: PropsWithChildren<Props>) {
  return (
    <button className={classes.button} role="button" {...rest}>
      {label}
    </button>
  );
}
