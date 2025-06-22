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
      className={`w-full px-4 md:w-[70%] md:px-0 mx-auto flex flex-col ${className ? className : ""}`}
    >
      {children}
    </section>
  );
};

export default Container;
