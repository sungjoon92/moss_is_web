import React from "react";

interface Props {
  className?: string;
}

const Container: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}: React.PropsWithChildren<Props>) => {
  return (
    <section className="w-full mx-auto flex flex-col mt-[72px] md:mt-0 px-4 ">
      {children}
    </section>
  );
};

export default Container;
