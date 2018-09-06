<template>
  <div class="row">
    <Content v-bind:propsContentList="contentList"
             v-bind:propsSelectedList="selectedList"
             v-bind:propsContentApiUrl="contentApiUrl"
             v-bind:propsStartDate="startDate"
             v-bind:propsEndDate="endDate"
             v-bind:propsDateOptions="options"
             v-on:getContentList="getContentList"
             v-on:expose="expose"
             v-on:toggleCheck="toggleCheck"></Content>
    <HomeContent v-bind:propsSelectedList="selectedList"
                 v-bind:propsHomeContentList="homeContentList"
                 v-on:saveSelectedList="saveSelectedList"></HomeContent>
  </div>
</template>

<script>
  import Content from "./Content";
  import HomeContent from "./HomeContent"

  export default {
    name: "BodyContent",
    data: function () {
      return {
        contentList: [],
        selectedList: [],
        homeContentList: [],
        contentApiUrl: 'http://localhost:9090/api/content',
        homeContentApiUrl: 'http://localhost:9090/api/homeContent',
        startDate: null,
        endDate: null,
        options: {
          // https://momentjs.com/docs/#/displaying/
          format: 'YYYY/MM/DD HH:mm',
          useCurrent: true,
          showClear: true,
          showClose: true
        }
      }
    },
    methods: {
      getContentList(req) {
        this.$axios.get(this.contentApiUrl + '/' + req).then((response) => {
          let tempList = [];
          response.data.forEach((item) => {
            let obj = {group: req, checked: false, item: item};
            tempList.push(obj);
          });
          sessionStorage.setItem(req.toString(), JSON.stringify(tempList));
        }).catch((err) => {
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
      expose(req) {
        this.contentList = [];
        this.contentList = JSON.parse(sessionStorage.getItem(req));
      },
      toggleCheck(content, index) {
        let flag = this.contentList[index].checked;
        this.contentList[index].checked = !flag;
        sessionStorage.removeItem(content.group.toString());
        sessionStorage.setItem(content.group.toString(), JSON.stringify(this.contentList));
        if (!flag) {
          this.selectedList.push(content.item);
        } else {
          this.selectedList.splice(this.selectedList.indexOf(content.item), 1);
        }
        sessionStorage.removeItem('selected');
        sessionStorage.setItem('selected', JSON.stringify(this.selectedList))
      },
      initialSetup() {
        sessionStorage.clear();
        this.selectedList = [];
        this.homeContentList = [];
        this.getContentList('created');
        this.getContentList('like');
        this.expose('like');
        this.getHomeContentList();
      },
      saveSelectedList(startDate, endDate) {
        let saveRequestList = [];
        this.selectedList.forEach((obj, index) => {
          let saveRequest = {
            contentIdx: obj.idx,
            order: index + 1,
            startTime: startDate,
            endTime: endDate,
            updater: '김남준'
          };
          saveRequestList.push(saveRequest);
        });
        console.log(saveRequestList);
        this.$axios.post(this.homeContentApiUrl, JSON.stringify(saveRequestList), {
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
      getHomeContentList() {
        this.$axios.get(this.homeContentApiUrl).then((response) => {
          response.data.forEach((item) => {
            this.homeContentList.push(item);
          });
          sessionStorage.setItem('homeContentList', JSON.stringify(this.homeContentList));
        }).catch((err) => {
          this.catchAxiosError(err);
        });
      }
    },
    created: function () {
      this.initialSetup();
    },
    components: {
      'Content': Content,
      'HomeContent': HomeContent
    }
  }
</script>

<style scoped>

</style>
