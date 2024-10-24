<style lang="scss" scoped></style>

<template>
  <section class="home">
    <!-- banner -->
    <div class="home-banner">
      <div class="home-wp">
        <div class="home-banner-nav">
          <img
            class="logo wow animate__animated animate__fadeInDown"
            src="@assets/images/home/logo.jpg"
            alt=""
          />
          <div class="btn wow animate__animated animate__fadeInDown">
            <p @click="handleGoTo('blog')">博客</p>
            <span class="one" @click="handleGoTo('login')"><em>登录</em></span>
            <span class="two" @click="handleGoTo"><em>免费注册</em></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 视频 -->
    <div class="home-video">
      <div class="home-wp">
        <div class="home-video-title wow animate__animated animate__fadeInUp">
          <h2>
            易北 MBLEx
            美国联邦按摩考试辅导课程，让英文<em>0基础</em>的华人按摩师，也能<em>轻松</em>通过考试！
          </h2>
          <h4>
            只需要一台手机或电脑，您就可以随时随地学习，完全<em>不耽误</em>生活和工作！
          </h4>
        </div>
        <div class="home-video-content">
          <iframe
            src="https://player.vimeo.com/video/845937855?h=f78f1dcc1f"
            width="100%"
            height="100%"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></iframe>
        </div>
        <div class="home-video-btn wow animate__animated animate__fadeInUp">
          <span @click="handleGoTo"><em>免费注册</em></span>
        </div>
      </div>
    </div>

    <div class="home-banner-thumb">
      <div class="home-wp">
        <div class="home-banner-swiper wow animate__animated animate__fadeInUp">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="image">
                <img src="@assets/images/home/one-88.jpg" alt="" />
              </div>
            </div>
            <div class="swiper-slide">
              <div class="image">
                <img src="@assets/images/home/one-89.jpg" alt="" />
              </div>
            </div>
            <div class="swiper-slide">
              <div class="image">
                <img src="@assets/images/home/one-90.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 文字 -->
    <div class="home-text">
      <div class="home-wp">
        <div class="home-text-item">
          <h4 class="wow animate__animated animate__backInLeft">
            这些是不是你的<em>情况</em>？
          </h4>
          <div class="wow animate__animated animate__fadeInUp">
            <p>很多学员在来易北之前，听了很多课，买了很多书，背了很多题；</p>
            <p>
              却<em>越学越混乱，越学越没信心</em>，一提起联邦考试和按摩执照，就愁云密布。
            </p>
            <p>
              还有一些学员，因为英文不好，听不懂课，只好机械刷题，结果去参加了好多次考试，都以失败告终。
            </p>
            <p>
              花费了高额的考试费（每次<em>$265</em>）不说，更浪费了宝贵的时间。
            </p>
            <p>
              做工少了，小费也少了，更不要说打击自信心，有人愁得头发都快掉光了！
            </p>
            <p>
              年纪稍微大一点的按摩师，更是苦不堪言，语言基础不好就算了，记忆力和理解能力也赶不上年轻人，
            </p>
            <p>
              加上老师讲得不清不楚，书里的知识点又是全英文的，根本就看不懂，
            </p>
            <p>只好埋头当鸵鸟，<em>祈祷自己不会因为无证做工而被抓</em>。</p>
          </div>
        </div>
        <div class="home-text-item">
          <h4 class="wow animate__animated animate__backInRight">
            你敢承担无证做工被抓的<em>风险</em>吗？
          </h4>
          <div class="wow animate__animated animate__fadeInUp">
            <p>
              这两年来，按摩局查得越来越严，无证做工的风险也越来越高，按摩考试也越来越难。
            </p>
            <p>
              以前背背题就能凭运气考过，现在只有考试大纲，<em
                >完全没有原题，</em
              >
            </p>
            <p>那些想靠刷题和运气通过联邦考试的学员也越来越无望。</p>
            <p>（如果有人向你兜售按摩考试“原题”，别信他，一定是骗子！）</p>
          </div>
        </div>
        <div class="home-text-item smart">
          <h4 class="wow animate__animated animate__backInLeft">
            易北考过的学员都是<em>学霸</em>吗？
          </h4>
          <el-row class="row wow animate__animated animate__fadeIn">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="row-thumb wow animate__animated animate__fadeInLeft">
                <img src="@assets/images/home/four-76.jpg" alt="" />
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="row-text wow animate__animated animate__fadeInRight">
                <h6>01</h6>
                <p>
                  在易北，我们有连英文的123都分不清的学员，在学习一个半月之后，一举通过考试。
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="home-text-item smart">
          <el-row class="row wow animate__animated animate__fadeIn">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="row-text wow animate__animated animate__fadeInLeft">
                <h6>02</h6>
                <p>
                  在易北，我们年龄最大的学员超过了60岁，只学了两个月就通过了考试。
                </p>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="row-thumb wow animate__animated animate__fadeInRight">
                <img src="@assets/images/home/four-50.jpg" alt="" />
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="home-text-item smart">
          <el-row class="row wow animate__animated animate__fadeIn">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="row-thumb wow animate__animated animate__fadeInLeft">
                <img src="@assets/images/home/four-51.jpg" alt="" />
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="row-text wow animate__animated animate__fadeInRight">
                <h6>03</h6>
                <p>
                  在易北，我们有边工作边照顾两个孩子的单亲妈妈，利用碎片时间，花了半年时间成功拿到了按摩执照。
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="home-text-item smart">
          <el-row class="row wow animate__animated animate__fadeIn">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="row-thumb wow animate__animated animate__fadeInLeft">
                <img src="@assets/images/home/four-52.jpg" alt="" />
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="row-text wow animate__animated animate__fadeInRight">
                <h6>04</h6>
                <p>
                  在易北，我们还有考了8次都没考过，已经绝望的学员，在张老师的鼓励下，重新开始，一次考过。
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="home-text-hint wow animate__animated animate__fadeIn">
        <p>
          在易北，年龄大、英文0基础、记性不好、理解能力差，这些都不是问题。
        </p>
        <p>唯一的问题是： 你是否已经放弃了联邦考试？</p>
      </div>
      <div class="home-text-item">
        <h4 class="wow animate__animated animate__bounceIn">
          易北的考试通过率为什么会？<em>这么高</em>？
        </h4>
        <p class="wow animate__animated animate__fadeInUp">
          我们的自信，源自我们的实力。
        </p>
        <p class="wow animate__animated animate__fadeInUp">
          能达到<em>全美最高的考试通过率</em>，我们靠的，可不是运气。
        </p>
      </div>
    </div>

    <!-- 视频 -->
    <div class="home-video">
      <div class="home-wp">
        <h4 class="wow animate__animated animate__fadeIn">
          针对华人按摩师英语能力普遍偏弱的情况：
        </h4>
        <div class="home-video-item">
          <el-row class="row wow animate__animated animate__fadeIn">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="row-thumb wow animate__animated animate__flipInX">
                <a
                  href="https://www.youtube.com/watch?v=0vVB5FJYqAk"
                  target="_blank"
                >
                  <img src="@assets/images/home/two-53.jpg" alt="" />
                </a>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <p class="wow animate__animated animate__lightSpeedInRight">
                我们采用中英双语的视频讲解方法，让学员真正学懂要考的知识点！
              </p>
            </el-col>
          </el-row>
        </div>
        <div class="home-video-item">
          <el-row class="row">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <p class="on wow animate__animated animate__lightSpeedInLeft">
                我们采用趣味记单词的方法，用有趣的、通俗易懂的方式，帮大家轻松背下专业词汇！
              </p>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="row-thumb wow animate__animated animate__flipInX">
                <a
                  href="https://www.youtube.com/watch?v=g8BM0WDEoEg"
                  target="_blank"
                >
                  <img src="@assets/images/home/two-54.jpg" alt="" />
                </a>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="home-video-item">
          <el-row class="row wow animate__animated animate__fadeIn">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="row-thumb  wow animate__animated animate__flipInX">
                <a
                  href="https://www.youtube.com/watch?v=R6xow9bylwA"
                  target="_blank"
                >
                  <img src="@assets/images/home/two-55.jpg" alt="" />
                </a>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <p class="wow animate__animated animate__flipInX">
                我们还有独家研发的关键词记忆法，让同学们只用背下题目中的关键词，而不是整个题目，不仅仅减轻了记忆负担，更可以应对题目的不断变化！
              </p>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <!-- 针对 -->
    <div class="home-contrapose">
      <div class="home-wp">
        <div class="home-contrapose-item">
          <el-row class="row wow animate__animated animate__fadeIn">
            <el-col :xs="24" :sm="12" :md="16" :lg="16" :xl="16">
              <h5 class="wow animate__animated animate__fadeInUp">
                针对记性不好、学了又忘的学员：
              </h5>
              <div
                class="wow animate__animated animate__fadeInUp"
                data-wow-delay="0.1s"
              >
                <p>- 我们以理解促记忆，理解，永远是最好的记忆方式！</p>
                <p>
                  -我们先在视频课程中讲解题目和对应的知识点，然后利用中英单词卡片，反复记忆关键词，再对每个小节的知识点进行测验，从头开始就把知识点学扎实，不怕您学了又忘！
                </p>
                <p>
                  -我们还研发了易北独家的错题集，学完章节知识后，您可以集中复习所有做错的题目，还能参考所有学员都容易做错的题目，精准而高效地查缺补漏！
                </p>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="row-thumb wow animate__animated animate__fadeInRight">
                <img src="@assets/images/home/zt-82.jpg" alt="" />
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="home-contrapose-item">
          <el-row class="row wow animate__animated animate__fadeIn">
            <el-col :xs="24" :sm="12" :md="16" :lg="16" :xl="16">
              <h5 class="wow animate__animated animate__fadeUp">
                针对年龄偏大的学员：
              </h5>
              <div
                class="wow animate__animated animate__fadeInUp"
                data-wow-delay="0.1s"
              >
                <p>
                  -我们采用录播课程的授课方式，听不懂的地方可以倒回去反复听，不用担心跟不上其他学员的节奏
                </p>
                <p>
                  - 我们有 24
                  小时微信学习群，不理解的知识点或者不会的题目，随时都可以在微信上提问，我们会有专业的老师和热心的同学随时解答您的疑问。
                </p>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="row-thumb wow animate__animated animate__fadeInRight">
                <img src="@assets/images/home/zt-86.jpg" alt="" />
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="home-contrapose-item">
          <el-row class="row wow animate__animated animate__fadeIn">
            <el-col :xs="24" :sm="12" :md="16" :lg="16" :xl="16">
              <h5 class="wow animate__animated animate__fadeInUp">
                针对没时间学习的学员：
              </h5>
              <div
                class="wow animate__animated animate__fadeInUp"
                data-wow-delay="0.1s"
              >
                <p>
                  -我们采用远程授课的方式，只要有手机或者电脑，就能随时登陆系统进行学习，不再需要舟车劳顿，也不会占用您做工或者带孩子的时间。
                </p>
                <p>
                  -我们的系统设立了各种小任务，您只需要跟随我们的脚步，利用碎片时间也能轻松学完课程，甚至做工的时候还能用耳机收听我们的视频课程，高效利用时间！
                </p>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="row-thumb wow animate__animated animate__fadeInRight">
                <img src="@assets/images/home/zt-85.jpg" alt="" />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <!-- 学习系统 -->
    <div class="home-system">
      <div class="home-wp">
        <el-row class="row">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="wow animate__animated animate__fadeInLeft">
              <p>此外，我们还有易北独家研发的智能追踪系统。</p>
              <p>可以对每一名学员的学习数据进行追踪，</p>
              <p>
                再对这些数据进行智能分析，给出专属于个人的学习建议和考试计划！
              </p>
              <p>这在整个联邦考试培训市场上都是独一无二的！</p>
              <p>做联邦培训，我们是认真的。</p>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="row-thumb wow animate__animated animate__fadeInRight">
              <img src="@assets/images/home/three-zlzz.png" alt="" />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 手风琴 -->
    <div class="home-collapse">
      <div class="home-wp wow animate__animated animate__fadeInUp">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="我为什么要相信你们？" name="1">
            <div class="home-collapse-item">
              <p>
                易北教育已在联邦培训行业深耕了十多年。我们已经帮助过上千名华人按摩师成功通过了联邦考试。
              </p>
              <p>
                我们的学习系统经历了几代的更新，我们的课堂也从线下搬到了线上。
              </p>
              <p>但我们不要求您相信我们。我们只凭实力说话。</p>
              <p>我们的学员都来自口口相传。您或多或少，都听过易北的名字。</p>
              <p>您可以在我们的官网上免费注册账号，领取7天免费试听课程。</p>
              <p>
                如果在这 7
                天里，您喜欢张老师的授课方式，您听懂了讲解的知识点，您背下了那些专业词，您能轻松做对题目，那您就会知道，我们所说的一切都是事实，我们绝不夸大与欺骗。
              </p>
            </div>
          </el-collapse-item>
          <el-collapse-item title="课程的具体价格与时限？" name="2">
            <div class="home-collapse-item">
              <p>
                《易北联邦按摩辅导课程》目前的售价是 1199
                美金，学时为4个月（120天）,包含视频录播课程、关键词卡片背诵、章节测验与考前模拟，错题集集中练习，学习数据智能分析与考试成功率预测，还有微信1对1辅导。
              </p>
              <p>
                学期中，如果易北的工作人员基于您的学习考核建议您考试而无果，易北教育会将您的学习期限延长至六个月。
              </p>
              <p>
                学期中，如果您没有遵照易北教育的建议而自行参加考试，即使无果，您依然可以继续学习至学期结束。如因个人原因，学期结束仍未能完成课程学习，您可以选择续费，费用为200美金，学时为60天。
              </p>
              <p>
                为了避免学员一直续费而缺乏紧迫感，无法顺利通过联邦考试，易北教育特此规定：每位学员只有两次续费机会，续费两次后依旧没有通过考试的，需要先预约联邦考试，经过张老师审核学习情况后再予以续费。
              </p>
              <p>
                也许您看到 1199
                美金的售价会打退堂鼓，但每参加一次联邦考试的报名费就是 265
                美金。您自信能靠自学，参加4次考试就通过考试吗？
                我们的课程定价在联邦培训市场中绝不算低，但我们保证，一定物有所值。因为我们帮您节省的，不仅仅是高额的报名费，更节省了您的时间和投入在联邦考试上的精力。
              </p>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="home-collapse-text">
          <p class="wow animate__animated animate__fadeIn">
            早日通过联邦考试，拿到按摩执照，不再为无证做工被抓而担忧，不再为考试而失眠掉发，考虑到这些，您还觉得我们的课程贵吗？
          </p>
          <h5 class="wow animate__animated animate__zoomInLeft">
            早考过早解脱！
          </h5>
          <span class="wow animate__animated animate__fadeIn"></span>
        </div>
      </div>
    </div>

    <!-- footer -->
    <div class="home-footer">
      <div class="home-wp">
        <div class="home-footer-btn">
          <span
            @click="handleGoTo"
            class="one wow animate__animated animate__fadeInLeft"
            ><em>立即开课</em></span
          >
          <span
            @click="handleGoTo"
            class="two wow animate__animated animate__fadeInRight"
            ><em>免费试听</em></span
          >
        </div>
        <div class="home-footer-text wow animate__animated animate__fadeIn">
          <p>如果您对课程还有其他的疑问，</p>
          <p>可以添加张老师微信<em>ybmblex</em></p>
        </div>
        <div class="home-footer-qr">
          <img
            class="qr wow animate__animated animate__fadeInUp"
            src="@assets/images/home/qr.png"
            alt=""
          />
          <span class="line  wow animate__animated animate__fadeIn"></span>
          <div class="text  wow animate__animated animate__fadeInRight">
            <img src="@assets/images/home/footer-head-xls.png" alt="" />
            <div>
              <h5>易北教育</h5>
              <p>张老师</p>
            </div>
          </div>
        </div>
        <div class="home-footer-text wow animate__animated animate__fadeInUp">
          <p>或者直接拨打电话<em>(702) 829-7688</em>咨询</p>
          <p>我们可以回答您的一切问题！</p>
        </div>
      </div>
    </div>

    <div class="footer-copyright wow animate__animated animate__fadeIn">
      <div class="home-wp">
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <span>©Copyright 2023｜Weilin Chang LLC</span>
            <!-- <span>©Copyright 2023｜易北教育版权所有</span>Weilin Chang LLC -->
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="footer-copyright-qita">
              <span @click="handleGoto2('ARTICLE_DETAILS', 5)"
                >易北教育服务条款・</span
              >
              <span @click="handleGoto2('ARTICLE_DETAILS', 4)"
                >易北教育隐私政策</span
              >
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 客服弹窗 -->
    <service />
  </section>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import { getStatisNormal } from "@api/common";
