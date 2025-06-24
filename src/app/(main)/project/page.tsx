import React from "react";
import { projectData } from "@/data/projectData";
import ProjectCard from "@/components/main/project/ProjectCard";
import Container from "@/components/Container";

export default function ProjectPage() {
  return (
    <Container className="t-[80px] md:mt-0 ">
      <ProjectCard data={projectData} />
    </Container>
  );
}
