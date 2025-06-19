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
      className={`w-[70%] mt-10 mx-auto flex flex-col ${
        className ? className : ""
      }`}
    >
      {children}
    </section>
  );
};

export default Container;
