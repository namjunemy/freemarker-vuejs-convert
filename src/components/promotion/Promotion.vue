<template>
  <div class="col-sm-5">
    <h2>프로모션 문구 리스트</h2>
    <hr>
    <div>
      <form>
        <div class="form-group">
          <label for="title">문구</label>
          <input v-model="newPromotionTitle" type="text" required class="form-control" id="title"
                 name="title"
                 placeholder="Title">
        </div>
        <div class="form-group">
          <label for="landingUrl">랜딩 URL</label>
          <input v-model="newLandingUrl" type="text" required class="form-control" id="landingUrl"
                 name="landingUrl"
                 placeholder="Landing url">
        </div>
        <button type="button" class="btn btn-primary"
                style="margin-bottom: 1rem; margin-top: 1rem"
                v-on:click="addPromotion()">
          추가
        </button>
      </form>
    </div>

    <h4>컨텐츠 추가
      <div class="float-right">
        <button type="button" class="btn btn-outline-danger"
                v-on:click="removeAddedPromotion()">
          삭제
        </button>
        <button type="button" class="btn btn-outline-primary"
                onclick="preview()">
          홈 미리보기
        </button>
        <button type="button" class="btn btn-outline-success" v-on:click="saveAddedPromotion()">
          저장하기
        </button>
      </div>
    </h4>

    <hr/>

    <div class="row">
      <div class="col-sm-6 align-content-center">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">시작시간</span>
          </div>
          <date-picker v-model="startDate" :config="options"></date-picker>
        </div>
      </div>
      <div class="col-sm-6 align-items-center">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon2">종료시간</span>
          </div>
          <date-picker v-model="endDate" :config="options"></date-picker>
        </div>
      </div>
    </div>

    <table class="table table-bordered" style="margin-top: 1rem;">
      <thead class="thead-light">
      <tr class="text-nowrap">
        <th scope="col">노출순서</th>
        <th scope="col">문구</th>
        <th scope="col">랜딩 URL</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(promotion, index) in propsAddedList">
        <th scope="row">{{ index + 1}}</th>
        <td>{{promotion.title}}</td>
        <td>{{promotion.landingUrl}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "Promotion",
    props: ['propsAddedList'],
    data: function () {
      return {
        newPromotionTitle: null,
        newLandingUrl: null,
        startDate: null,
        endDate: null,
        options: {
          format: 'YYYY/MM/DD HH:mm',
          useCurrent: true,
          showClear: true,
          showClose: true
        }
      }
    },
    methods: {
      addPromotion() {
        let promotion = {
          title: this.newPromotionTitle,
          landingUrl: this.newLandingUrl
        };
        this.$emit('addPromotion', promotion);
      },
      removeAddedPromotion() {
        this.$emit('removeAddedPromotion');
      },
      saveAddedPromotion() {
        if (this.startDate === null || this.endDate === null) {
          alert("스케쥴링 시작, 끝시간을 선택하세요.");
          return;
        }
        this.$emit('saveAddedPromotion', this.startDate, this.endDate);
        this.newPromotionTitle = null;
        this.newLandingUrl = null;
        this.startDate = null;
        this.endDate = null;
      }
    }
  }
</script>

<style scoped>

</style>
