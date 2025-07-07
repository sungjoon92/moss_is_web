export const siteDetails = {
  siteName: "Moss is Web",
  // 사이트의 이름. 보통 웹사이트 타이틀이나 로고 텍스트에 사용.

  siteUrl: "https://moss-is-web.vercel.app/",
  // 사이트의 기본 URL 주소. SEO나 오픈그래프 설정 등에 사용.

  title: "Moss is Web",
  // 페이지나 사이트의 기본 제목. 브라우저 탭 제목, SEO 메타 태그에 활용.

  description: "Moss is Web은 첨단 녹화 솔루션으로 지구 복원에 기여합니다.",
  // 사이트 또는 페이지 설명. SEO 메타 태그(description)와 소셜 미디어 공유 시 표시됨.

  language: "ko-KR",
  // 사이트의 기본 언어를 나타냄. 한국어(대한민국)라는 뜻.

  locale: "ko-KR",
  // 지역 설정. 보통 SEO나 오픈그래프에서 위치 정보로 사용됨.

  siteLogo: `${process.env.BASE_PATH || ""}/images/logo.png`,
  // 사이트 로고 이미지 경로. process.env.BASE_PATH가 설정되어 있으면 앞에 붙이고, 없으면 빈 문자열 붙임.
  // 보통 배포 환경에 따라 기본 경로가 달라질 때 사용.
};
