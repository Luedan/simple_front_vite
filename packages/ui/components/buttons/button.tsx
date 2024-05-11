export type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonUI = ({ children, ...rest }: ButtonProps) => {
  return <button {...rest}>{children}</button>;
};
