<template>
  <div class="row">
    <Content v-bind:propsContentList="contentList"
             v-bind:propsSelectedList="selectedList"
             v-bind:propsContentApiUrl="contentApiUrl"
             v-bind:propsStartDate="startDate"
             v-bind:propsEndDate="endDate"
             v-on:getContentList="getContentList"
             v-on:expose="expose"
             v-on:toggleCheck="toggleCheck"></Content>
    <HomeContent v-bind:propsSelectedList="selectedList"
                 v-bind:propsHomeContentList="homeContentList"
                 v-bind:propsLastScheduledDate="lastScheduledDate"
                 v-on:saveSelectedList="saveSelectedList"></HomeContent>
  </div>
</template>

<script>
  import Content from "./Content";
  import HomeContent from "./HomeContent"

  export default {
    name: "ContentParent",
    data: function () {
      return {
        contentList: [],
        selectedList: [],
        homeContentList: [],
        contentApiUrl: 'http://localhost:9090/api/content',
        homeContentApiUrl: 'http://localhost:9090/api/homeContent',
        startDate: null,
        endDate: null,
        lastScheduledDate: null
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
      expose(req) {
        this.contentList = [];
        this.contentList = JSON.parse(sessionStorage.getItem(req));
      },
      toggleCheck(content, index) {
        let flag = this.contentList[index].checked;
        if (!flag) {
          if (this.selectedList.length === 8) {
            alert('8개 이상 추가할 수 없습니다.');
            return;
          }
          this.selectedList.push(content.item);
        } else {
          this.selectedList.splice(this.selectedList.indexOf(content.item), 1);
        }
        this.contentList[index].checked = !flag;
        sessionStorage.removeItem(content.group.toString());
        sessionStorage.setItem(content.group.toString(), JSON.stringify(this.contentList));
        sessionStorage.removeItem('selectedContentList');
        sessionStorage.setItem('selectedContentList', JSON.stringify(this.selectedList))
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
          if (this.homeContentList.length === 0) {
            this.lastScheduledDate = null;
          } else {
            this.lastScheduledDate = new Date(JSON.parse(
              sessionStorage.getItem('homeContentList')).pop().endTime);
          }
        }).catch((err) => {
          this.catchAxiosError(err);
        });
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
      }
    },
    created: function () {
      this.initialSetup();
    },
    destroyed: function () {
      sessionStorage.clear();
    },
    components: {
      'Content': Content,
      'HomeContent': HomeContent
    }
  }
</script>

<style scoped>

</style>
