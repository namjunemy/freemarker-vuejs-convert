<template>
  <div class="col-sm-7">
    <h2>노출 컨텐츠 리스트
      <div class="float-right">
      </div>
    </h2>
    <hr/>

    <h4>컨텐츠 추가
      <div class="float-right">
        <button type="button" class="btn btn-outline-primary" onclick="preview()">
          홈 미리보기
        </button>
        <button v-on:click="saveSelectedList()" type="button" class="btn btn-outline-success">
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
        <th scope="col">프로그램</th>
        <th scope="col">이미지</th>
        <th scope="col">제목</th>
        <th scope="col">재생시간</th>
        <th scope="col">타입</th>
        <th scope="col">좋아요수</th>
        <th scope="col">업로드일</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(content, index) in propsSelectedList">
        <th scope="row">{{ index + 1}}</th>
        <td>{{content.platformContentTitle}}</td>
        <td class="w-25">
          <a v-bind:href="content.platformImgUrl" target="_blank">
            <img v-bind:src="content.platformImgUrl" class="img-thumbnail">
          </a>
        </td>
        <td>{{content.title}}</td>
        <td>{{content.playTime}}</td>
        <td>{{content.type}}</td>
        <td>{{content.like}}</td>
        <td>{{content.createdTime}}</td>
      </tr>
      </tbody>
    </table>

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
        <th scope="col">노출위치</th>
        <th scope="col">이미지</th>
        <th scope="col">제목</th>
        <th scope="col">좋아요수</th>
        <th scope="col">시작시간</th>
        <th scope="col">끝시간</th>
        <th scope="col">등록자</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(homeContent, index) in propsHomeContentList.slice().reverse()">
        <th scope="row">{{ index + 1}}</th>
        <td>{{homeContent.order}}</td>
        <td class="w-25">
          <a v-bind:href="homeContent.content.platformImgUrl" target="_blank">
            <img v-bind:src="homeContent.content.platformImgUrl" class="img-thumbnail">
          </a>
        </td>
        <td>{{homeContent.content.title}}</td>
        <td>{{homeContent.content.like}}</td>
        <td>{{homeContent.startTime}}</td>
        <td>{{homeContent.endTime}}</td>
        <td>{{homeContent.updater}}</td>
      </tr>
      </tbody>
    </table>
    <div class="float-right">
      <a href="#top" id="endOfHomeContents" class="button btn-sm btn-dark">위로</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeContent",
    props: ['propsSelectedList', 'propsHomeContentList'],
    data: function () {
      return {
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
      saveSelectedList() {
        if (!(this.propsSelectedList.length === 8)) {
          alert("컨텐츠를 8개 선택하세요.");
          return;
        }
        if (this.startDate === null || this.endDate === null) {
          alert("스케쥴링 시작, 끝시간을 선택하세요.");
          return;
        }
        this.$emit('saveSelectedList', this.startDate, this.endDate);
        this.startDate = null;
        this.endDate = null;
      }
    }
  }
</script>

<style scoped>

</style>
