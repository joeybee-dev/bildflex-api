<script setup>
import { ref } from "vue";
import axios from "axios";

const selectedFile = ref(null);
const uploadedImageUrl = ref("");

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadImage = async () => {
  try {
    if (!selectedFile.value) return;

    const formData = new FormData();
    formData.append("image", selectedFile.value);

    const response = await axios.post(
      "http://localhost:4000/professionals/upload/profile-icon",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    uploadedImageUrl.value = response.data.imageUrl;
    console.log("Uploaded URL:", response.data.imageUrl);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
</script>

<template>
  <div>
    <input type="file" accept="image/*" @change="handleFileChange" />
    <button class="btn btn-primary mt-2" @click="uploadImage">
      Upload Image
    </button>

    <img
      v-if="uploadedImageUrl"
      :src="uploadedImageUrl"
      alt="Uploaded preview"
      class="mt-3"
      style="max-width: 300px;"
    />
  </div>
</template>