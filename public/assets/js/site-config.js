export const siteConfig = Object.freeze({
  demoUrl: "https://mantiva360.app/",
  overviewVideoId: "XMQa-RB5fUU",
  videos: Object.freeze({
    "XMQa-RB5fUU": Object.freeze({ type: "youtube", title: "Mantiva360 overview", seconds: 31 }),
    "QkCRdrASlAg": Object.freeze({ type: "youtube", title: "From issue to action", seconds: 90 }),
    "wEgHPeHhb7I": Object.freeze({ type: "youtube", title: "Mantiva360 SAP delivery overview", seconds: 30 }),
    performance: Object.freeze({
      type: "local", title: "Project Performance film", seconds: 30,
      src: "/assets/video/mantiva360-performance-30s.mp4",
      poster: "/assets/images/video/performance-poster.webp",
      width: 910, height: 512,
      note: "Promotional review cut: product inserts pending. Burned-in text is present; accurate captions and a transcript remain under review.",
    }),
    evolution: Object.freeze({
      type: "local", title: "Mantiva360 Evolution", seconds: 90,
      src: "/assets/video/mantiva360-evolution-90s.mp4",
      poster: "/assets/images/video/evolution-poster.webp",
      width: 910, height: 512,
      note: "Product journey with demonstration data. Burned-in text is present; accurate captions and a transcript remain under review.",
    }),
  }),
  enquiry: Object.freeze({ enabled: false, endpoint: "" }),
});
