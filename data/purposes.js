/**
 * TCF v2.2 Purposes, Special Purposes, Features, Special Features, Stacks & Data Categories
 * Source: IAB Europe Transparency & Consent Framework v2.2 Policies
 */
window.TCF_PURPOSES = {

  purposes: [
    {
      id: "purpose-1",
      number: 1,
      name: "Store and/or access information on a device",
      userFriendlyText: "Cookies, device or similar online identifiers (e.g. login-based identifiers, randomly assigned identifiers, network based identifiers) together with other information (e.g. browser type and information, language, screen size, supported technologies etc.) can be stored or read on your device to recognise it each time it connects to an app or to a website, for one or several of the purposes presented here.",
      illustrations: [
        "Most purposes explained in this notice rely on the storage or accessing of information from your device when you use an app or visit a website. For example, a vendor or publisher might need to store a cookie on your device during your first visit on a website, to be able to recognise your device during your next visits (by accessing this cookie each time)."
      ],
      legalBases: ["consent"],
      vendorGuidance: "Vendors cannot use a legitimate interest legal basis. Only consent is available for this purpose.",
      tags: ["storage", "cookies", "device-recognition"]
    },
    {
      id: "purpose-2",
      number: 2,
      name: "Use limited data to select advertising",
      userFriendlyText: "Advertising can be shown to you based on limited data, such as the website or app you are using, your non-precise location, your device type, or which content you are interacting with (or have interacted with) (for example, to limit the number of times an ad is shown to you).",
      illustrations: [
        "A car manufacturer wants to promote its electric vehicles to environmentally conscious users living in the city. The advertising is shown on a page with related content (such as an article about actions to reduce your carbon footprint) after having been requested from an ad technology provider. The ad technology provider does not build a profile of the user.",
        "A large, online publisher wants to work with an advertising technology provider to improve the monetisation of its editorially created content. The ad technology provider serves non-personalised advertising based on context. It does not create, enrich, or use user profiles."
      ],
      legalBases: ["consent", "legitimate-interest"],
      vendorGuidance: "Vendors claiming legitimate interest must ensure that processing remains limited and does not involve profiling.",
      tags: ["advertising", "contextual", "limited-data"]
    },
    {
      id: "purpose-3",
      number: 3,
      name: "Create profiles for personalised advertising",
      userFriendlyText: "Information about your activity on this service (such as forms you submit, content you look at) can be stored and combined with other information about you (for example, information from your previous activity on this service or other websites or apps, information you have provided to it directly) or similar users to build or improve a profile about you (which might for example include possible interests and personal aspects). Your profile can be used (also later) to present advertising that appears more relevant based on your possible interests by this and other entities.",
      illustrations: [
        "If you read several articles about the best ways to raise a dog, a pet food company could infer you have a dog and show you ads for dog food on another site or app.",
        "An apparel company wishes to promote its new line of high-end fashion. It partners with an advertising technology provider that collects personal data from users (including what pages a user visits). The advertising technology provider creates an interest profile from the data collected and matches the profile with the apparel company's campaign for high-end fashion."
      ],
      legalBases: ["consent"],
      vendorGuidance: "Consent only. Cannot be used under legitimate interest. Profile building for advertising requires explicit user consent.",
      tags: ["profiling", "personalised-advertising", "profile-building"]
    },
    {
      id: "purpose-4",
      number: 4,
      name: "Use profiles to select personalised advertising",
      userFriendlyText: "Advertising can be shown to you based on a profile about you (which might for example include your possible interests, other websites or apps you have visited, or demographic info). This can include showing you an ad based on your browsing or app activity, how you interact with content you are shown, your possible interests or other personal aspects.",
      illustrations: [
        "An online retailer wants to advertise a limited sale on running shoes. It wants to target advertising to users who have previously looked at running shoes on its mobile app. Tracking technologies might be used to recognise that you have previously visited the mobile app to purchase running shoes, in order to present you with the corresponding advertisement on the app.",
        "A profile built about you is used to present advertising that could be relevant to your possible interests, whether on an app or a website. For example, you may be shown a job advert based on prior searches you made on a recruitment website."
      ],
      legalBases: ["consent"],
      vendorGuidance: "Consent only. Vendors must not use profiles for ad selection under legitimate interest.",
      tags: ["personalised-advertising", "targeting", "profile-use"]
    },
    {
      id: "purpose-5",
      number: 5,
      name: "Create profiles to personalise content",
      userFriendlyText: "Information about your activity on this service (for instance, forms you submit, non-advertising content you look at) can be stored and combined with other information about you (such as your previous activity on this service or other websites or apps, information you provided to it directly) or similar users to build or improve a profile about you (which might for example include possible interests and personal aspects). Your profile can be used (also later) to present content that appears more relevant based on your possible interests, such as by adapting the order in which content is shown to you, so that it is even easier for you to find content that matches your interests.",
      illustrations: [
        "You read several articles on how to build a treehouse on a social media platform. The operator of the social media platform uses this information to build a profile about you, to then show you content about gardens and DIY projects on another social media platform it owns.",
        "You have been reading several personal finance articles on a news website. To better match your interests, the content you are shown will be re-ranked based on your profile, which might include the fact that you enjoy reading personal finance articles."
      ],
      legalBases: ["consent"],
      vendorGuidance: "Consent only. Profile building for content personalisation requires explicit user consent.",
      tags: ["profiling", "personalised-content", "profile-building"]
    },
    {
      id: "purpose-6",
      number: 6,
      name: "Use profiles to select personalised content",
      userFriendlyText: "Content can be shown to you based on a profile about you (which might for example include your possible interests, other websites or apps you have visited, or demographic info). This can for example be used to adapt the order in which content is shown to you, so that it is even easier for you to find (non-advertising) content that matches your interests.",
      illustrations: [
        "You have created a profile on a news website where you have registered for newsletters about digital marketing. Based on this profile, relevant content about digital marketing is shown to you on another website the news company also runs.",
        "You read articles about vegetarian food on a cooking app. The app uses your interest in healthy eating to present you a list of suggested recipes when you open the app."
      ],
      legalBases: ["consent"],
      vendorGuidance: "Consent only. Vendors must not use profiles for content selection under legitimate interest.",
      tags: ["personalised-content", "targeting", "profile-use"]
    },
    {
      id: "purpose-7",
      number: 7,
      name: "Measure advertising performance",
      userFriendlyText: "The performance and effectiveness of ads that you see or interact with can be measured. For example, whether an ad was served, your interaction with an ad (e.g. whether you clicked on it or not), and whether the ad led to the desired outcome (e.g. whether you bought something or downloaded an app).",
      illustrations: [
        "An advertiser wants to measure whether users watching their ads tend to subsequently visit the advertiser's website.",
        "A publisher wants to know how many people who clicked on an ad in their app went on to buy the product that was advertised."
      ],
      legalBases: ["consent", "legitimate-interest"],
      vendorGuidance: "Vendors claiming legitimate interest must demonstrate they are only measuring ad performance and not building profiles.",
      tags: ["measurement", "advertising", "analytics"]
    },
    {
      id: "purpose-8",
      number: 8,
      name: "Measure content performance",
      userFriendlyText: "The performance and effectiveness of content that you see or interact with can be measured. For example, whether you read an article, watch a video, listen to a podcast, or look at a product description, how long you spent on this service and the web pages you visit etc.",
      illustrations: [
        "A publisher wants to understand how many users read a particular article to understand which topics attract the most interest.",
        "A content provider wants to know how much time users spend reading its online magazine on average and whether users also visit other pages on the website or app."
      ],
      legalBases: ["consent", "legitimate-interest"],
      vendorGuidance: "Vendors claiming legitimate interest must ensure that measurement is limited to content performance without profiling.",
      tags: ["measurement", "content", "analytics"]
    },
    {
      id: "purpose-9",
      number: 9,
      name: "Understand audiences through statistics or combinations of data from different sources",
      userFriendlyText: "Reports can be generated based on the combination of data sets (like user profiles, statistics, market research, analytics data) regarding your interactions and those of other users with advertising or (non-advertising) content to identify common characteristics (for instance, to determine which target audiences are more receptive to an ad campaign or to certain contents).",
      illustrations: [
        "The owner of an online bookstore wants to develop commercial insights by understanding which books are most popular with users aged 25 to 34. For this purpose, it generates anonymous aggregate statistics based on users' browsing data.",
        "An advertising intermediary gathers information about the audience that saw its client's ad, to help the client plan future campaigns and understand which audience interacted with the ad."
      ],
      legalBases: ["consent", "legitimate-interest"],
      vendorGuidance: "Vendors must ensure that audience understanding is conducted on aggregated or anonymised data when relying on legitimate interest.",
      tags: ["analytics", "audience", "statistics", "market-research"]
    },
    {
      id: "purpose-10",
      number: 10,
      name: "Develop and improve services",
      userFriendlyText: "Your data can be used to improve existing systems and software, and to develop new products. For example, analysing how you navigate on a website could help a company improve the structure of its website for a better user experience.",
      illustrations: [
        "A technology platform working with a social media provider notices an increase in mobile app usage. It separates its data for mobile and desktop users, and uses mobile data to improve the in-app experience.",
        "An advertiser is looking for a way to improve the relevance of the ads it selects for display on a publisher's website. By analysing the navigation behaviour of users on the website, the advertiser refines targeting criteria."
      ],
      legalBases: ["consent", "legitimate-interest"],
      vendorGuidance: "When relying on legitimate interest, vendors must limit processing to what is strictly necessary for service improvement and not use it for profiling.",
      tags: ["development", "improvement", "product"]
    },
    {
      id: "purpose-11",
      number: 11,
      name: "Use limited data to select content",
      userFriendlyText: "Content can be shown to you based on limited data, such as the website or app you are using, your non-precise location, your device type, or which content you are interacting with (or have interacted with) (for example, to limit the number of times a video or an article is shown to you).",
      illustrations: [
        "A travel magazine has published an article on its website about the best places to visit in 2024, and it selects a related sponsored video about the next European Capital of Culture to show alongside the article based on the content.",
        "A news app shows a weather forecast widget on its homepage. The widget shows the forecast for the user's current city based on non-precise location data (for example, the city derived from the IP address)."
      ],
      legalBases: ["consent", "legitimate-interest"],
      vendorGuidance: "Vendors claiming legitimate interest must ensure that processing remains limited and does not involve building user profiles for content selection.",
      tags: ["content", "contextual", "limited-data"]
    }
  ],

  specialPurposes: [
    {
      id: "special-purpose-1",
      number: 1,
      name: "Ensure security, prevent and detect fraud, and fix errors",
      userFriendlyText: "Your data can be used to monitor for and prevent unusual and possibly fraudulent activity (for example, regarding advertising, ad clicks by bots), and ensure systems and processes work properly and securely. It can also be used to correct any problems you, the publisher, or the advertiser may encounter in the delivery of content and ads and in your interaction with them.",
      legalBases: ["legitimate-interest"],
      note: "Users do not have a right to object to this processing via the Framework. Vendors and CMPs may provide additional means outside the Framework."
    },
    {
      id: "special-purpose-2",
      number: 2,
      name: "Deliver and present advertising and content",
      userFriendlyText: "Certain information (like an IP address or device capabilities) is used to ensure the technical compatibility of the content or advertising, and to facilitate the transmission of the content or ad to your device.",
      legalBases: ["legitimate-interest"],
      note: "Users do not have a right to object to this processing via the Framework. Vendors and CMPs may provide additional means outside the Framework."
    },
    {
      id: "special-purpose-3",
      number: 3,
      name: "Save and communicate privacy choices",
      userFriendlyText: "The choices you make regarding the purposes and entities listed in this notice are saved and made available to those entities in the form of digital signals (such as a string of characters). This is necessary in order to enable both this service and those entities to respect such choices.",
      legalBases: ["legitimate-interest"],
      note: "Users do not have a right to object to this processing via the Framework. Vendors and CMPs may provide additional means outside the Framework."
    }
  ],

  features: [
    {
      id: "feature-1",
      number: 1,
      name: "Match and combine data from other data sources",
      userFriendlyText: "Information about your activity on this service may be matched and combined with other information relating to you and originating from various sources (for instance your activity on a separate online service, your use of a loyalty card, etc.) in support of the purposes explained in this notice.",
      vendorGuidance: "This feature does not have a separate legal basis; it must be used in conjunction with a declared purpose."
    },
    {
      id: "feature-2",
      number: 2,
      name: "Link different devices",
      userFriendlyText: "In support of the purposes explained in this notice, your device might be considered as likely linked to other devices that belong to you or your household (for instance because you are logged in to the same service on both your phone and your computer, or because you use the same Internet connection on both devices).",
      vendorGuidance: "This feature does not have a separate legal basis; it must be used in conjunction with a declared purpose."
    },
    {
      id: "feature-3",
      number: 3,
      name: "Identify devices based on information transmitted automatically",
      userFriendlyText: "Your device might be distinguished from other devices based on information it automatically sends when accessing the Internet (for instance, the IP address of your Internet connection or the type of browser you are using) in support of the purposes explained in this notice.",
      vendorGuidance: "This feature does not have a separate legal basis; it must be used in conjunction with a declared purpose."
    }
  ],

  specialFeatures: [
    {
      id: "special-feature-1",
      number: 1,
      name: "Use precise geolocation data",
      userFriendlyText: "With your acceptance, your precise location (within a radius of less than 500 metres) may be used in support of the purposes explained in this notice.",
      requiresOptIn: true
    },
    {
      id: "special-feature-2",
      number: 2,
      name: "Actively scan device characteristics for identification",
      userFriendlyText: "With your acceptance, certain specific characteristics of your device may be requested and used to distinguish it from other devices (such as the installed fonts or plugins, the resolution of your screen) in support of the purposes explained in this notice.",
      requiresOptIn: true
    }
  ],

  stacks: [
    { id: "stack-1", number: 1, name: "Precise geolocation data, and identification through device scanning", includedPurposes: [], includedSpecialFeatures: [1, 2] },
    { id: "stack-2", number: 2, name: "Use limited data to select advertising and measure advertising performance", includedPurposes: [2, 7], includedSpecialFeatures: [] },
    { id: "stack-3", number: 3, name: "Use limited data to select advertising, create profiles for personalised advertising, and use profiles to select personalised advertising", includedPurposes: [2, 3, 4], includedSpecialFeatures: [] },
    { id: "stack-4", number: 4, name: "Use limited data to select advertising, measure advertising performance, and understand audiences", includedPurposes: [2, 7, 9], includedSpecialFeatures: [] },
    { id: "stack-5", number: 5, name: "Use limited data to select advertising, create profiles for personalised advertising, and measure advertising performance", includedPurposes: [2, 3, 7], includedSpecialFeatures: [] },
    { id: "stack-6", number: 6, name: "Use limited data to select advertising, use profiles to select personalised advertising, and measure advertising performance", includedPurposes: [2, 4, 7], includedSpecialFeatures: [] },
    { id: "stack-7", number: 7, name: "Use limited data to select advertising, use profiles to select personalised advertising, measure advertising performance, and understand audiences", includedPurposes: [2, 4, 7, 9], includedSpecialFeatures: [] },
    { id: "stack-8", number: 8, name: "Use limited data to select advertising, create and use profiles for personalised advertising, and measure advertising performance", includedPurposes: [2, 3, 4, 7], includedSpecialFeatures: [] },
    { id: "stack-9", number: 9, name: "Use limited data to select advertising, create and use profiles for personalised advertising, measure advertising performance, and understand audiences", includedPurposes: [2, 3, 4, 7, 9], includedSpecialFeatures: [] },
    { id: "stack-10", number: 10, name: "Create and use profiles for personalised advertising", includedPurposes: [3, 4], includedSpecialFeatures: [] },
    { id: "stack-11", number: 11, name: "Create and use profiles to personalise content", includedPurposes: [5, 6], includedSpecialFeatures: [] },
    { id: "stack-12", number: 12, name: "Use profiles to select personalised content, measure content performance, and use limited data to select content", includedPurposes: [6, 8, 11], includedSpecialFeatures: [] },
    { id: "stack-13", number: 13, name: "Use profiles to select personalised content, measure content performance, understand audiences, and use limited data to select content", includedPurposes: [6, 8, 9, 11], includedSpecialFeatures: [] },
    { id: "stack-14", number: 14, name: "Create and use profiles to personalise content, measure content performance, and use limited data to select content", includedPurposes: [5, 6, 8, 11], includedSpecialFeatures: [] },
    { id: "stack-15", number: 15, name: "Create and use profiles to personalise content, measure content performance, understand audiences, and use limited data to select content", includedPurposes: [5, 6, 8, 9, 11], includedSpecialFeatures: [] },
    { id: "stack-16", number: 16, name: "Create and use profiles to personalise content, measure content performance, understand audiences, develop and improve services, and use limited data to select content", includedPurposes: [5, 6, 8, 9, 10, 11], includedSpecialFeatures: [] },
    { id: "stack-17", number: 17, name: "Measure advertising and content performance, and understand audiences", includedPurposes: [7, 8, 9], includedSpecialFeatures: [] },
    { id: "stack-18", number: 18, name: "Measure advertising and content performance", includedPurposes: [7, 8], includedSpecialFeatures: [] },
    { id: "stack-19", number: 19, name: "Measure advertising performance and understand audiences", includedPurposes: [7, 9], includedSpecialFeatures: [] },
    { id: "stack-20", number: 20, name: "Measure advertising and content performance, understand audiences, and develop and improve services", includedPurposes: [7, 8, 9, 10], includedSpecialFeatures: [] },
    { id: "stack-21", number: 21, name: "Measure content performance, understand audiences, and develop and improve services", includedPurposes: [8, 9, 10], includedSpecialFeatures: [] },
    { id: "stack-22", number: 22, name: "Measure content performance and develop and improve services", includedPurposes: [8, 10], includedSpecialFeatures: [] },
    { id: "stack-23", number: 23, name: "Use limited data to select advertising, use profiles to select personalised advertising and content, and measure advertising and content performance", includedPurposes: [2, 4, 6, 7, 8, 11], includedSpecialFeatures: [] },
    { id: "stack-24", number: 24, name: "Use limited data to select advertising, use profiles to select personalised advertising and content, measure advertising and content performance, and understand audiences", includedPurposes: [2, 4, 6, 7, 8, 9, 11], includedSpecialFeatures: [] },
    { id: "stack-25", number: 25, name: "Use limited data to select advertising, create and use profiles for personalised advertising and content, and measure advertising and content performance", includedPurposes: [2, 3, 4, 5, 6, 7, 8, 11], includedSpecialFeatures: [] },
    { id: "stack-26", number: 26, name: "Use limited data to select advertising, create and use profiles for personalised advertising and content, measure advertising and content performance, and understand audiences", includedPurposes: [2, 3, 4, 5, 6, 7, 8, 9, 11], includedSpecialFeatures: [] },
    { id: "stack-27", number: 27, name: "Create profiles for personalised advertising and content", includedPurposes: [3, 5], includedSpecialFeatures: [] },
    { id: "stack-28", number: 28, name: "Use limited data to select advertising, use profiles to select personalised advertising and content", includedPurposes: [2, 4, 6, 11], includedSpecialFeatures: [] },
    { id: "stack-29", number: 29, name: "Use limited data to select advertising and measure advertising and content performance", includedPurposes: [2, 7, 8, 9], includedSpecialFeatures: [] },
    { id: "stack-30", number: 30, name: "Use limited data to select advertising, use profiles to select personalised advertising and content, measure advertising and content performance, understand audiences, and use limited data to select content", includedPurposes: [2, 4, 5, 6, 7, 8, 9, 11], includedSpecialFeatures: [] },
    { id: "stack-31", number: 31, name: "Use limited data to select advertising, use profiles to select personalised advertising and content, measure advertising and content performance, understand audiences, develop and improve services, and use limited data to select content", includedPurposes: [2, 4, 5, 6, 7, 8, 9, 10, 11], includedSpecialFeatures: [] },
    { id: "stack-32", number: 32, name: "Use limited data to select advertising, create and use profiles to personalise content, measure advertising and content performance, understand audiences, and use limited data to select content", includedPurposes: [2, 5, 6, 7, 8, 9, 11], includedSpecialFeatures: [] },
    { id: "stack-33", number: 33, name: "Use limited data to select advertising, create and use profiles to personalise content, measure advertising and content performance, understand audiences, develop and improve services, and use limited data to select content", includedPurposes: [2, 5, 6, 7, 8, 9, 10, 11], includedSpecialFeatures: [] },
    { id: "stack-34", number: 34, name: "Use limited data to select advertising, create and use profiles to personalise content, measure content performance, understand audiences, and use limited data to select content", includedPurposes: [2, 5, 6, 8, 9, 11], includedSpecialFeatures: [] },
    { id: "stack-35", number: 35, name: "Use limited data to select advertising, create and use profiles to personalise content, measure content performance, understand audiences, develop and improve services, and use limited data to select content", includedPurposes: [2, 5, 6, 8, 9, 10, 11], includedSpecialFeatures: [] },
    { id: "stack-36", number: 36, name: "Use limited data to select advertising, create and use profiles to personalise content, measure advertising performance, and use limited data to select content", includedPurposes: [2, 5, 6, 7, 11], includedSpecialFeatures: [] },
    { id: "stack-37", number: 37, name: "Use limited data to select advertising, create and use profiles to personalise content, measure advertising performance, develop and improve services, and use limited data to select content", includedPurposes: [2, 5, 6, 7, 10, 11], includedSpecialFeatures: [] },
    { id: "stack-38", number: 38, name: "Use limited data to select advertising, create and use profiles for personalised advertising, measure advertising performance, and develop and improve services", includedPurposes: [2, 3, 4, 7, 10], includedSpecialFeatures: [] },
    { id: "stack-39", number: 39, name: "Use limited data to select advertising, create and use profiles for personalised advertising, measure advertising performance, understand audiences, and develop and improve services", includedPurposes: [2, 3, 4, 7, 9, 10], includedSpecialFeatures: [] },
    { id: "stack-40", number: 40, name: "Use limited data to select advertising, create and use profiles for personalised advertising, measure advertising and content performance, understand audiences, and develop and improve services", includedPurposes: [2, 3, 4, 7, 8, 9, 10], includedSpecialFeatures: [] },
    { id: "stack-41", number: 41, name: "Use limited data to select advertising, create and use profiles for personalised advertising, use profiles to select personalised content, measure advertising and content performance, understand audiences, develop and improve services, and use limited data to select content", includedPurposes: [2, 3, 4, 6, 7, 8, 9, 10, 11], includedSpecialFeatures: [] },
    { id: "stack-42", number: 42, name: "Use limited data to select advertising, create and use profiles for personalised advertising and content, measure advertising and content performance, understand audiences, develop and improve services, and use limited data to select content", includedPurposes: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11], includedSpecialFeatures: [] },
    { id: "stack-43", number: 43, name: "Measure content performance and use limited data to select content", includedPurposes: [8, 11], includedSpecialFeatures: [] },
    { id: "stack-44", number: 44, name: "Create and use profiles to personalise content and use limited data to select content", includedPurposes: [5, 6, 11], includedSpecialFeatures: [] },
    { id: "stack-45", number: 45, name: "Use limited data to select advertising, measure advertising performance, understand audiences, and develop and improve services", includedPurposes: [2, 7, 9, 10], includedSpecialFeatures: [] }
  ],

  dataCategories: [
    { id: "data-category-1", number: 1, name: "IP addresses", userFriendlyText: "Your IP address is a number assigned to your device by your Internet Service Provider to send and receive information on the Internet." },
    { id: "data-category-2", number: 2, name: "Device characteristics", userFriendlyText: "Technical characteristics of the device you are using, for example its type (smartphone, tablet, etc.), operating system (iOS, Android, etc.), screen resolution, and browser type." },
    { id: "data-category-3", number: 3, name: "Device identifiers", userFriendlyText: "A device identifier is a unique string of characters assigned to your device or browser to distinguish it from others." },
    { id: "data-category-4", number: 4, name: "Probabilistic identifiers", userFriendlyText: "A probabilistic identifier can be created by combining characteristics associated with your device (the type of browser or operating system used, for instance) that is likely but not certain to be unique." },
    { id: "data-category-5", number: 5, name: "Authentication-derived identifiers", userFriendlyText: "An identifier based on or derived from account authentication data. For example, a hashed email address or phone number used after you log in." },
    { id: "data-category-6", number: 6, name: "Browsing and interaction data", userFriendlyText: "Your activity online, including websites you visit, apps you use, content you view, and how you interact with content and ads." },
    { id: "data-category-7", number: 7, name: "User-provided data", userFriendlyText: "Data you have actively provided, such as through forms, account registrations, purchases, or other direct interactions." },
    { id: "data-category-8", number: 8, name: "Non-precise location data", userFriendlyText: "Your approximate location, which may be derived from your IP address or other non-precise means (for example, your city or region)." },
    { id: "data-category-9", number: 9, name: "Precise location data", userFriendlyText: "Your precise geographic location (within a radius of less than 500 metres), as determined for example by GPS, Wi-Fi, or cell tower data on a mobile device." },
    { id: "data-category-10", number: 10, name: "Users' profiles", userFriendlyText: "Certain characteristics or attributes (for example, interests, demographic data) used to create or edit a profile about you for use in personalised advertising or content." },
    { id: "data-category-11", number: 11, name: "Privacy choices", userFriendlyText: "Your preferences and choices regarding privacy, consent, and objections to data processing, as expressed through consent management interfaces." }
  ]

};
