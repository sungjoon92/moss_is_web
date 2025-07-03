import React from "react";
import { NewsType } from "@/types";
import NewsCard from "./NewsCard";

interface Props {
  data: NewsType[];
}

const NewsList: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-10 w-full">
      {data.map((item) => {
        return <NewsCard key={item.id} item={item} />;
      })}
    </div>
  );
};

export default NewsList;
  