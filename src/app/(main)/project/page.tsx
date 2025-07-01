"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import { getProjects } from "@/lib/api/project";
import { toCamelCase } from "@/utils/caseConverter";
import ProjectList from "@/components/main/project/ProjectLIst";

export default function ProjectPage() {
  const [data, setData] = useState([]);

  const fetchProject = async () => {
    try {
      const response = await getProjects();
      setData(response.data.map(toCamelCase));
    } catch (error) {
      console.error("데이터를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <Container className="t-[80px] md:mt-0 ">
      <ProjectList initialData={data} />
    </Container>
  );
}
