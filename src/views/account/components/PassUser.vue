<style lang="scss" scope></style>

<template>
  <section class="pass-user">
    <div class="wp">
      <el-row class="pass-user-content" :gutter="24">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <div class="pass-user-content__left">
            <div class="head">
              <h5>
                恭喜您成功通过联邦按摩考试<br />
                顺利拿到 Pass 纸！
              </h5>
              <p>您用实践证明了努力永远不会白费！</p>
            </div>
            <div class="list">
              <ul class="pass-user-step">
                <li>
                  <div class="icon"><i class="el-icon-success"></i></div>
                  <div class="text">
                    <p>
                      {{
                        historyData.studyStartDateTime
                          | formatDate("YYYY-MM-DD")
                      }}
                    </p>
                    <h5>您注册了易北账户，开始试听课程</h5>
                  </div>
                </li>
                <li>
                  <div class="icon"><i class="el-icon-success"></i></div>
                  <div class="text">
                    <p>
                      {{ historyData.creathydate | formatDate("YYYY-MM-DD") }}
                    </p>
                    <h5>您正式加入易北，开启了学习之旅</h5>
                  </div>
                </li>
                <li>
                  <div class="icon"><i class="el-icon-success"></i></div>
                  <div class="text">
                    <p>
                      {{
                        historyData.firstCourseDateTime
                          | formatDate("YYYY-MM-DD")
                      }}
                    </p>
                    <h5>您看完了第一节课程，并完成了测试</h5>
                  </div>
                </li>
                <li>
                  <div class="icon"><i class="el-icon-success"></i></div>
                  <div class="text">
                    <p>
                      {{ historyData.joinDateTime | formatDate("YYYY-MM-DD") }}
                    </p>
                    <h5>
                      这一天，您学习了{{
                        Math.floor(
                          ((historyData.studyMaxTimes || 0) / 60 / 60) * 10
                        ) / 10
                      }}个小时，凌晨还在努力奋斗
                    </h5>
                  </div>
                </li>
                <li>
                  <div class="icon"><i class="el-icon-success"></i></div>
                  <div class="text">
                    <p>
                      {{
                        historyData.lastTestDateTime | formatDate("YYYY-MM-DD")
                      }}
                    </p>
                    <h5>
                      您完成了最后一套考前测验，通过率{{
                        Math.floor(
                          (historyData.correctpercent || 0) * 100 * 10
                        ) / 10
                      }}%
                    </h5>
                  </div>
                </li>
                <li>
                  <div class="icon"><i class="el-icon-success"></i></div>
                  <div class="text">
                    <p>{{ getUserInfo.examdate | formatDate("YYYY-MM-DD") }}</p>
                    <h5>您迈入了考场</h5>
                  </div>
                </li>
              </ul>
            </div>
            <div class="btn">
              <el-button
                style="width: 50%;"
                type="primary"
                class="el-button--big"
                @click="handleUserShare"
                >分享喜悦</el-button
              >
            </div>
          </div>
          <div class="pass-user-content__evaluate">
            <h5>课程评价</h5>
            <p>
              您觉得易北的课程怎么样？有什么需要改进的地方吗？或者您希望易北提供哪些服务呢？欢迎您在下方告诉我们！
            </p>
            <div class="btn">
              <el-button
                style="width: 50%;"
                type="primary"
                class="el-button--big"
                @click="handleGotoEvaluate"
                >去评价</el-button
              >
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <div class="pass-user-content__right">
            <div class="need">
              <h2>您也许还需要</h2>
              <ul>
                <li>
                  <h5><i class="el-icon-document"></i>申请执照</h5>
                  <el-button
                    @click="queryApplyInfo('PASS_APPLY')"
                    type="danger"
                    :loading="loading"
                    >前 往</el-button
                  >
                </li>
                <li>
                  <h5><i class="el-icon-document"></i>更新执照</h5>
                  <el-button
                    @click="
                      queryApplyInfo('PASS_LICENSE_UPDATA', { updata: 1 })
                    "
                    :loading="loading"
                    type="danger"
                    >前 往</el-button
                  >
                </li>
                <li>
                  <h5><i class="el-icon-document"></i>CPR 按摩保险</h5>
                  <el-button
                    @click="handleGoTo()"
                    type="danger"
                    :loading="loading"
                    >前 往</el-button
                  >
                </li>
                <li>
                  <h5><i class="el-icon-document"></i>再教育</h5>
                  <el-button
                    @click="handleGoTo('reeducation')"
                    type="danger"
                    :loading="loading"
                    >前 往</el-button
                  >
                </li>
              </ul>
            </div>
            <div class="recommend">
              <h2>推荐朋友，获得双重奖励！</h2>
              <ul>
                <li>
                  <span>1</span>
                  <p>
                    邀请朋友购买易北课程，购课者可获得
                    <em>100 美金的优惠券</em>，直接抵扣学费；您也会获得
                    <em>88 美金的现金奖励！</em>
                  </p>
                </li>
                <li>
                  <span>2</span>
                  <p>
                    如果您成功邀请两名或以上学员，除了每名学员 88
                    美金的现金奖励，还可以
                    <em>免费获得执照申请服务（原价 265 美金）！</em>
                  </p>
                </li>
              </ul>
              <div class="btn">
                <el-button
                  style="width: 60%;"
                  type="warning"
                  class="el-button--big"
                  @click="handleUserShare"
                  >马上分享给朋友
                </el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PassUser",

  props: {},

  data() {
    return {
      historyData: {},
      loading: false,
    };
  },

  computed: {
    ...mapGetters(["getUserInfo"]),
  },

  created() {
    this.queryHistoryData();
  },

  methods: {
    /**
     * 获取用户学习历史
     */
    async queryHistoryData() {
      const { data: resData } = await this.$get("/user/gethistorydata");
      if (!resData.data.status) return;

      this.historyData = resData.data.data;
    },

    /**
     * 跳转
     */
    handleGoTo(name) {
      if (!name)
        return this.$message({
          message: "此功能即将上线，请尽情期待！",
          type: "warning",
        });

      if (name == "reeducation")
        return this.$message({
          message: "请联系张老师微信！",
          type: "succeed",
        });
    },

    /**
     * 获取申请信息
     */
    async queryApplyInfo(name, query) {
      this.loading = true;

      const { data: resData } = await this.$get(
        "/user/getmemberapplaylicensedetail",
        {
          params: {
            type: query && query.updata ? 1 : 0,
          },
        }
      );
      this.loading = false;
      if (!resData.data.status) return;

      if (resData.data.data && resData.data.data.id) {
        this.$router.push({
          name: "PASS_APPLY_FORM",
          query,
        });
      } else {
        this.$router.push({
          name,
          query,
        });
      }
    },

    /**
     * 生成分享海报
     */
    handleUserShare() {
      this.$router.push({
        name: "ACCOUNT_SHARE",
        query: {
          isPass: 1,
        },
      });
      // this.$refs.userShare.handleCreateImage();
    },

    /**
     * 去评价
     */
    handleGotoEvaluate() {
      this.$router.push({
        name: "COURSE_EVALUATE",
      });
    },
  },
};
</script>
