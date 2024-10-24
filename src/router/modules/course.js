export default [
  {
    path: "details",
    name: "COURSE_DETAILS",
    meta: {
      title: "课程详情",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/course/details.vue"),
  },
  {
    path: "chapter",
    name: "COURSE_CHAPTER",
    meta: {
      title: "课程章节",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/course/chapter.vue"),
  },
  {
    path: "chapterTest",
    name: "COURSE_CHAPTER_TEST",
    meta: {
      title: "综合测评",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/course/chapterTest.vue"),
  },
  {
    path: "chapterStrainTest",
    name: "COURSE_CHAPTER_STRAIN_TEST",
    meta: {
      title: "应变测试",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/course/chapterStrainTest.vue"),
  },

  {
    path: "strainTest",
    name: "COURSE_STRAIN_TEST",
    meta: {
      title: "应变测试",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/course/strainTest.vue"),
  },

  {
    path: "chapteRother",
    name: "COURSE_CHAPTER_ROTHER",
    meta: {
      title: "其他章节",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/course/chapteRother.vue"),
  },
  {
    path: "studyVideo",
    name: "COURSE_STUDY_VIDEO",
    meta: {
      title: "视频学习",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/course/studyVideo.vue"),
  },

  {
    path: "studyWord",
    name: "COURSE_STUDY_WORD",
    meta: {
      title: "单词学习（中英）",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/course/studyWord.vue"),
  },

  {
    path: "studyWordTest",
    name: "COURSE_STUDY_WORD_TEST",
    meta: {
      title: "单词学习（中英）测试",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/course/studyWordTest.vue"),
  },

  {
    path: "studyWordEnglish",
    name: "COURSE_STUDY_WORD_ENGLISH",
    meta: {
      title: "单词学习（英）",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/course/studyWordEnglish.vue"),
  },

  {
    path: "studyWordEnglishTest",
    name: "COURSE_STUDY_WORD_ENGLISH_TEST",
    meta: {
      title: "单词学习（英）测试",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/course/studyWordEnglishTest.vue"),
  },

  {
    path: "studyTest",
    name: "COURSE_STUDY_TEST",
    meta: {
      title: "单元测试",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/course/studyTest.vue"),
  },

  {
    path: "testResults",
    name: "COURSE_TEST_RESULTS",
    meta: {
      title: "测试结果",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/course/testResults.vue"),
  },

  {
    path: "testPractice",
    name: "COURSE_TEST_PRACTICE",
    meta: {
      title: "错题练习",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/course/testPractice.vue"),
  },

  // {
  //     path: "abcd22",
  //     name: "abcd22",
  //     meta: {
  //         title: "错题测试",
  //         icon: "",
  //         isNav: true,
  //     },
  //     component: () =>
  //         import ("@/views/course/abcd22.vue"),
  // },

  {
    path: "errorTest",
    name: "COURSE_ERROR_TEST",
    meta: {
      title: "错题/综合测试",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/course/errorTest.vue"),
  },

  {
    path: "errorTestDetails",
    name: "ERROR_TEST_DETAILS",
    meta: {
      title: "错题/综合测试结果",
      icon: "",
    },
    component: () => import("@/views/course/errorTestDetails.vue"),
  },

  {
    path: "evaluate",
    name: "COURSE_EVALUATE",
    meta: {
      title: "课程评价",
      icon: "",
    },
    component: () => import("@/views/course/evaluate.vue"),
  },

  {
    path: "wordTestDetails",
    name: "WORD_TEST_DETAILS",
    meta: {
      title: "关键词测试结果",
      icon: "",
    },
    component: () => import("@/views/course/wordTestDetails.vue"),
  },
];
