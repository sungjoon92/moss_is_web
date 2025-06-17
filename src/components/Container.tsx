import React from "react";

interface Props {
  className?: string;
}

const Container: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}: React.PropsWithChildren<Props>) => {
  return (
    <section
      className={`w-full flex items-center flex-col mx-auto ${
        className ? className : ""
      }`}
    >
      {children}
    </section>
  );
};

export default Container;