import Service from "@comp/Service";
import { WOW } from "wowjs";

export default {
  components: {
    Service,
  },

  data() {
    return {
      selectNav: 0,
      issueNames: ["1"],
      statistics: {},
      activeNames: ["1"],
    };
  },

  created() {
    this.queryStatisNormal();
  },

  mounted() {
    new WOW().init();

    this.bannerSwiperInit();

    var iframe = document.querySelector("iframe");
    var player = new Vimeo.Player(iframe);
    player.play();
  },

  methods: {
    /**
     * 初始 banner swiper
     */
    bannerSwiperInit() {
      new Swiper(".home-banner-swiper", {
        autoplay: 5 * 1000,
        slidesPerView: 3,
        breakpoints: {
          768: {
            slidesPerView: 1,
          },
          992: {
            slidesPerView: 2,
          },
        },
      });
    },

    /**
     * 获取统计数据
     */
    async queryStatisNormal() {
      const { data: resData } = await getStatisNormal();
      if (!resData.data.status) return;

      this.statistics = resData.data.data;
    },

    /**
     * 跳转页面
     */
    handleGoTo(type) {
      switch (type) {
        case "login":
          this.$router.push({
            name: "LOGIN",
          });
          break;

        case "blog":
          this.$router.push({
            name: "BLOG",
          });
          break;

        default:
          this.$router.push({
            name: "REGISTERED",
          });
          break;
      }
    },

    /**
     *跳转
     */
    handleGoto2(name, id) {
      this.$router.push({
        name,
        query: {
          id,
        },
      });
    },

    handleChange() {},
  },
};
</script>
