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
      <tr v-for="(homePromotion, index) in propsSavedPromotionList.slice().reverse()">
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
          <button type="button" class="btn btn-outline-success" @click="showModal = true">
            수정
          </button>
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
                <label for="promotion-idx" class="col-form-label">Idx</label>
                <input type="text" class="form-control"
                       v-bind:value="homePromotion.idx" name="idx"
                       readonly>
              </div>
              <div class="form-group">
                <label for="promotion-title" class="col-form-label">Titie</label>
                <input type="text" required class="form-control" id="promotion-title"
                       v-bind:value="homePromotion.title" name="title">
              </div>
              <div class="form-group">
                <label for="promotion-url" class="col-form-label">랜딩 URL</label>
                <input type="text" required class="form-control" id="promotion-url"
                       v-bind:value="homePromotion.landingUrl" name="landingUrl">
              </div>
            </form>
          </Modal>
<!--<div class="modal fade"-->
     <!--id="target"-->
     <!--tabindex="-1"-->
     <!--role="dialog"-->
     <!--aria-labelledby="myLargeModalLabel" aria-hidden="true">-->
  <!--<div class="modal-dialog modal-lg">-->
    <!--<div class="modal-content">-->
      <!--<div class="modal-header">-->
        <!--<h5 class="modal-title" id="exampleModalLabel">프로모션 문구 수정</h5>-->
        <!--<button type="button" class="close" data-dismiss="modal"-->
                <!--aria-label="Close">-->
          <!--<span aria-hidden="true">&times;</span>-->
        <!--</button>-->
      <!--</div>-->
      <!--<div class="modal-body">-->
        <!--<form id="promotion${homePromotions?size - homePromotion_index}"-->
              <!--method="post"-->
              <!--action="/homePromotion/${homePromotion.idx}">-->
          <!--<input type="hidden" name="_method" value="put"/>-->
          <!--<div class="form-group">-->
            <!--<label for="promotion-idx" class="col-form-label">Idx</label>-->
            <!--<input type="text" class="form-control" id="promotion-idx"-->
                   <!--value="${homePromotions?size - homePromotion_index}" name="idx"-->
                   <!--readonly>-->
          <!--</div>-->
          <!--<div class="form-group">-->
            <!--<label for="promotion-title" class="col-form-label">Titie</label>-->
            <!--<input type="text" required class="form-control" id="promotion-title"-->
                   <!--value="${homePromotion.title}" name="title">-->
          <!--</div>-->
          <!--<div class="form-group">-->
            <!--<label for="promotion-url" class="col-form-label">랜딩 URL</label>-->
            <!--<input type="text" required class="form-control" id="promotion-url"-->
                   <!--value="${homePromotion.landingUrl}" name="landingUrl">-->
          <!--</div>-->
        <!--</form>-->
      <!--</div>-->
      <!--<div class="modal-footer">-->
        <!--<button type="button" class="btn btn-secondary" data-dismiss="modal">취소-->
        <!--</button>-->
        <!--<button type="submit"-->
                <!--form="promotion${homePromotions?size - homePromotion_index}"-->
                <!--class="btn btn-primary">저장-->
        <!--</button>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
<!--</div>-->
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
  </div>
</template>

<script>
  import Modal from '../common/Modal'

  export default {
    name: "HomePromotion",
    data: function () {
      return {
        showModal: false
      }
    },
    props: ['propsSavedPromotionList'],
    methods: {
      deleteSavedPromotion: function (promotionIdx) {
        this.$emit('deleteSavedPromotion', promotionIdx);
      },
      updateSavedPromotion: function () {
      }
    },
    components: {
      'Modal': Modal
    }
  }
</script>

<style scoped>

</style>
