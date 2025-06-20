import Link from "next/link";
const MainVideo: React.FC = () => {
  return (
    <section>
      <div className="aspect-video w-full max-h-[60vh] mx-auto relative overflow-hidden">
        <Link
          href="https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02%2F681dca92deecb58c406a6a47_COFN_bg-transcode.mp4"
          className="w-full h-full block  "
        >
          <video
            id="video"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
            playsInline
            data-wf-ignore="true"
            data-object-fit="cover"
          >
            <source
              src="https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02%2F681dca92deecb58c406a6a47_COFN_bg-transcode.mp4"
              data-wf-ignore="true"
              type="video/webm"
            />
          </video>
          <div className="absolute left-10 bottom-5 fontweight-semibold text-white text-2xl md:text-3xl flex flex-col gap-3">
            <h2 className="text-[1rem] md:text-[1.5rem] font-semibold">
              For our next generation
            </h2>
            <p className="text-[1.2rem] md:text-[2rem] font-semibold">
              전 세계 어디라도 복원할 땅이 있는 곳이라면
            </p>
          </div>
        </Link>

        {/* 유튜브 형식 */}
        {/* <iframe
          className="w-full h-full"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/VGkoaHyVUdg?autoplay=1&mute=1&loop=1&playlist=VGkoaHyVUdg&controls=0&rel=0&modestbranding=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        /> */}
      </div>
    </section>
  );
};

export default MainVideo;
