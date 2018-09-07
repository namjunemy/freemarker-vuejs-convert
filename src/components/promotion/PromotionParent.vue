<template>
  <div class="row">
    <Promotion v-bind:propsAddedList="addedList"
               v-on:addPromotion="addPromotion"
               v-on:removeAddedPromotion="removeAddedPromotion"
               v-on:saveAddedPromotion="saveAddedPromotion"></Promotion>
    <HomePromotion v-bind:propsSavedPromotionList="savedPromotionList"
                   v-on:deleteSavedPromotion="deleteSavedPromotion"></HomePromotion>
  </div>
</template>

<script>
  import Promotion from './Promotion';
  import HomePromotion from './HomePromotion';

  export default {
    name: "PromotionParent",
    data: function () {
      return {
        addedList: [],
        savedPromotionList: [],
        homePromotionApiUrl: 'http://localhost:9090/api/homePromotion',
        startDate: null,
        endDate: null,
      }
    },
    methods: {
      addPromotion(promotion) {
        if (promotion.title === null || promotion.landingUrl === null) {
          alert('프로모션 정보를 입력하세요.');
          return;
        }
        this.addedList.push(promotion);
        sessionStorage.setItem('addedPromotionList', JSON.stringify(this.addedList));
      },
      removeAddedPromotion() {
        this.addedList.splice(this.addedList.length - 1, 1);
        sessionStorage.removeItem('addedPromotionList');
        sessionStorage.setItem('addedPromotionList', JSON.stringify(this.addedList))
      },
      saveAddedPromotion(startDate, endDate) {
        let saveRequestList = [];
        this.addedList.forEach((obj, index) => {
          let saveRequest = {
            title: obj.title,
            landingUrl: obj.landingUrl,
            order: index + 1,
            startTime: startDate,
            endTime: endDate,
            updater: '김남준'
          };
          saveRequestList.push(saveRequest);
        });
        console.log(saveRequestList);
        this.$axios.post(this.homePromotionApiUrl, JSON.stringify(saveRequestList), {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        })
        .then(response => {
          console.log(response);
          this.initialSetup();
        })
        .catch((err) => {
          this.catchAxiosError(err);
        });
      },
      getSavedPromotion() {
        this.$axios.get(this.homePromotionApiUrl).then((response) => {
          response.data.forEach((item) => {
            this.savedPromotionList.push(item);
          });
          sessionStorage.setItem('savedPromotionList', JSON.stringify(this.savedPromotionList));
        }).catch((err) => {
          this.catchAxiosError(err);
        });
      },
      deleteSavedPromotion(promotionIdx) {
        this.$axios.delete(this.homePromotionApiUrl + '/' + promotionIdx, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        })
        .then(response => {
          console.log(response);
          this.initialSetup();
        })
        .catch((err) => {
          this.catchAxiosError(err);
        });
      },
      catchAxiosError(error) {
        if (error.response) {
          console.log(error.response.headers);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
        console.log(error.config);
      },
      initialSetup: function () {
        sessionStorage.clear();
        this.savedPromotionList = [];
        this.addedList = [];
        this.getSavedPromotion();
      },
    },
    created: function () {
      this.initialSetup();
    },
    destroyed: function () {
      sessionStorage.clear();
    },
    components: {
      'Promotion': Promotion,
      'HomePromotion': HomePromotion
    }
  }
</script>

<style scoped>

</style>
