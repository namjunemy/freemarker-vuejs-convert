<template>
  <div class="col-sm-7">
    <h2>노출 문구 리스트
      <div class="float-right">
      </div>
    </h2>
    <hr/>

    <h4>등록된 컨텐츠
      <div class="float-right">
        <a href="#endOfHomeContents" class="button btn-sm btn-dark">아래로</a>
      </div>
    </h4>

    <hr/>

    <table class="table table-bordered" style="margin-top: 1rem;">
      <thead class="thead-light">
      <tr class="text-nowrap">
        <th scope="col">Idx</th>
        <th scope="col">노출순서</th>
        <th scope="col">문구</th>
        <th scope="col">랜딩 URL</th>
        <th scope="col">시작시간</th>
        <th scope="col">끝시간</th>
        <th scope="col">등록자</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(homePromotion, index) in propsSavedPromotionList.slice().reverse()" :key="index">
        <th scope="row">{{ index + 1}}</th>
        <td>{{homePromotion.order}}</td>
        <td>{{homePromotion.title}}</td>
        <td>
          <a v-bind:href="homePromotion.landingUrl" target="_blank">
            이동
          </a>
        </td>
        <td>{{homePromotion.startTime}}</td>
        <td>{{homePromotion.endTime}}</td>
        <td>{{homePromotion.updater}}</td>
        <td class="text-nowrap">
          <button type="button" class="btn btn-outline-success" @click="openModal(homePromotion)">
            수정
          </button>
          <button type="button" class="btn btn-outline-danger"
                  v-on:click="deleteSavedPromotion(homePromotion.idx)">
            -
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="float-right">
      <a href="#top" id="endOfHomeContents" class="button btn-sm btn-dark">위로</a>
    </div>
    <Modal v-if="showModal" @close="showModal = false">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <h5 slot="header">
        프로모션 문구 수정
      </h5>
      <form slot="body">
        <div class="form-group">
          <label class="col-form-label">Idx</label>
          <input type="text" class="form-control"
                 v-model="modalIdx" name="idx"
                 readonly>
        </div>
        <div class="form-group">
          <label class="col-form-label">Titie</label>
          <input type="text" required class="form-control" id="promotion-title"
                 v-model="modalTitle" name="title">
        </div>
        <div class="form-group">
          <label class="col-form-label">랜딩 URL</label>
          <input type="text" required class="form-control" id="promotion-url"
                 v-model="modalLandingUrl" name="landingUrl">
        </div>
      </form>
      <div slot="footer">
        <button slot="footer" type="button" class="btn btn-outline-primary"
                v-on:click="updateSavedPromotion()">
          수정
        </button>
        <button slot="footer" type="button" class="btn btn-outline-danger"
                @click="showModal=false">
          취소
        </button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Modal from '../common/Modal'

  export default {
    name: "HomePromotion",
    data: function () {
      return {
        showModal: false,
        modalIdx: null,
        modalTitle: null,
        modalLandingUrl: null,
        updatePromotion: null
      }
    },
    props: ['propsSavedPromotionList'],
    methods: {
      deleteSavedPromotion: function (promotionIdx) {
        this.$emit('deleteSavedPromotion', promotionIdx);
      },
      openModal: function (promotion) {
        this.updatePromotion = promotion;
        this.modalIdx = promotion.idx;
        this.modalTitle = promotion.title;
        this.modalLandingUrl = promotion.landingUrl;
        this.showModal = true;
      },
      updateSavedPromotion: function () {
        let newPromotion = {
          title: this.modalTitle,
          landingUrl: this.modalLandingUrl
        };
        this.$emit('updateSavedPromotion', this.modalIdx, newPromotion);
        this.showModal = false;
      }
    },
    components: {
      'Modal': Modal
    }
  }
</script>

<style scoped>

</style>
