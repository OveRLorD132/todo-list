<template>
    <div v-if="uploadIsVisible" class="background">
        <div class="uploadContainer">
            <div class="uploadLabel"><h2>Upload here:</h2></div>
            <input type="file" class="inputImage" accept="image/*" @change="handleFileUpdate">
            <img id="img" :ref="'image'" :src="uploadedImage"/>
            <button @click="cropImage">Crop</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
    props: {
        uploadIsVisible: Boolean,
    },
    data() {
        return {
            cropper: "",
            uploadedImage: '/images/profile.png',
        }
    },
    methods: {
        handleFileUpdate(event) {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.onload = (event) => {
                console.log(event);
                this.uploadedImage = event.target.result;
                this.$refs.image.src = this.uploadedImage;
                this.cropper = new Cropper(this.$refs.image, {
                    autoCrop: true,
                    aspectRatio: 1,
                    minCropBoxHeight: 256,
                    minCropBoxWidth: 256,
                    viewMode: 3,
                    dragMode: 'move',
                    background: false,
                    cropBoxResizable: false,
                    cropBoxMovable: false,
                });
            };
            reader.readAsDataURL(file);
        },
        async cropImage() {
            let croppedCanvas = this.cropper.getCroppedCanvas();
            let croppedImage = croppedCanvas.toDataURL('image/png');
            let formData = new FormData();
            console.log(croppedImage);
            formData.append('image', croppedImage);
            console.log(formData);
            let res = await axios.post('/profile/change/picture', formData, {headers: {'Content-Type':'multipart/form-data'}});
            console.log(res);
            if(res.data === "Upload successful") location.reload();
        }
    }
}
</script>

<style>
#img {
    height: 100px;
    width: 100px;
}

.background {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(153, 153, 153, 0.5);
}

.uploadContainer {
    border-radius: 10px;
    padding: 15px 15px 15px 15px;
    height: 450px;
    width: 350px;
    background-color: #ffffff;
}

.uploadLabel {
    width: 100%;
    text-align: center;
}
</style>