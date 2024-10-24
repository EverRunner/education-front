<style lang="scss" scope>
::v-deep .el-select-dropdown__item {
  font-size: 16px;
}
</style>

<template>
  <section>
    <template v-if="info.status === 0 || isAll">
      <!-- 更新执照 第一步 -->
      <div class="license-form" v-if="(info.type == 1 && step == 0) || isAll">
        <p class="license-form-hint" v-if="!isAll">请如实填写以下表格：</p>
        <h6 class="license-form-primary">一、现有执照</h6>
        <ul class="license-form-content">
          <li>
            <h5>1. 请问您现在持有哪几个州的执照？</h5>
            <el-select
              style="width:300px"
              v-model="params.existinglicensenumber"
              placeholder="请选择数量"
              :disabled="isAll"
            >
              <el-option
                v-for="index in 10"
                :key="index"
                :label="index + '个'"
                :value="index"
              >
              </el-option>
            </el-select>
          </li>
          <li v-for="index in params.existinglicensenumber" :key="index">
            <h5>1-{{ index }}. 请您上传现持有州执照（照片）</h5>
            <UploadFile
              title="现持有州执照"
              :img="updateNowLcense[index - 1].image"
              name="existinglicense"
              @getImage="
                (reset) => {
                  handleGetImage(reset, index - 1);
                }
              "
              :disabled="isAll"
            />
            <div class="grade-item" style="margin-top: 8px;">
              <em style="width: 80px;">执照过期日</em>
              <el-date-picker
                v-model="updateNowLcense[index - 1].date"
                type="date"
                placeholder="选择日期"
                :disabled="isAll"
                style="width: 200px;"
              >
              </el-date-picker>
            </div>
          </li>
          <li>
            <h5>
              2. 当按摩小时证书低于 625 小时，请提供过去两年 24 个再教育学分。
            </h5>
            <UploadFile
              title="24 个再教育学分"
              :img="params.massagehoursclosedlow"
              name="massagehoursclosedlow"
              @getImage="handleGetImage"
              :disabled="isAll"
            />
          </li>
          <li>
            <h5>
              3.
              请问您执照有效期里是否收到过刑事罚单？（包括但不限于：无证做工，酒驾，卖淫，行凶，吸毒等）
            </h5>
            <el-radio-group
              v-model="params.iscriminalticketinusaupdate"
              :disabled="isAll"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </li>
          <li>
            <h5>
              4. 请问您在执照有效期里是否曾经被逮捕？（带到执法部门提取指纹）
            </h5>
            <el-radio-group
              v-model="params.isarrestinusaupdate"
              :disabled="isAll"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </li>
          <li>
            <h5>
              5. 请问你在执照有效期里是否曾经被判刑事罪 ？（没起诉，轻罪，重罪）
            </h5>
            <el-radio-group
              v-model="params.iscriminaloffenseupdate"
              :disabled="isAll"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </li>
        </ul>
      </div>

      <!-- 第一部分 -->
      <div class="license-form" v-if="step == 1 || isAll">
        <h5 class="license-form-title" v-if="!isAll">
          填写按摩执照申请资料<em>（第 1 部分，共 2 部分） </em>
        </h5>
        <p class="license-form-hint" v-if="!isAll">请如实填写以下表格：</p>
        <h6 class="license-form-primary">一、首次申请</h6>
        <ul class="license-form-content">
          <li>
            <h5>1. 申请哪一州？</h5>
            <el-select
              style="width:300px"
              v-model="params.whichstation"
              placeholder="请选择州"
              :disabled="isAll"
              filterable
            >
              <el-option
                v-for="name in AMERICA_STATE_LIST"
                :key="name"
                :label="name"
                :value="name"
              >
              </el-option>
            </el-select>
          </li>
          <li>
            <h5>2. 请您上传 MBLEX 联邦考试通过 Pass 纸（照片）</h5>
            <UploadFile
              title="MBLEX 联邦考试通过 Pass 纸"
              :img="params.mblexpasspaperimg"
              name="mblexpasspaperimg"
              @getImage="handleGetImage"
              :disabled="isAll"
            />
          </li>
          <li>
            <h5>3. 您的考试地点是</h5>
            <el-select
              style="width:300px"
              v-model="params.examinationaddress"
              placeholder="请选择州"
              :disabled="isAll"
              filterable
            >
              <el-option
                v-for="name in AMERICA_STATE_LIST"
                :key="name"
                :label="name"
                :value="name"
              >
              </el-option>
            </el-select>
          </li>
          <li>
            <h5>4. 请上传您的小时证书（照片）</h5>
            <UploadFile
              title="小时证书"
              :img="params.hourcertificateimg"
              name="hourcertificateimg"
              @getImage="handleGetImage"
              :disabled="isAll"
            />
          </li>
          <li>
            <h5>5. 请上传您的成绩单（照片）</h5>
            <UploadFile
              title="成绩单"
              :img="params.schoolreportimg"
              name="schoolreportimg"
              @getImage="handleGetImage"
              :disabled="isAll"
            />
            <div class="grade">
              <el-checkbox
                v-model="isGrade"
                v-if="!isAll"
                style="margin: 15px 0"
                >我没有成绩单，填写入学及毕业时间</el-checkbox
              >
              <div class="grade-item" v-if="isGrade || isAll">
                <em>入学时间</em>
                <el-date-picker
                  v-model="params.entrancedate"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </div>
              <div class="grade-item" v-if="isGrade || isAll">
                <em>毕业时间</em>
                <el-date-picker
                  v-model="params.graduationdate"
                  type="date"
                  placeholder="选择日期"
                  :disabled="isAll"
                >
                </el-date-picker>
              </div>
            </div>
          </li>
          <li>
            <h5>6. 过去的工作经验</h5>
            <div
              class="work"
              v-for="(item, index) in workExperience"
              :key="index"
            >
              <div class="work-title" v-if="workExperience.length > 1">
                第{{ index + 1 }}份工作
                <el-button
                  @click="handleWordDelete(index)"
                  type="text"
                  icon="el-icon-delete"
                  style="margin-left: 10px"
                  >删除</el-button
                >
              </div>
              <div class="grade-item">
                <em>公司名字</em>
                <el-input
                  v-model="item.company"
                  placeholder="请输入内容"
                  class="grade-item-input"
                  :disabled="isAll"
                ></el-input>
              </div>
              <div class="grade-item">
                <em>工作性质</em>
                <el-input
                  v-model="item.workType"
                  placeholder="请输入内容"
                  class="grade-item-input"
                  :disabled="isAll"
                ></el-input>
              </div>
              <div class="grade-item">
                <em>地址</em>
                <el-input
                  v-model="item.addr"
                  placeholder="请输入内容"
                  class="grade-item-input"
                  :disabled="isAll"
                ></el-input>
              </div>
              <div class="grade-item">
                <em>开始工作</em>
                <el-date-picker
                  v-model="item.startDate"
                  type="date"
                  placeholder="选择日期"
                  class="grade-item-input"
                  :disabled="isAll"
                >
                </el-date-picker>
              </div>
              <div class="grade-item">
                <em>结束工作</em>
                <el-date-picker
                  v-model="item.endtDate"
                  type="date"
                  placeholder="选择日期"
                  class="grade-item-input"
                  :disabled="isAll"
                >
                </el-date-picker>
              </div>
            </div>
            <div class="work-experience">
              有其他工作经验？<em @click="handleWorkAdd">点击新增</em>
            </div>
          </li>
          <li
            v-if="
              params.whichstation == '北卡罗莱纳州' ||
                params.whichstation == '华盛顿州'
            "
          >
            <h5>7. 专业经验 （北卡罗莱纳州和华盛顿州）</h5>
            <div class="grade-item">
              <em>公司名字</em>
              <el-input
                v-model="params.zycompnay"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
            <div class="grade-item">
              <em>职位</em>
              <el-input
                v-model="params.zyworkxz"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
            <div class="grade-item">
              <em>地址</em>
              <el-input
                v-model="params.zyaddress"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
            <div class="grade-item">
              <em>开始工作</em>
              <el-date-picker
                v-model="params.zystart"
                type="date"
                placeholder="选择日期"
                class="grade-item-input"
                :disabled="isAll"
              >
              </el-date-picker>
            </div>
            <div class="grade-item">
              <em>结束工作</em>
              <el-date-picker
                v-model="params.zyend"
                type="date"
                placeholder="选择日期"
                class="grade-item-input"
                :disabled="isAll"
              >
              </el-date-picker>
            </div>
          </li>
          <li v-if="params.whichstation == '北卡罗莱纳州'">
            <h5>8. 4个推荐信 （北卡罗莱纳州）</h5>
            <div class="flex">
              <UploadFile
                title="推荐信 1"
                :img="params.recommendationimg1"
                name="recommendationimg1"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
              <UploadFile
                title="推荐信 2"
                :img="params.recommendationimg2"
                name="recommendationimg2"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
              <UploadFile
                title="推荐信 3"
                :img="params.recommendationimg3"
                name="recommendationimg3"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
              <UploadFile
                title="推荐信 4"
                :img="params.recommendationimg4"
                name="recommendationimg4"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
            </div>
          </li>
          <li v-if="params.whichstation == '北卡罗莱纳州'">
            <h5>9. 教学大纲认证（北卡罗来纳州）</h5>
            <UploadFile
              title="教学大纲认证"
              :img="params.syllabuscertification"
              name="syllabuscertification"
              @getImage="handleGetImage"
              :disabled="isAll"
            />
          </li>
          <li v-if="params.whichstation == '北卡罗莱纳州'">
            <h5>10. 高中毕业证书和成绩单（北卡罗莱纳州）</h5>
            <div class="flex">
              <UploadFile
                title="高中毕业证书"
                :img="params.highschoolcertificate"
                name="highschoolcertificate"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
              <UploadFile
                title="高中成绩单"
                :img="params.highschoolagree"
                name="highschoolagree"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
            </div>
          </li>
          <li v-if="params.whichstation == '俄勒冈州'">
            <h5>11. 3 个推荐人（俄勒冈州）</h5>
            <div class="recommend">推荐人 1</div>
            <div class="grade-item">
              <em>名字</em>
              <el-input
                v-model="params.recommender1name"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
            <div class="grade-item">
              <em>地址</em>
              <el-input
                v-model="params.recommender1address"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
            <div class="grade-item">
              <em>电话</em>
              <el-input
                v-model="params.recommender1phone"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
            <div class="recommend">推荐人 2</div>
            <div class="grade-item">
              <em>名字</em>
              <el-input
                v-model="params.recommender2name"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
            <div class="grade-item">
              <em>地址</em>
              <el-input
                v-model="params.recommender2address"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
            <div class="grade-item">
              <em>电话</em>
              <el-input
                v-model="params.recommender2phone"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
            <div class="recommend">推荐人 3</div>
            <div class="grade-item">
              <em>名字</em>
              <el-input
                v-model="params.recommender3name"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
            <div class="grade-item">
              <em>地址</em>
              <el-input
                v-model="params.recommender3address"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
            <div class="grade-item">
              <em>电话</em>
              <el-input
                v-model="params.recommender3phone"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
          </li>
          <li v-if="params.whichstation == '田纳西州'">
            <h5>12. 2 个推荐信 （田纳西州））</h5>
            <div class="flex">
              <UploadFile
                title="推荐信 1"
                :img="params.recommenderimg1"
                name="recommenderimg1"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
              <UploadFile
                title="推荐信 2"
                :img="params.recommenderimg2"
                name="recommenderimg2"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
            </div>
          </li>
          <li v-if="params.whichstation == '马萨诸塞州'">
            <h5>13. 专业和个人推荐人 （马萨诸塞州）</h5>
            <div class="recommend">专业推荐人</div>
            <div class="grade-item">
              <em>名字</em>
              <el-input
                v-model="params.majorrecommender1name"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
            <div class="grade-item">
              <em>地址</em>
              <el-input
                v-model="params.majorrecommender1address"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
            <div class="grade-item">
              <em>电话</em>
              <el-input
                v-model="params.majorrecommender1phone"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
            <div class="recommend">个推荐人</div>
            <div class="grade-item">
              <em>名字</em>
              <el-input
                v-model="params.majorrecommender2name"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
            <div class="grade-item">
              <em>地址</em>
              <el-input
                v-model="params.majorrecommender2address"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
            <div class="grade-item">
              <em>电话</em>
              <el-input
                v-model="params.majorrecommender2phone"
                placeholder="请输入内容"
                class="grade-item-input"
                :disabled="isAll"
              ></el-input>
            </div>
          </li>
        </ul>
      </div>

      <!-- 第二部分 -->
      <div class="license-form" v-if="step == 2 || isAll">
        <h5 class="license-form-title" v-if="!isAll">
          填写按摩执照申请资料<em>（第 2 部分，共 2 部分）</em>
        </h5>
        <p class="license-form-hint" v-if="!isAll">请如实填写以下表格：</p>
        <h6 class="license-form-primary">二、补充信息</h6>
        <ul class="license-form-content">
          <li>
            <h5>1. 请上传您的驾照（正反面照片）</h5>
            <div class="flex">
              <UploadFile
                title="驾照正面"
                :img="params.driverlicensefrontimg"
                name="driverlicensefrontimg"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
              <UploadFile
                title="驾照反面"
                :img="params.driverlicensebackimg"
                name="driverlicensebackimg"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
            </div>
          </li>
          <li>
            <h5>2. 请上传一张2x2照片(护照上使用的照片类型)</h5>
            <UploadFile
              title="2x2照片（护照上使用照）"
              :img="params.passportimg"
              name="passportimg"
              @getImage="handleGetImage"
              :disabled="isAll"
            />
          </li>
          <li>
            <h5>3. 银行卡(正反面照片)</h5>
            <div class="flex">
              <UploadFile
                title="银行卡正面"
                :img="params.bankcardfrontimg"
                name="bankcardfrontimg"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
              <UploadFile
                title="银行卡反面"
                :img="params.bankcardbackimg"
                name="bankcardbackimg"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
            </div>
          </li>
          <li>
            <h5>4. 过去5年居住的州</h5>
            <el-select
              style="width:300px"
              v-model="params.lastfiveyearlivestate"
              placeholder="请选择州"
              :disabled="isAll"
            >
              <el-option
                v-for="name in AMERICA_STATE_LIST"
                :key="name"
                :label="name"
                :value="name"
              >
              </el-option>
            </el-select>
          </li>
          <li>
            <h5 class="on">5. 曾用名(如果有，请提供更名文件)</h5>
            <el-input
              v-model="params.nameusedbefore"
              placeholder="曾用名"
              style="width:300px;margin-bottom:15px"
              :disabled="isAll"
            ></el-input>
            <UploadFile
              title="更名文件"
              :img="params.changenamefileimg"
              name="changenamefileimg"
              @getImage="handleGetImage"
              :disabled="isAll"
            />
          </li>
          <li>
            <h5>6. 公民/绿卡或工卡身份证明（正反照片）</h5>
            <div class="flex">
              <UploadFile
                title="公民身份或身份状态正面"
                :img="params.idcardfrontimg"
                name="idcardfrontimg"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
              <UploadFile
                title="公民身份或身份状态反面"
                :img="params.idcardbackimg"
                name="idcardbackimg"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
            </div>
          </li>
          <li>
            <h5>7. 社会安全号码（正反面照片）</h5>
            <div class="flex">
              <UploadFile
                title="社会安全号码正面"
                :img="params.ssnfrontimg"
                name="ssnfrontimg"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
              <UploadFile
                title="社会安全号码反面"
                :img="params.ssnbackimg"
                name="ssnbackimg"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
            </div>
          </li>
          <li>
            <h5>8.电话号码</h5>
            <el-input
              v-model="params.phone"
              placeholder="电话号码"
              style="width:300px"
              type="number"
              :disabled="isAll"
            ></el-input>
          </li>
          <li>
            <h5>9.电子邮件</h5>
            <el-input
              v-model="params.email"
              placeholder="电子邮件"
              style="width:300px"
              :disabled="isAll"
            ></el-input>
          </li>
          <li>
            <h5>10.邮寄地址</h5>
            <el-input
              type="textarea"
              :rows="3"
              v-model="params.mailingaddress"
              placeholder="邮寄地址"
              style="width:300px"
              @change="handleMailingAddress"
              :disabled="isAll"
            ></el-input>
          </li>
          <li>
            <h5>11.帐单地址</h5>
            <el-checkbox
              v-model="isIdentical"
              v-if="!isAll"
              style="margin-bottom:15px"
              @change="handleAccountAddress"
              >与邮寄地址相同</el-checkbox
            >
            <div>
              <el-input
                type="textarea"
                :rows="3"
                v-model="params.accountaddress"
                placeholder="帐单地址"
                style="width:300px"
                :disabled="isIdentical || isAll"
              ></el-input>
            </div>
          </li>
          <li>
            <h5 class="on">
              12. 如有 CPR、AIDS、急救、基本生命支持卡/证书，请上传照片
            </h5>
            <div class="flex">
              <UploadFile
                title="CPR"
                :img="params.cprimg"
                name="cprimg"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
              <UploadFile
                title="AIDS"
                :img="params.aidsimg"
                name="aidsimg"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
              <UploadFile
                title="急救"
                :img="params.firstaidimg"
                name="firstaidimg"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
              <UploadFile
                title="基本生命支持卡/证书"
                :img="params.lifesupportcardimg"
                name="lifesupportcardimg"
                @getImage="handleGetImage"
                :disabled="isAll"
              />
            </div>
          </li>
          <li class="warning">
            再次提醒如果您的回答与事实不符，您将承担一切法律责任和无法顺利获取执照的可能结果。
          </li>
        </ul>
      </div>

      <div class="pass-apply-form__btn" v-if="step > -1 && !isAll">
        <el-button
          round
          @click="handleSave"
          class="el-button--big"
          :loading="loading"
          >保存稍后填写</el-button
        >
        <el-button
          round
          @click="handleSave('save')"
          type="primary"
          class="el-button--big"
          :loading="loading"
          style="min-width: 120px;"
          >{{ step == 1 ? "填写第 2 部分" : "提交" }}
        </el-button>
      </div>
    </template>

    <!-- 成功提示 -->
    <div class="license-form-succeed" v-if="info.status == 1 && !isAll">
      <img src="@assets/images/pass-license-form-icon.png" alt="" />
      <p class="hidden-sm-and-down">
        恭喜您，您已成功提交所需资料！<br />
        如果需要补充或者资料有问题，张老师会微信联系您！<br />
        接下来请耐心等待！
      </p>
      <p class="hidden-md-and-up">
        恭喜您，您已成功提交所需资料！如果需要补充或者资料有问题，张老师会微信联系您！
        接下来请耐心等待！
      </p>
      <div class="pass-apply-form__btn">
        <el-button
          round
          @click="handleGoto"
          type="primary"
          class="el-button--big"
          style="width: 120px"
          >完成</el-button
        >
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import UploadFile from "@/components/UploadFile.vue";
import { AMERICA_STATE_LIST } from "@config";
import { emailValidation, phoneValidation } from "@utils/tools";

