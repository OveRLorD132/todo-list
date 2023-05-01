<template>
    <div v-if="uploadIsVisible" class="background">
        <div class="uploadContainer">
            <div id="labelCont">
                <div class="uploadLabel"><h2>Upload here:</h2></div>
                <div id="imgUploadContainer">
                    <label for="imgInput" id="inputButton">
                        Select File
                    </label>
                    <label id="deleteButt" v-if="uploadedImage" @click="deleteImage">
                        Delete
                    </label>
                    <input type="file" class="inputImage" id="imgInput"
                    accept="image/*" @change="handleFileUpdate"
                    ref="imageInput" :style="{display: 'none'}">
                </div>
                <img id="img" ref="'image'" :src="uploadedImage" v-if="uploadedImage"/>
            </div>
            <div id="buttonsContainer" :style="{flexDirection: uploadedImage ? 'row' : 'row-reverse'}">
                <button @click="cropImage" class="uploadButt" id="uploadButt" v-if="uploadedImage">Upload</button>
                <button @click="closeUpload" class="closeButton">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Cropper from 'cropperjs';
//import 'cropperjs/dist/cropper.css';
export default {
    props: {
        uploadIsVisible: Boolean,
    },
    emits: {
        'close-upload': null,
    },
    data() {
        return {
            cropper: "",
            uploadedImage: '',
        }
    },
    methods: {
        handleFileUpdate(event) {
            console.log(event);
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.onload = (event) => {
                this.uploadedImage = event.target.result;
                if(this.cropper) this.cropper.destroy();
                this.$nextTick(() => {
                    this.cropper = new Cropper(document.getElementById('img'), {
                    aspectRatio: 1,
                    viewMode: 1,
                    minCropBoxHeight:256,
                    minCropBoxWidth: 256,
                    dragMode: 'move',
                    background: false,
                    cropBoxResizable: false,
                    cropBoxMovable: false,
                });
                })
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
        },
        deleteImage() {
            this.uploadedImage = "";
            this.cropper.destroy();
        },
        closeUpload() {
            this.$emit('close-upload')
        }
    }
}
</script>

<style>
@import 'cropperjs/dist/cropper.css';

#img {
    margin: 15px 15px 15px 15px;
    max-width: 480px;
    max-height: 480px;
}

#buttonsContainer {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

#imgUploadContainer {
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
}

.cropper-container {
    margin-left: 7.5px;
    margin-bottom: 15px;
    margin-top: 15px;
}

.cropper-view-box,
.cropper-face {
    border-radius: 50%;
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

.inputImage {
    text-align: center;
}

.uploadContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    padding: 15px 15px 15px 15px;
    padding-left: 0px;
    width: 600px;
    background-color: #ffffff;
}

.uploadLabel {
    width: 100%;
    text-align: center;
}

#uploadButt {
    width: 80px;
    height: 30px;
}

#deleteButt {
    border-radius: 5px;
    padding: 10px 10px 10px 10px;
    background-color: #CF1616;
    color: #ffffff;
    cursor: pointer;
}

#inputButton {
    border-radius: 5px;
    padding: 10px 10px 10px 10px;
    background-color: #D7F7F7;
    cursor: pointer;
}

.closeButton {
    width: 80px;
    height: 30px;
    border: none;
    border-radius: 5px;
    font-family: 'ProximaNova-Light';
    background-color: #CF1616;
    margin-left: 15px;
    color: #ffffff;
    cursor: pointer;
}


</style>