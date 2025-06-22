import Link from "next/link";
const MainVideo: React.FC = () => {
  return (
    <section>
      <div className="w-full aspect-video max-h-[50vh] min-h-[300px] sm:min-h-[250px] md:min-h-[300px] relative overflow-hidden mx-auto">
        <Link
          href="https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02%2F681dca92deecb58c406a6a47_COFN_bg-transcode.mp4"
          className="w-full h-full block"
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
          <div className="absolute left-4 right-4 bottom-4 md:left-10 md:bottom-5 text-white text-center md:text-left flex flex-col gap-2 md:gap-3">
            <h2 className="text-sm md:mb-3 md:text-[1.5rem] font-semibold">
              For our next generation
            </h2>
            <p className="text-base md:text-[2rem] font-semibold">
              전 세계 어디라도 복원할 땅이 있는 곳이라면
            </p>
          </div>
        </Link>
      </div>

    </section>
  );
};

export default MainVideo;