export default {
  name: "uploadFile",

  components: { UploadFile },

  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      },
    },

    isAll: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      loading: false,
      params: { existinglicensenumber: 0, whichstation: "" },
      checked: false,
      isGrade: false,
      isIdentical: false,
      AMERICA_STATE_LIST,
      step: -1, // 当前表单步骤

      updateNowLcense: [
        {
          image: "",
          date: "",
          other: "",
        },
      ], // 更新执照-现在执照

      workExperience: [
        {
          company: "",
          workType: "",
          addr: "",
          startDate: "",
          endtDate: "",
          other: "",
        },
      ], // 申请执照-工作经验
    };
  },

  computed: {
    ...mapGetters(["getUserInfo"]),
  },

  created() {
    // 获取已填数据
    this.params = {
      ...this.info,
      applayid: this.info.id,
    };

    // 更新执照-现在执照
    if (this.info.existinglicense)
      this.updateNowLcense = JSON.parse(this.info.existinglicense);

    // 申请执照-过去的工作经验
    if (this.info.lastsofworkingexperience)
      this.workExperience = JSON.parse(this.info.lastsofworkingexperience);

    // 邮寄地址 与 帐单地址 是否相同
    if (this.params.mailingaddress == this.params.accountaddress)
      this.isIdentical = true;

    this.handleNowStep();
    this.$forceUpdate();
  },

  methods: {
    /**
     * 跳转
     */
    handleGoto() {
      this.$router.push({
        name: "PASS_APPLY_LICENSE_RESULT",
      });
    },

    /**
     * 处理当前步骤
     */
    handleNowStep() {
      // 执照更新，第一部分的表单
      if (this.info.type == 1 && !this.params.existinglicensenumber)
        return (this.step = 0);
      if (this.info.type == 1 && !this.params.existinglicense)
        return (this.step = 0);
      if (this.info.type == 1 && !this.params.massagehoursclosedlow)
        return (this.step = 0);
      if (this.info.type == 1 && !this.params.iscriminalticketinusaupdate)
        return (this.step = 0);
      if (this.info.type == 1 && !this.params.isarrestinusaupdate)
        return (this.step = 0);
      if (this.info.type == 1 && !this.params.iscriminaloffenseupdate)
        return (this.step = 0);

      // 执照申请/更新，第一部分
      if (!this.params.whichstation) return (this.step = 1);
      if (!this.params.mblexpasspaperimg) return (this.step = 1);
      if (!this.params.examinationaddress) return (this.step = 1);
      if (!this.params.hourcertificateimg) return (this.step = 1);
      if (!this.params.lastsofworkingexperience) return (this.step = 1);
      if (!this.params.schoolreportimg) return (this.step = 1);
      if (!this.isGrade && !this.params.schoolreportimg) return (this.step = 1);
      if (this.isGrade && !this.params.entrancedate) return (this.step = 1);
      if (this.isGrade && !this.params.graduationdate) return (this.step = 1);

      if (
        (this.params.whichstation == "北卡罗莱纳州" ||
          this.params.whichstation == "华盛顿州") &&
        !this.params.zycompnay
      )
        return (this.step = 1);
      if (
        (this.params.whichstation == "北卡罗莱纳州" ||
          this.params.whichstation == "华盛顿州") &&
        !this.params.zyworkxz
      )
        return (this.step = 1);
      if (
        (this.params.whichstation == "北卡罗莱纳州" ||
          this.params.whichstation == "华盛顿州") &&
        !this.params.zyaddress
      )
        return (this.step = 1);
      if (
        (this.params.whichstation == "北卡罗莱纳州" ||
          this.params.whichstation == "华盛顿州") &&
        !this.params.zystart
      )
        return (this.step = 1);
      if (
        (this.params.whichstation == "北卡罗莱纳州" ||
          this.params.whichstation == "华盛顿州") &&
        !this.params.zyend
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "北卡罗莱纳州" &&
        !this.params.recommendationimg1
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "北卡罗莱纳州" &&
        !this.params.recommendationimg2
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "北卡罗莱纳州" &&
        !this.params.recommendationimg3
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "北卡罗莱纳州" &&
        !this.params.recommendationimg4
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "北卡罗莱纳州" &&
        !this.params.syllabuscertification
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "北卡罗莱纳州" &&
        !this.params.highschoolcertificate
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "北卡罗莱纳州" &&
        !this.params.highschoolagree
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "俄勒冈州" &&
        !this.params.recommender1name
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "俄勒冈州" &&
        !this.params.recommender1address
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "俄勒冈州" &&
        !this.params.recommender1phone
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "俄勒冈州" &&
        !this.params.recommender2name
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "俄勒冈州" &&
        !this.params.recommender2address
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "俄勒冈州" &&
        !this.params.recommender2phone
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "俄勒冈州" &&
        !this.params.recommender3name
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "俄勒冈州" &&
        !this.params.recommender3address
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "俄勒冈州" &&
        !this.params.recommender3phone
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "田纳西州" &&
        !this.params.recommenderimg1
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "田纳西州" &&
        !this.params.recommenderimg2
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "马萨诸塞州" &&
        !this.params.majorrecommender1name
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "马萨诸塞州" &&
        !this.params.majorrecommender1address
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "马萨诸塞州" &&
        !this.params.majorrecommender1phone
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "马萨诸塞州" &&
        !this.params.majorrecommender2name
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "马萨诸塞州" &&
        !this.params.majorrecommender2address
      )
        return (this.step = 1);
      if (
        this.params.whichstation == "马萨诸塞州" &&
        !this.params.majorrecommender2phone
      )
        return (this.step = 1);

      this.step = 2;
    },

    /**
     * 申请执照，跳转页面
     */
    async handleGetImage(reset, index) {
      switch (reset.name) {
        case "existinglicense": // 更新执照-现在执照
          this.updateNowLcense[index].image = reset.url;
          break;

        default:
          this.params[reset.name] = reset.url;
          break;
      }

      this.$forceUpdate();
    },

    /**
     *  处理帐单地址
     */
    handleAccountAddress(val) {
      if (val) {
        this.params.accountaddress = this.params.mailingaddress;
      } else {
        this.params.accountaddress = "";
      }

      this.$forceUpdate();
    },

    /**
     *  邮寄地址
     */
    handleMailingAddress(val) {
      if (this.isIdentical) this.params.accountaddress = val;

      this.$forceUpdate();
    },

    /**
     *  工作验证增加
     */
    handleWorkAdd() {
      this.workExperience.push({
        company: "",
        workType: "",
        addr: "",
        startDate: "",
        endtDate: "",
        other: "",
      });

      this.$forceUpdate();
    },

    /**
     *  工作验证删除
     */
    handleWordDelete(index) {
      this.workExperience = this.workExperience.filter(
        (item, key) => index != key
      );

      this.$forceUpdate();
    },

    /**
     *  处理保存
     */
    async handleSave(type) {
      // 更新执照-现在执照
      const existinglicense =
        this.updateNowLcense.length > 0
          ? JSON.stringify(this.updateNowLcense)
          : "";

      // 过去的工作经验
      const lastsofworkingexperience =
        this.workExperience.length > 0
          ? JSON.stringify(this.workExperience)
          : "";

      // 更新执照， 第一步的表单验证
      if (this.info.type == 1 && this.step == 0 && type == "save") {
        if (!this.params.existinglicensenumber)
          return this.$message.error("请选择持有哪几个州的执照");

        if (!existinglicense)
          return this.$message.error("请您上传现持有州执照");

        if (!this.params.massagehoursclosedlow)
          return this.$message.error("请上传您24个再教育学分书");

        if (!this.params.iscriminalticketinusaupdate)
          return this.$message.error("请选择是否收到过刑事罚单");

        if (!this.params.isarrestinusaupdate)
          return this.$message.error("请选择是否曾经被逮捕");

        if (!this.params.iscriminaloffenseupdate)
          return this.$message.error("请选择是否曾经被判刑事罪");
      }

      // 第一步的表单验证
      if (this.step == 1 && type == "save") {
        // if (!this.params.whichstation)
        //   return this.$message.error("请选择申请州");

        // if (!this.params.mblexpasspaperimg)
        //   return this.$message.error("请您上传 MBLEX 联邦考试通过 Pass 纸");

        // if (!this.params.examinationaddress)
        //   return this.$message.error("请输入考试地点");

        // if (!this.params.hourcertificateimg)
        //   return this.$message.error("请上传您的小时证书");

        // if (!this.isGrade && !this.params.examinationaddress)
        //   return this.$message.error("请上传您的成绩单");

        // if (this.isGrade && !this.params.entrancedate)
        //   return this.$message.error("请选择入学时间");

        // if (this.isGrade && !this.params.graduationdate)
        //   return this.$message.error("请选择毕业时间");

        if (!lastsofworkingexperience)
          return this.$message.error("请填写过去的工作经验");

        if (
          (this.params.whichstation == "北卡罗莱纳州" ||
            this.params.whichstation == "华盛顿州") &&
          !this.params.zycompnay
        )
          return this.$message.error("请填写专业经验-公司名字");

        if (
          (this.params.whichstation == "北卡罗莱纳州" ||
            this.params.whichstation == "华盛顿州") &&
          !this.params.zyworkxz
        )
          return this.$message.error("请填写专业经验-职位");

        if (
          (this.params.whichstation == "北卡罗莱纳州" ||
            this.params.whichstation == "华盛顿州") &&
          !this.params.zyaddress
        )
          return this.$message.error("请填写专业经验-地址");

        if (
          (this.params.whichstation == "北卡罗莱纳州" ||
            this.params.whichstation == "华盛顿州") &&
          !this.params.zystart
        )
          return this.$message.error("请填写专业经验-开始工作");

        if (
          (this.params.whichstation == "北卡罗莱纳州" ||
            this.params.whichstation == "华盛顿州") &&
          !this.params.zyend
        )
          return this.$message.error("请填写专业经验-结束工作");

        if (
          this.params.whichstation == "北卡罗莱纳州" &&
          !this.params.recommendationimg1
        )
          return this.$message.error("请上传推荐信1");

        if (
          this.params.whichstation == "北卡罗莱纳州" &&
          !this.params.recommendationimg2
        )
          return this.$message.error("请上传推荐信2");

        if (
          this.params.whichstation == "北卡罗莱纳州" &&
          !this.params.recommendationimg3
        )
          return this.$message.error("请上传推荐信3");

        if (
          this.params.whichstation == "北卡罗莱纳州" &&
          !this.params.recommendationimg4
        )
          return this.$message.error("请上传推荐信4");

        if (
          this.params.whichstation == "北卡罗莱纳州" &&
          !this.params.syllabuscertification
        )
          return this.$message.error("请上传教学大纲认证");

        if (
          this.params.whichstation == "北卡罗莱纳州" &&
          !this.params.highschoolcertificate
        )
          return this.$message.error("请上传高中毕业证书");

        if (
          this.params.whichstation == "北卡罗莱纳州" &&
          !this.params.highschoolagree
        )
          return this.$message.error("请上传高中成绩单");

        if (
          this.params.whichstation == "俄勒冈州" &&
          !this.params.recommender1name
        )
          return this.$message.error("请输入推荐人1 名字");

        if (
          this.params.whichstation == "俄勒冈州" &&
          !this.params.recommender1address
        )
          return this.$message.error("请输入推荐人1 地址");

        if (
          this.params.whichstation == "俄勒冈州" &&
          !this.params.recommender1phone
        )
          return this.$message.error("请输入推荐人1 电话");

        if (
          this.params.whichstation == "俄勒冈州" &&
          !this.params.recommender2name
        )
          return this.$message.error("请输入推荐人2 名字");

        if (
          this.params.whichstation == "俄勒冈州" &&
          !this.params.recommender2address
        )
          return this.$message.error("请输入推荐人2 地址");

        if (
          this.params.whichstation == "俄勒冈州" &&
          !this.params.recommender2phone
        )
          return this.$message.error("请输入推荐人2 电话");

        if (
          this.params.whichstation == "俄勒冈州" &&
          !this.params.recommender3name
        )
          return this.$message.error("请输入推荐人3 名字");

        if (
          this.params.whichstation == "俄勒冈州" &&
          !this.params.recommender3address
        )
          return this.$message.error("请输入推荐人3 地址");

        if (
          this.params.whichstation == "俄勒冈州" &&
          !this.params.recommender3phone
        )
          return this.$message.error("请输入推荐人3 电话");

        if (
          this.params.whichstation == "田纳西州" &&
          !this.params.recommenderimg1
        )
          return this.$message.error("请上传推荐信1");

        if (
          this.params.whichstation == "田纳西州" &&
          !this.params.recommenderimg2
        )
          return this.$message.error("请上传推荐信2");

        if (
          this.params.whichstation == "马萨诸塞州" &&
          !this.params.majorrecommender1name
        )
          return this.$message.error("请输入3 个推荐人");

        if (
          this.params.whichstation == "马萨诸塞州" &&
          !this.params.majorrecommender1address
        )
          return this.$message.error("请输入3 个推荐人");

        if (
          this.params.whichstation == "马萨诸塞州" &&
          !this.params.majorrecommender1phone
        )
          return this.$message.error("请输入3 个推荐人");
      }

      // 第二步的表单验证
      if (this.step == 2 && type == "save") {
        if (!this.params.driverlicensefrontimg)
          return this.$message.error("请上传您的驾照正面");

        if (!this.params.driverlicensebackimg)
          return this.$message.error("请上传您的驾照反面");

        if (!this.params.passportimg)
          return this.$message.error("请上传一张2x2照片");

        if (!this.params.bankcardfrontimg)
          return this.$message.error("请上传您的银行卡正面");

        if (!this.params.bankcardbackimg)
          return this.$message.error("请上传您的银行卡反面");

        if (!this.params.lastfiveyearlivestate)
          return this.$message.error("请选择过去5年居住的州");

        if (!this.params.idcardfrontimg)
          return this.$message.error("请上传您的公民身份或身份状态正面");

        if (!this.params.idcardbackimg)
          return this.$message.error("请上传您的公民身份或身份状态反面");

        if (!this.params.ssnfrontimg)
          return this.$message.error("请上传社会安全号码正面");

        if (!this.params.ssnbackimg)
          return this.$message.error("请上传社会安全号码反面");

        if (!phoneValidation(this.params.phone))
          return this.$message.error("电话号码格式不正确");

        if (!emailValidation(this.params.email))
          return this.$message.error("邮箱帐号格式不正确");

        if (!this.params.mailingaddress)
          return this.$message.error("请输入邮寄地址");

        if (!this.params.accountaddress)
          return this.$message.error("请输入帐单地址");

        // if (!this.params.cpraidsothercertificateimg)
        //   return this.$message.error(
        //     "请上传CPR、AIDS、急救、基本生命支持卡/证书"
        //   );
      }

      // 状态，是否为提交
      const status = type == "save" && this.step == 2 ? 1 : 0; // 1：已经填写完成   0：填写中

      this.loading = true;
      const { data: resData } = await this.$post("/user/editapplaydatamore", {
        ...this.params,
        status,
        existinglicense,
        lastsofworkingexperience,
      });
      this.loading = false;
      if (!resData.data.status) return;

      // 跳到第二步(更新执照)
      if (this.info.type == 1 && type == "save" && this.step == 0)
        this.step = 1;

      // 跳到第三步
      if (type == "save" && this.step == 1) this.step = 2;

      if (status) this.info.status = 1;
      // if (status) this.$emit("refreshInfo");
    },
  },
};
</script>
