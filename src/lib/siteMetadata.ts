import { siteDetails } from "@/data/siteDetails";
const { siteName, siteUrl, description, language, locale, siteLogo, title } =
  siteDetails;

export const siteMetadata = {
  title, // 페이지의 제목. 브라우저 탭 제목과 SEO 메타태그에 사용됨.

  description, // 페이지에 대한 설명. 검색엔진 결과나 SNS 공유 시 표시됨.

  keywords: ["녹화시스템", "이끼정원", "산림복원", "친환경"],
  // 검색 최적화를 위한 키워드 목록. Google 등의 검색 엔진에서 페이지를 더 잘 분류할 수 있도록 도와줌.

  author: "Moss is Web",
  // 페이지 작성자 또는 사이트 운영자 정보. SEO 또는 브라우저용 메타데이터에 사용됨.

  robots: "index, follow",
  // 검색 엔진 크롤러에게 이 페이지를 색인(index)하고, 링크를 따라가도 된다는 지시를 내림.


  openGraph: {
    title, // Open Graph 제목. Facebook, Kakao 등에서 링크 공유 시 사용됨.
    description, // Open Graph 설명. SNS 미리보기 설명에 표시됨.
    url: siteUrl, // 페이지의 URL. SNS 미리보기 카드에 연결되는 링크.
    type: "website", // 콘텐츠 타입. 일반 웹사이트면 "website", 블로그 글이면 "article" 등을 사용.
    images: [
      {
        url: "/images/moss-is-logo.png", // SNS 미리보기 시 보여줄 대표 이미지 경로
        width: 1200, // 이미지 너비 (권장: 1200px 이상)
        height: 675, // 이미지 높이 (권장: 630~675px 정도)
        alt: "Moss is Web", // 이미지가 로드되지 않을 때 보여질 대체 텍스트
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    // 트위터 미리보기 카드 유형. 큰 썸네일을 보여주는 카드 형식 설정.
    title, // 트위터 카드 제목
    description, // 트위터 카드 설명
    images: ["/images/moss-is-logo.png"], // 트위터 카드 이미지 (최대 4개 가능, 여기선 1개)
  },

  alternates: {
    canonical: siteUrl,
    // canonical URL: 검색엔진이 중복 콘텐츠를 판단하지 않도록 "대표 주소"를 지정함
  },

  metadataBase: new URL(siteUrl),
  // 메타데이터에서 사용하는 절대 URL 경로의 기준(base). Next.js에서 자동 URL 구성 시 필요
};

// 반응형 웹을 위한 설정. 모바일 디바이스에서도 레이아웃이 잘 보이도록 함.
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// 브라우저 툴바 색상 지정 (특히 모바일에서 주소창 배경색 등). PWA나 Android 홈화면 아이콘에서도 반영됨.
export const themeColor = "#1a1a1a";