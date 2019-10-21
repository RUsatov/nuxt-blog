<template>
  <el-form @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form">
    <h1 class="mb">Создать новый пост</h1>

    <el-form-item label="Введите название поста" prop="title">
      <el-input v-model="controls.title" />
    </el-form-item>

    <el-form-item label="Текст в формате .md или .html" prop="text">
      <el-input type="textarea" resize="none" :rows="10" v-model="controls.text" />
    </el-form-item>

    <el-button type="success" plain @click="previewDialog = true" class="mb">Предпросмотр</el-button>

    <el-dialog title="Предпросмотр" :visible.sync="previewDialog">
      <div :key="controls.text">
        <vue-markdown>{{controls.text}}</vue-markdown>
      </div>
    </el-dialog>

    <el-upload
      class="mb"
      ref="upload"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleImageChange"
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        Перетащите изображение или
        <em>нажмите</em>
      </div>
      <div class="el-upload__tip" slot="tip">файлы с расширением jpeg/png</div>
    </el-upload>

    <el-form-item>
      <el-button type="primary" round native-type="submit" :loading="loading">Создать</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["admin-auth"],
  head: {
    title: `Новый пост | ${process.env.appName}`
  },
  data() {
    return {
      image: null,
      previewDialog: false,
      loading: false,
      controls: {
        text: "",
        title: ""
      },
      rules: {
        text: [
          {
            required: true,
            message: "Текст не может быть пустым",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            message: "Название поста не может быть пустым",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid && this.image) {
          this.loading = true;

          const formData = {
            title: this.controls.title,
            text: this.controls.text,
            image: this.image
          };

          try {
            await this.$store.dispatch("post/create", formData);
            this.controls.title = "";
            this.controls.text = "";
            this.controls.image = null;
            this.$refs.upload.clearFiles()
            this.$message.success("Пост создан");
          } catch (e) {
          } finally {
            this.loading = false;
          }
        } else {
          this.$message.warning('Заполнены не все поля')
        }
      });
    },
    handleImageChange(file, fileList) {
      this.image = file.raw
    },
  }
};
</script>

<style lang="scss" scoped>
form {
  width: 600px;
  max-width: 100%;
}
.mr {
  margin-right: 2rem;
}
</style>