<style lang="scss" scoped>
.upload-file {
  &-content {
    border-radius: 4px;
    width: 300px;
    height: 180px;
    background: #ffffff;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    box-sizing: border-box;
    border: 1px dashed #dcdfe6;
    transition: all 0.3s ease;
    &:hover {
      border: 1px dashed #004988;
    }
    i {
      font-size: 50px;
      color: #d9d9d9;
      font-weight: 500;
    }
    p {
      padding: 12px 10px 15px;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #c0c4cc;
    }
    span {
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      color: #004988;
    }
  }
  .img {
    width: 300px;
    height: 180px;
    border: 1px dashed #dcdfe6;
    text-align: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  ::v-deep .el-upload--picture-card {
    width: 300px;
    height: 180px;
    box-sizing: border-box;
    border: 0;
  }
  ::v-deep .el-upload-list--picture-card .el-upload-list__item {
    width: 300px;
    height: 180px;
    box-sizing: border-box;
  }
}
</style>

<template>
  <section class="upload-file">
    <!-- 多图 -->
    <el-upload
      v-if="limit > 1"
      action=""
      list-type="picture-card"
      ref="upload"
      :multiple="multiple"
      accept=".jpg,.jpeg,.png,.gif"
      :http-request="handleUploadMultiple"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="limit"
      :disabled="loading || disabled"
    >
      <div slot="default" class="upload-file-content" v-loading="loading">
        <i class="el-icon-camera"></i>
        <p>{{ title }}</p>
        <span>点击上传或拍照</span>
      </div>
      <div slot="file" slot-scope="{ file }">
        <div class="img">
          <img :src="FILE_ROOT + file.url" />
        </div>

        <span class="el-upload-list__item-actions">
          <span
            v-if="!loading"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>

    <!-- 单图 -->
    <el-upload
      v-else
      ref="upload"
      action=""
      accept=".jpg,.jpeg,.png,.gif"
      :http-request="handleUpload"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="limit"
      :show-file-list="false"
      :disabled="loading || disabled"
    >
      <div class="img" v-if="imageUrl">
        <img :src="FILE_ROOT + imageUrl" />
      </div>
      <div v-else class="upload-file-content" v-loading="loading">
        <i class="el-icon-camera"></i>
        <p>{{ title }}</p>
        <span>点击上传或拍照</span>
      </div>
    </el-upload>
  </section>
</template>

<script>
import { uploadFile } from "@api/common";
import { FILE_ROOT } from "@config";

export default {
  name: "studyHistory",

  props: {
    name: {
      type: String,
      default: "",
    },
    limit: {
      type: Number,
      default: 1,
    },
    title: {
      type: String,
      default: "请上传",
    },
    img: {
      type: String,
      default: "",
    },
    images: {
      type: String,
      default: "",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  components: {},

  watch: {},

  data() {
    return {
      fileList: [],
      dialogVisible: false,
      loading: false,
      imageUrl: "",
      FILE_ROOT,
    };
  },

  created() {
    if (this.img) this.imageUrl = this.img;

    if (this.images && this.limit > 1)
      this.images.split(",").forEach((url, index) => {
        this.fileList.push({
          name: index,
          url,
        });
      });
  },

  mounted() {},

  methods: {
    /**
     * 上传之前
     */
    handleBeforeUpload(file) {
      const isExcel =
        file.name.split(".")[1] === "jpg" ||
        file.name.split(".")[1] === "jpeg" ||
        file.name.split(".")[1] === "png" ||
        file.name.split(".")[1] === "gif";

      const isSize = file.size / 1024 / 1024 < 10;
      if (!isExcel) {
        this.$message({
          message: "只能上传jpg、png、gif 的图片",
          type: "error",
        });
      }
      if (!isSize) {
        this.$message({
          message: "上传图片大小不能超过10M!",
          type: "error",
        });
      }
      return isExcel && isSize;
    },

    /**
     * 多选删除图片
     */
    handleRemove(file) {
      this.fileList = this.fileList.filter((item) => item.url != file.url);

      this.$forceUpdate();
    },

    /**
     * 自定义上传（单选）
     */
    async handleUpload(file) {
      // 接口上传
      this.loading = true;
      const { data: resData } = await uploadFile(file.file);
      this.loading = false;
      if (!resData.data.status) return;

      this.imageUrl = resData.data.path;
      this.$emit("getImage", {
        url: this.imageUrl,
        name: this.name,
      });
    },

    /**
     * 自定义上传（多选）
     */
    async handleUploadMultiple(file) {
      // 接口上传
      this.loading = true;
      const { data: resData } = await uploadFile(file.file);
      this.loading = false;
      if (!resData.data.status) return;

      const images = [];
      this.fileList.push({
        name: new Date().getTime(),
        url: resData.data.path,
      });

      this.fileList.forEach((item) => {
        images.push(item.url);
      });

      this.$emit("getImage", {
        url: images.join(","),
        name: this.name,
      });
    },
  },
};
</script>
