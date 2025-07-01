import React from "react";
import { ProjectType } from "@/types";
import ProjectCard from "./ProjectCard";

interface Props {
  initialData: ProjectType[];
}

const ProjectList: React.FC<Props> = ({ initialData }) => {
  return (
    <div className="space-y-10">
      {initialData.map((item, index) => (
        <ProjectCard key={index} item={item} />
      ))}
    </div>
  );
};

export default ProjectList;
