<template>
  <div class="add-table-container">
    <div id="container">
      <h1>&bull; Add New Table &bull;</h1>
      <div class="underline mt-2"></div>
      <div class="spinner-container">
        <Spinner v-if="showSpinner" class="spinner" />
      </div>
      <v-form @submit.prevent="addTableToDb" ref="form" class="mt-4">
        <div class="form-box-container">
          <div class="text-box-container">
            <v-text-field
              class="my-4 text-box"
              v-model="tableInfo.tableNumber"
              :rules="nameRules"
              :counter="10"
              label="Table Number"
              required
            ></v-text-field>
            <v-text-field
              v-model="tableInfo.numberOfSeats"
              class="text-box"
              :rules="nameRules"
              :counter="10"
              label="Number of Seats"
              type="number"
              required
            ></v-text-field>
          </div>
          <div class="img-box-container">
            <v-img
              :class="isbase64Available ? 'bg-transparent' : 'input-img'"
              @click="onClickImage"
              :aspect-ratio="1"
              :src="tableInfo.base64 != null ? tableInfo.base64 : renderImage()"
            ></v-img>
          </div>
        </div>
        <v-row>
          <v-col>
            <v-file-input
              id="image"
              class="d-none"
              @change="handleImage"
              label="Select file"
              density="compact"
              prepend-icon=""
            >
            </v-file-input>
          </v-col>
        </v-row>
        <div class="submit-btn-container">
          <v-btn type="submit" class="add-table-btn" elevation="0">
            Submit
          </v-btn>
        </div>
      </v-form>
      <!-- // End form -->
    </div>
  </div>
</template>
<script>
import Spinner from "../components/utils/Spinner.vue";
import ApiCall from "../api/apiInterface";
export default {
  name: "AddTable",
  components: {
    Spinner,
  },
  data() {
    return {
      showSpinner: false,
      showPseudoContent: true,
      isbase64Available: false,
      tableInfo: {
        tableNumber: "",
        numberOfSeats: 0,
        image: "",
        base64: "",
      },
    };
  },
  methods: {
    renderImage() {
      return new URL("../assets/image/employeeImg.jpg", import.meta.url).href;
    },
    onClickImage() {
      document.getElementById("image").click();
    },
    handleImage(e) {
      const selectedImage = e.target.files[0];
      this.tableInfo.image = selectedImage.name;
      // this.employeeInfo.image = URL.createObjectURL(selectedImage);
      this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("base 64 working", e.target.result);
        this.tableInfo.base64 = e.target.result;
      };
      console.log(this.tableInfo.base64);
      reader.readAsDataURL(fileObject);
      this.showPseudoContent = false;
      this.isbase64Available = true;
    },
    async addTableToDb() {
      console.log("button clicked");
      this.showSpinner = true;
      try {
        await ApiCall.post("api/table/create", this.tableInfo);
        this.showSpinner = false;
      } catch (e) {
        this.showSpinner = false;
        console.log(e);
      }
      this.tableInfo.base64 = "";
      this.isbase64Available = false;
      this.$refs.form.reset();
    },
  },
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Montserrat:400,700);

* {
  box-sizing: border-box;
}
.add-table-container {
  min-height: 100vh;
  background-image: url("../assets/logo-images/cart_bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-block: 60px;
}
#container {
  border: solid 3px #000;
  background-color: #ffffffaa;
  max-width: 768px;
  padding: 10px;
  margin: auto;
  position: relative;
}
@media screen and (max-width: 768px) {
  #container {
    margin: 10px auto;
    width: 95%;
  }
}
h1 {
  font-family: "Montserrat", Arial, sans-serif;
  color: #474544;
  font-size: clamp(0.73rem, -0.875rem + 8.333vw, 2rem);
  font-weight: 700;
  letter-spacing: 7px;
  text-align: center;
  text-transform: uppercase;
}

.underline {
  border-bottom: solid 2px #474544;
  margin: -0.512em auto;
  width: clamp(53px, 68px, 80px);
}
.spinner-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
form {
  padding: 20px;
  margin: 40px 0;
}
.form-box-container {
  display: flex;
  flex-direction: column;
  height: auto;
}
.img-box-container {
  display: flex;
  justify-content: center;
}
/* .img-box-container img {
  display: block;
} */
@media screen and (min-width: 768px) {
  .form-box-container {
    flex-direction: row;
    justify-content: space-between;
    height: 200px;
  }
  .text-box-container {
    width: 50%;
  }
}
.text-box {
  background-color: white;
}

.input-img {
  background-color: #ccc;
  border-radius: 2px;
  flex-grow: 0;
  height: 180px;
  width: 250px;
}
.input-img::before {
  content: "Insert a image";
  color: #7e7e7e;
  position: absolute;
  font-size: clamp(0.6rem, -0.875rem + 8.333vw, 0.95rem);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.bg-transparent {
  border-radius: 2px;
  flex-grow: 0;
  height: 180px;
  width: 250px;
  background-color: transparent;
}
.submit-btn-container {
  display: flex;
  justify-content: center;
}
.add-table-btn {
  width: 100px;
}
@media screen and (min-width: 768px) {
  .submit-btn-container {
    justify-content: flex-start;
  }
  .add-table-btn {
    width: auto;
  }
}
.add-table-btn {
  margin-top: 20px;
  font-size: 16px;
  letter-spacing: 0;
  border-radius: 0;
  text-transform: capitalize;
  background-color: transparent;
  background-color: #e6683c;
  color: white;
}
</style>