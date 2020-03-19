<template>
  <div class="videoMain">
    <div class="videoFalse" v-if="!showVideo">
        <button class="myButton" @click="showMyVideo"></button>
    </div>
    <video-player
      ref="videoPlayer"
      class="video-player vjs-custom-skin my_video"
      :playsinline="true"
      :options="playerOptions"
     @pause="onPlayerPause($event)"
      v-if="showVideo"
    ></video-player>
    <div class="title">{{channelData.label}}</div>
  </div>
  <!--  @play="onPlayerPlay($event)" -->
</template>

<script >
export default {
  name: 'VideoMain',
  props: {
    channelData: {
      type: Object,
      required: true
    },
    // num:{
    //     required: true,
    //     type:Number
    // },
    dvrData: {
      type: Object,
      required: true
    },
    jsession: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      showVideo: false,
      playerOptions: {
        
      }
    }
  },
  computed: {},
  mounted() {
    // this.getVideoOptions()
  },
  methods: {
    getVideoOptions() {
      let SRC = `http://chinamdvr.com:6604/hls/1_${this.dvrData.dvr_id}_${this.channelData.channel}_${this.dvrData.stream_type}.m3u8?JSESSIONID=${this.jsession}`

      console.log(SRC)

      this.playerOptions = {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        // preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: this.dvrData.width_height, // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'application/x-mpegURL', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src:
              // 'https://cdn.letv-cdn.com/2018/12/05/JOCeEEUuoteFrjCg/playlist.m3u8' // url地址，从别的博主那看来的地址，亲测可用
              SRC
          }
        ],
        hls: true,
        // poster: 'http://pic33.nipic.com/20131007/13639685_123501617185_2.jpg', // 你的封面地址
        // width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    },
    // onPlayerPlay(player) {
    //   this.getVideoOptions()
    //   console.log(111)
    // },
   async showMyVideo(){
      this.showVideo = true
      await this.getVideoOptions()
      // this.$refs.videoPlayer.play()
    },
    onPlayerPause(){
      this.showVideo = false
    }
  },
  beforeDestroy() {
    if(this.$refs.videoPlayer){
      console.log(231)
      this.$refs.videoPlayer.dispose()
    }
  }
}
</script>

<style scoped>
.videoMain {
  /* width: 600px;
  height: 200px; */
}
.videoFalse{
  height: 409px;
  background-color: #000;
  position: relative;
}
.title {
  text-align: center;
  color: #333;
  background-color: #f2f2f2;
  height: 40px;
  line-height: 40px;
}
.myButton{
  display: block;
  width: 105px;
  height: 70px;
  background-color: #000;
  border: 2px solid #fff;
  cursor: pointer;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  text-align: center;

}
.myButton:hover{
  background-color: #2076c0;
}
.myButton::before{
  text-align: center;
  content: "\f101";
  font-family: VideoJS;
  color: #fff;
  font-size: 36px;
  line-height: 70px;
}
</style>
