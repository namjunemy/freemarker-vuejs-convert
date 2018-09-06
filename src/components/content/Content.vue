<template>
  <div class="col-sm-6">
    <h2>컨텐츠 리스트</h2>
    <hr>

    <div class="clearfix">
      <div class="btn-group float-left" role="group">
        <button v-on:click="expose('created')" class="btn btn-outline-primary">최신순</button>
        <button v-on:click="expose('like')" class="btn btn-outline-primary">인기순</button>
      </div>
    </div>

    <table class="table table-bordered" style="margin-top: 1rem;">
      <thead class="thead-light">
      <tr class="text-nowrap">
        <th scope="col">순위</th>
        <th scope="col">이미지</th>
        <th scope="col">제목</th>
        <th scope="col">재생시간</th>
        <th scope="col">좋아요수</th>
        <th scope="col">업로드일</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="(content, index) in propsContentList"
          v-bind:class="{textChecked: content.checked}">
        <th scope="row">{{index + 1}}</th>
        <td class="w-25">
          <a v-bind:href="content.item.platformImgUrl" target="_blank">
            <img v-bind:src="content.item.platformImgUrl" class="img-thumbnail">
          </a>
        </td>
        <td>{{content.item.title}}</td>
        <td>{{content.item.playTime}}</td>
        <td>{{content.item.like}}</td>
        <td>{{content.item.createdTime}}</td>
        <td>
          <button v-on:click="toggleCheck(content, index)" type="button"
                  class="btn btn-outline-primary">
            <i class="fas fa-check"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

  export default {
    name: "Content",
    props: ['propsContentList', 'propsSelectedList'],
    methods: {
      getContentList(req) {
        this.$emit('getContentList', req);
      },
      expose(req) {
        this.$emit('expose', req);
      },
      toggleCheck(content, index) {
        this.$emit('toggleCheck', content, index);
      }
    }
  }
</script>

<style scoped>
  .textChecked {
    text-decoration: line-through;
    color: #b3adad;
  }
</style>
