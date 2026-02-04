import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MY_COLORS } from "../../constants/colors.js";
import { ICONS, IMAGES, HERO } from "../../asset/assets.js";
import NavBar from "../features/NavBar.jsx";
import Footer from "../features/Footer.jsx";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Get project data from translations
  const project = t(`dataProcessing.projectDetail.projects.${projectId}`, {
    returnObjects: true,
  });

  // Get related projects from translations
  const relatedProjects = t("dataProcessing.projectDetail.relatedProjects", {
    returnObjects: true,
  });

  // Get labels
  const backButton = t("dataProcessing.projectDetail.backButton");
  const descriptionTitle = t("dataProcessing.projectDetail.descriptionTitle");
  const dateLabel = t("dataProcessing.projectDetail.dateLabel");
  const statusLabel = t("dataProcessing.projectDetail.statusLabel");
  const resultsTitle = t("dataProcessing.projectDetail.resultsTitle");
  const relatedProjectsTitle = t(
    "dataProcessing.projectDetail.relatedProjectsTitle",
  );

  // Image mappings
  const heroImages = {
    1: HERO.hero,
    2: IMAGES.IMG47,
    3: IMAGES.IMG40,
  };

  const descriptionImages = {
    1: IMAGES.IMG44,
    2: IMAGES.IMG42,
    3: IMAGES.IMG48,
  };

  const solutionImages = {
    1: IMAGES.IMG45,
    2: IMAGES.IMG43,
    3: IMAGES.IMG41,
  };

  const relatedProjectImages = {
    1: IMAGES.IMG40,
    2: IMAGES.IMG47,
    3: IMAGES.IMG46,
  };

  if (!project || !project.title) {
    navigate("/solutions/it-data-processing");
    return null;
  }

  return (
    <>
      
      <nav className="sticky top-0 z-50 bg-white shadow-md">
      <NavBar />
      </nav>
      <div className="w-full" style={{ backgroundColor: MY_COLORS.white }}>
        {/* ═══════════════════════════════════════════════ */}
        {/* HERO                                           */}
        {/* ═══════════════════════════════════════════════ */}
        <section
          className="relative w-full flex flex-col items-center px-4 md:px-6 lg:px-4"
          style={{ paddingTop: "80px", paddingBottom: "60px" }}
        >

           <button
            onClick={() => navigate("/solutions/it-data-processing")}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity mb-6 md:mb-0 md:absolute"
            style={{
              top: window.innerWidth >= 768 ? "40px" : "auto",
              left: window.innerWidth >= 768 ? "50px" : "auto",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={MY_COLORS.black}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            <span
              className="font-semibold text-sm"
              style={{ color: MY_COLORS.black }}
            >
              {backButton}
            </span>
          </button>
          {/* Gear icon — hidden on mobile, visible on tablet/desktop */}
          <div
            className="hidden md:block absolute animate-spin"
            style={{
              top: "110px",
              right: "10%",
              animationDuration: "2s",
            }}
          >
            <img
              src={ICONS.Engrenage_plan}
              alt=""
              className="w-20 h-20 md:w-28 md:h-28 lg:w-[150px] lg:h-[150px]"
            />
          </div>

          {/* Category */}
          <p
            className="font-bold text-center text-sm md:text-base lg:text-lg mb-3"
            style={{ color: MY_COLORS.black }}
          >
            {project.category}
          </p>

          {/* Title */}
          <h1
            className="font-extrabold text-center text-2xl md:text-3xl lg:text-[38px] leading-tight max-w-full md:max-w-[520px] lg:max-w-[620px] mb-6 md:mb-7 lg:mb-7 px-2"
            style={{ color: MY_COLORS.black }}
          >
            {project.title}
          </h1>

          {/* Meta: date + status */}
          <div className="text-center mb-8 md:mb-10 lg:mb-12">
            <p
              className="text-sm md:text-base mb-1"
              style={{ color: MY_COLORS.black }}
            >
              <span className="font-semibold">{dateLabel}</span> {project.date}
            </p>
            <p
              className="text-sm md:text-base"
              style={{ color: MY_COLORS.black }}
            >
              <span className="font-semibold">{statusLabel}</span>{" "}
              <span style={{ color: MY_COLORS.green }} className="font-bold">
                {project.status}
              </span>
            </p>
          </div>

          {/* Hero image */}
          <div className="w-full max-w-full md:max-w-[600px] lg:max-w-[780px] px-4 md:px-0">
            <img
              src={heroImages[projectId]}
              alt={project.title}
              className="w-full h-auto object-contain"
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/* DESCRIPTION DU PROJET                          */}
        {/* ═══════════════════════════════════════════════ */}
        <section className="w-full mx-auto max-w-full md:max-w-[90%] lg:max-w-[1100px] px-4 md:px-8 lg:px-12 py-8 md:py-10 lg:py-12">
          {/* Title */}
          <h2
            className="font-extrabold text-xl md:text-2xl lg:text-2xl mb-4"
            style={{ color: MY_COLORS.black }}
          >
            {descriptionTitle}
          </h2>

          {/* Paragraph */}
          <p
            className="text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-full md:max-w-[720px] lg:max-w-[820px]"
            style={{ color: MY_COLORS.black }}
          >
            {project.description}
          </p>

          {/* Two-column card: MOBILE (stacked) | TABLET & DESKTOP (side by side) */}
          <div
            className="flex flex-col md:flex-row w-full overflow-hidden"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
          >
            {/* Image - Top on mobile, Left on tablet/desktop */}
            <div className="w-full md:w-1/2 lg:w-[55%] min-h-[250px] md:min-h-[320px] lg:min-h-[380px]">
              <img
                src={descriptionImages[projectId]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gray box - Bottom on mobile, Right on tablet/desktop */}
            <div
              className="w-full md:w-1/2 lg:w-[45%] flex flex-col justify-center p-6 md:p-8 lg:p-9"
              style={{ backgroundColor: MY_COLORS.gray }}
            >
              {/* Challenges title */}
              <h3
                className="font-extrabold text-lg md:text-xl mb-4 md:mb-5 lg:mb-6"
                style={{ color: MY_COLORS.black }}
              >
                {project.challengesTitle}
              </h3>

              {/* Bullet list */}
              <ul className="space-y-3 md:space-y-4">
                {project.challenges.map((item, i) => (
                  <li key={i} className="flex items-start">
                    {/* Black dot */}
                    <span
                      className="inline-block w-[7px] h-[7px] rounded-full mt-[7px] mr-3 flex-shrink-0"
                      style={{ backgroundColor: MY_COLORS.black }}
                    />
                    <span
                      className="text-xs md:text-sm leading-relaxed"
                      style={{ color: MY_COLORS.black }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/* SOLUTION MISE EN ŒUVRE                         */}
        {/* ═══════════════════════════════════════════════ */}
        <section className="w-full mx-auto max-w-full md:max-w-[90%] lg:max-w-[1100px] px-4 md:px-8 lg:px-12 pb-8 md:pb-10 lg:pb-12">
          {/* Back arrow - Repositioned for mobile */}
         

          {/* Wrapper */}
          <div className="relative">
            {/* Gear icon - hidden on mobile */}
            <div
              className="hidden md:block absolute animate-spin z-0"
              style={{
                top: "-50px",
                left: "-60px",
                animationDuration: "4s",
              }}
            >
              <img
                src={ICONS.Engrenage_plan}
                alt=""
                className="w-24 h-24 md:w-28 md:h-28 lg:w-[120px] lg:h-[120px]"
              />
            </div>

            {/* Two-column card: Gray box left | Image right (reversed on mobile) */}
            <div
              className="flex flex-col-reverse md:flex-row w-full overflow-hidden relative z-10"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
            >
              {/* Gray box - Bottom on mobile, Left on tablet/desktop */}
              <div
                className="w-full md:w-1/2 lg:w-[45%] flex flex-col justify-center p-6 md:p-8 lg:p-9"
                style={{ backgroundColor: MY_COLORS.gray }}
              >
                {/* Solution title */}
                <h3
                  className="font-extrabold text-lg md:text-xl mb-4 md:mb-5 lg:mb-6"
                  style={{ color: MY_COLORS.black }}
                >
                  {project.solutionTitle}
                </h3>

                {/* Bullet list */}
                <ul className="space-y-3 md:space-y-4">
                  {project.solutions.map((item, i) => (
                    <li key={i} className="flex items-start">
                      {/* Black dot */}
                      <span
                        className="inline-block w-[7px] h-[7px] rounded-full mt-[7px] mr-3 flex-shrink-0"
                        style={{ backgroundColor: MY_COLORS.black }}
                      />
                      <span
                        className="text-xs md:text-sm leading-relaxed"
                        style={{ color: MY_COLORS.black }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image or Video - Top on mobile, Right on tablet/desktop */}
              <div className="w-full md:w-1/2 lg:w-[55%] min-h-[250px] md:min-h-[320px] lg:min-h-[380px]">
                {projectId === "3" ? (
                  <video
                  type="video/mp4"
                    src={solutionImages[projectId]}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"controls
                  />
                ) : (
                  <img
                    src={solutionImages[projectId]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/* RÉSULTATS                                      */}
        {/* ═══════════════════════════════════════════════ */}
        <section
          className="w-full flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 px-4"
          style={{
            backgroundColor: MY_COLORS.gray,
            borderTop: `1px solid #e5e5e5`,
          }}
        >
          {/* Title */}
          <h2
            className="font-extrabold text-center text-xl md:text-2xl mb-4 md:mb-6"
            style={{ color: MY_COLORS.black }}
          >
            {resultsTitle}
          </h2>

          {/* Description text */}
          <p
            className="text-center text-sm md:text-base leading-relaxed max-w-full md:max-w-[650px] lg:max-w-[750px] px-4"
            style={{ color: MY_COLORS.black }}
          >
            {project.results}
          </p>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/* PROJETS IT & DATA PROCESSING                   */}
        {/* ═══════════════════════════════════════════════ */}
        <section
          className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12"
          style={{ backgroundColor: MY_COLORS.white }}
        >
          {/* Title */}
          <h2
            className="font-extrabold text-center text-xl md:text-2xl mb-8 md:mb-10 lg:mb-12"
            style={{ color: MY_COLORS.black }}
          >
            {relatedProjectsTitle}
          </h2>

          {/* Grid: 1 column (mobile) | 2 columns (tablet) | 3 columns (desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-full md:max-w-[90%] lg:max-w-[1100px] mx-auto">
            {relatedProjects.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center cursor-pointer hover:opacity-85 transition-opacity"
                onClick={() =>
                  navigate(`/solutions/it-data-processing/${item.id}`)
                }
              >
                {/* Title above image */}
                <h3
                  className="font-extrabold text-center text-base md:text-lg leading-snug mb-4 md:mb-6 min-h-[50px] md:min-h-[58px] flex items-start justify-center px-2"
                  style={{ color: MY_COLORS.black }}
                >
                  {item.title}
                </h3>

                {/* Image */}
                <div className="w-full h-[180px] md:h-[200px]">
                  <img
                    src={relatedProjectImages[item.id]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProjectDetail;
