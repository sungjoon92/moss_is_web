// app/(route)/solution/[slug]/page.tsx
import { solutionData } from "@/data/solutionData";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { SolutionType } from "@/types";
interface Props {
  params: {
    slug: string;
  };
}

export default function SolutionDetailPage({ params }: Props) {
  const solution: SolutionType | undefined = solutionData.find(
    (item) => item.link === params.slug
  );

  if (!solution) return notFound();

  return (
    <Container className="flex items-center">
      <h1 className="text-3xl font-bold mb-10">{solution.title}</h1>
      <span className="text-sm text-gray-500">{solution.categoryTag}</span>
      <p className="mt-4 text-gray-700">{solution.content}</p>
      <img
        src={solution.imageUrl}
        alt={solution.title}
        className="mt-6 rounded-lg w-full object-cover"
      />
    </Container>
  );
}
