type CNProps<M> = {
  [prop in keyof M]: any
}
export const classNames = <M extends Record<string, string>>(baseClassName: string, cnMap: M) => (props: { [prop in keyof M]: any }, additionalCN: string) => {
  let cn = Object.entries(cnMap).reduce(
    (res, [prop, className]) => (
      !!props[prop as keyof M] ? `${res} ${className}` : res
    ),
    baseClassName
  )

  if (additionalCN) {
    cn += ` ${additionalCN}`;
  }

  return cn;
};
