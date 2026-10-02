export const siteConfig = Object.freeze({
  demoUrl: "https://mantiva360.app/",
  overviewVideoId: "buyer",
  videos: Object.freeze({
  "buyer": {
    "type": "local",
    "status": "approved-candidate",
    "title": "Five questions before the next commitment",
    "seconds": 60,
    "src": "/assets/video/mantiva360-buyer-8f99ea4c44ec.mp4",
    "poster": "/assets/images/video/buyer-8f99ea4c44ec.webp",
    "width": 1920,
    "height": 1080,
    "transcript": "/resources#buyer-text",
    "note": "Recorded demonstration views. Project outcomes depend on the source records and the authorised response.",
    "captions": "/assets/video/mantiva360-buyer-76958eaaef4e.en.vtt",
    "captionsBurnedIn": true,
    "captionStatus": "production-source",
    "reviewStatus": "full-listening-review-pending"
  },
  "cockpit": {
    "type": "local",
    "status": "approved-candidate",
    "title": "Turn project signals into accountable action",
    "seconds": 30,
    "src": "/assets/video/mantiva360-cockpit-fd0d8259975e.mp4",
    "poster": "/assets/images/video/cockpit-fd0d8259975e.webp",
    "width": 1920,
    "height": 1080,
    "transcript": "/resources#cockpit-text",
    "note": "Recorded demonstration views. Project outcomes depend on the source records and the authorised response.",
    "captions": "/assets/video/mantiva360-cockpit-eaf242cd1f3c.en.vtt",
    "captionsBurnedIn": true,
    "captionStatus": "production-source",
    "reviewStatus": "full-listening-review-pending"
  },
  "sap": {
    "type": "local",
    "status": "approved-candidate",
    "title": "Connect the SAP delivery picture",
    "seconds": 90,
    "src": "/assets/video/mantiva360-sap-5a2b9f9b380c.mp4",
    "poster": "/assets/images/video/sap-5a2b9f9b380c.webp",
    "width": 1920,
    "height": 1080,
    "transcript": "/resources#sap-text",
    "note": "Recorded demonstration views. Project outcomes depend on the source records and the authorised response.",
    "captions": "/assets/video/mantiva360-sap-ccb33fcbe68d.en.vtt",
    "captionsBurnedIn": true,
    "captionStatus": "production-source",
    "reviewStatus": "full-listening-review-pending"
  },
  "evolution": {
    "type": "local",
    "status": "approved-candidate",
    "title": "Built from delivery experience",
    "seconds": 90,
    "src": "/assets/video/mantiva360-evolution-6aca3e670668.mp4",
    "poster": "/assets/images/video/evolution-6aca3e670668.webp",
    "width": 1920,
    "height": 1080,
    "transcript": "/resources#evolution-text",
    "note": "Recorded demonstration views. Project outcomes depend on the source records and the authorised response.",
    "captions": "/assets/video/mantiva360-evolution-38b98a6b7799.en.vtt",
    "captionsBurnedIn": true,
    "captionStatus": "production-source",
    "reviewStatus": "full-listening-review-pending"
  },
  "hero": {
    "type": "local",
    "status": "approved-candidate",
    "title": "From fragmented information to project insight",
    "seconds": 10,
    "src": "/assets/video/mantiva360-hero-c897996f12ac.mp4",
    "poster": "/assets/images/video/hero-c897996f12ac.webp",
    "width": 1280,
    "height": 720,
    "transcript": "/resources#hero-text",
    "note": "Recorded demonstration views. Project outcomes depend on the source records and the authorised response."
  },
  "performance": {
    "type": "local",
    "status": "review-only",
    "title": "See It Early review cut",
    "seconds": 30,
    "reason": "Three verified product inserts are missing."
  },
  "XMQa-RB5fUU": {
    "type": "youtube",
    "status": "legacy-reference",
    "title": "Mantiva360 overview",
    "seconds": 31,
    "reviewStatus": "playback-and-content-unverified"
  },
  "QkCRdrASlAg": {
    "type": "youtube",
    "status": "legacy-reference",
    "title": "From issue to action",
    "seconds": 90,
    "reviewStatus": "playback-and-content-unverified"
  },
  "wEgHPeHhb7I": {
    "type": "youtube",
    "status": "legacy-reference",
    "title": "Mantiva360 SAP delivery overview",
    "seconds": 30,
    "reviewStatus": "playback-and-content-unverified"
  }
}),
  enquiry: Object.freeze({ enabled: false, endpoint: "" }),
});

// Candidate media is included in this noindex review build. A release review is still required.
export const isPlayable = (media) => Boolean(media && ["approved-candidate", "approved", "legacy-reference"].includes(media.status));
