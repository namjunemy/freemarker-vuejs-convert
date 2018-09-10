<template>
  <div id="page-content-wrapper">
    <div class="container-fluid">
      <h1>Intro</h1>
      <p>포털개발팀에서 사용하는 기술 스펙 적응, 실무를 하기 전 웹 서비스에 대한 지식과 기술을 습득을 위한 파일럿 프로젝트 진행</p>
      <p>주제 : TV 줌 CMS</p>
      <p>일정 : 8.1(수) ~ 9.14(금)</p>
      <p><a
        href="https://docs.google.com/presentation/u/1/d/1AiK5_nRTQGDJsYcsZZqMCCqXdYRG8tjwktVD5GoQzVs/edit#slide=id.p"
        class="btn btn-secondary" target="_blank" id="menu-toggle">Document</a>
      </p>

      <h3>Requirements</h3>
      <p>CMS의 디자인은 상관없이 기능 위주의 구현</p>
      <ol>
        <li>홈 메인 상단 노출 컨텐츠 관리</li>
        <li>상단 프로모션 문구 관리</li>
        <li>홈 미리보기(마크업 제공)</li>
      </ol>

      <h3>Optional Requirements</h3>
      <ol>
        <li>뷰 페이지 미리보기(video.js 학습하기 위함)</li>
        <li>메인 상단 노출 컨텐츠 스케쥴링</li>
        <li>상단 프로모션 스케쥴링</li>
        <li>레디스 데이터(재생수 등) 확인 및 관리</li>
      </ol>

      <h3>Technical Requirements</h3>
      <ol>
        <li>Back-end : Spring Boot, Gradle, Java 8, JPA, Querydsl, (Optional)Redis/Ehcache/Guava
          cache/Java Local cache
        </li>
        <li>Front-end : Freemarker, Vue.js, Webpack, (Optional)ES6
        </li>
      </ol>
    </div>
  </div>
  <!-- End of Page Content -->
</template>

<script>
  export default {
    name: "Index"
  }
</script>

<style scoped>

</style>
