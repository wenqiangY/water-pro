<template>
  <a-upload
    v-model:file-list="fileList"
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    :headers="headers"
    @change="handleChange"
  >
    <a-button>
      <upload-outlined></upload-outlined>
      Click to Upload
    </a-button>
  </a-upload>
</template>
<script lang="ts">
import { UploadOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { message } from '@fe6/water-pro';

interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

export default defineComponent({
  components: {
    UploadOutlined,
  },
  setup() {
    const handleChange = (info: FileInfo) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };

    const fileList = ref([]);
    return {
      fileList,
      headers: {
        authorization: 'authorization-text',
      },
      handleChange,
    };
  },
});
</script>
