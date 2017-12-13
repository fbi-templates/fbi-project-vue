<template>
  <div class="index">
    <h1>fbi</h1>
    <h3>Welcome to Your Vue.js App Support By Fbi</h3>
    <div id="page-loader" class="avatar-loader" :class="{'go-down': isGoDown}">
      <div class="avatar active">
        <div class="avatar-wrapper">
          <svg version="1.1" id="loading-avatar" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
            <g class="circle">
              <path fill="#A5A5A5" d="M256,29.245C130.771,29.245,29.245,130.754,29.245,256c0,125.225,101.526,226.755,226.755,226.755 c125.229,0,226.755-101.53,226.755-226.755C482.755,130.754,381.229,29.245,256,29.245z"></path>
            </g>
            <circle class="out" fill="none" stroke="#888888" stroke-width="30" stroke-miterlimit="10" cx="256" cy="256" r="222.127"></circle>
            <g>
              <circle class="fill" id="avatar-fill" fill="none" stroke="#292929" stroke-width="34" stroke-miterlimit="10" cx="256" cy="256" r="223.978"></circle>
              <circle class="fill" fill="none" stroke="#888888" stroke-width="35" stroke-miterlimit="10" cx="256" cy="256" r="223.978"></circle>
              <circle class="fill" fill="none" stroke="#292929" stroke-width="36" stroke-miterlimit="10" cx="256" cy="256" r="223.978"></circle>
            </g>
          </svg>
          <img class="ninja" alt="Avatar" src="../static/img/avatar.svg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isGoDown: false
    }
  },
  methods: {
  },
  components: {
  },
  mounted () {
    setTimeout(() => {
      // this.isGoDown = true
    }, 500)
  }
}
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}

h1 {
  margin: 0;
}

.avatar-loader {
  transition: all 0.5s;
}

.go-down {
  transform: translate3d(0, 100%, 0);
}

#page-loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#page-loader {
  background-color: #222;
  visibility: visible;
  z-index: 1000;
}

#page-loader .compatibility {
  color: #CFCFCF;
}

#page-loader .compatibility:after {
  content: " ";
  width: 100px;
  height: 100px;
  position: relative;
  display: inline-block;
  z-index: 1;
  background: url(/images/avatar.svg) no-repeat center center;
  background-size: auto 100%;
  margin-top: 40px;
  margin-bottom: -100px;
}

#page-loader .compatibility h1 {
  font-size: 69px;
  font-weight: bold;
  margin-bottom: 10px;
  letter-spacing: -4px;
}

#page-loader .compatibility p {
  line-height: 28px;
  font-size: 16px;
}

#page-loader .compatibility h3 {
  text-transform: uppercase;
  line-height: 38px;
}

#page-loader .compatibility small {
  display: block;
  margin-top: 25px;
  font-size: 12px;
}

#page-loader .compatibility a {
  font-size: 12px;
  text-decoration: underline;
  color: inherit;
}

.pages {
  display: table;
}

.pages header {
  margin: 0 20px;
  text-align: left;
}

.pages header p {
  font-size: 1.18em;
  color: #6a6a6a;
  line-height: 1.5em;
  word-spacing: 0.035em;
}

.pages header h1 {
  color: #cfcfcf;
  font-size: 3em;
  line-height: 1.4em;
  font-weight: 700;
  letter-spacing: -2px;
  text-transform: lowercase;
  width: 100%;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.15);
}

.pages .centered {
  display: block;
  padding: 80px 0 60px;
}

.avatar-loader {
  display: table;
}

.avatar-loader .avatar {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.avatar-loader .avatar.first .fill:nth-child(1) {
  animation: dash-loop 1.3s cubic-bezier(0.5, 0.35, 0, 1) forwards;
}

.avatar-loader .avatar.second .fill:nth-child(2) {
  animation: dash-loop 1.3s cubic-bezier(0.5, 0.35, 0, 1) forwards;
}

.avatar-loader .avatar.third .fill:nth-child(3) {
  animation: dash-loop 1.3s cubic-bezier(0.5, 0.35, 0, 1) forwards;
}

.avatar-loader .avatar-wrapper {
  display: block;
  position: relative;
  width: 142px;
  height: 142px;
  margin: 0 auto
}

.avatar-loader svg {
  display: block;
  width: 142px;
  height: 142px;
  opacity: 0;
}

.avatar.active .circle {

}

.avatar-loader img {
  position: absolute;
  display: block;
  width: 90px;
  height: 90px;
  opacity: 0;
  top: 25px;
  left: 22px;
}

@-webkit-keyframes dash-loop {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes dash-loop {
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
