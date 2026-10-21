/** Public paths in public/assets; null leaves a translated logo placeholder. */
export const siteConfig = {
  brandLogo: "/logos/Logo INCLUSIA.png",
  applicationUrl: "#",
  videoUrl: "/assets/INCLUS-IA.mp4",
  posterUrl: "/assets/pyrenees.webp",
  partnerLogos: [
    "/logos/partners/navare.png",
    "/logos/partners/tasubinsa.png",
    "/logos/partners/teresa.png",
    "/logos/partners/step.png",
    "/logos/partners/el-molino.png",
  ] as (string | null)[],
  associatedLogos: [
    "/logos/associated/cric.png",
    "/logos/associated/adapei.png",
    "/logos/associated/pep.png",
    "/logos/associated/capemploi.png",
    "/logos/associated/ia-pau.png",
    "/logos/associated/french-tech.png",
    "/logos/associated/nasertic.png",
  ] as (string | null)[],
  institutionalLogo: "/logos/poctefa.webp" as string | null,
};
export const sectionIds = ["home", "project", "program", "partners", "contact"];
