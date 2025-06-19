import React from "react";
import { projectData } from "@/data/projectData";
import ProjectCard from "@/components/project/ProjectCard";
import Container from "@/components/Container";

export default function ProjectPage() {
  return (
    <Container>
      <ProjectCard data={projectData} />
    </Container>
  );
}
