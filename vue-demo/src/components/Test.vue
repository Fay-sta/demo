<template>
    <div class="content" v-loading="loadingContent" element-loading-text="加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <!-- 导航条 -->
        <div class="said">
            <!-- 导航条头部 -->
            <div class="said-head">
                <div class="head-title padding-20">
                    <img src="../assets/img/logo.svg" alt="logo">
                    <div>智空直播中心</div>
                </div>
                <div class="line"></div>
                <div class="head-nav">
                    <div class="nav" v-for="(it, index) in navList" :key="it.id">
                        <div :class="'nav-title ' + (flagIndex == index ? 'active-nav-title' : '')"
                            @click="changeNav(index)">
                            <div>
                                <img class="flag" src="../assets/img/flag.svg" alt="">
                                {{ it.name }}
                            </div>
                            <img src="../assets/img/close_down.svg" alt="" :class="it.handleFlag ? '' : 'down'">
                            <!--  <img src="../assets/img/open_up.svg" alt="" v-show="!it.handleFlag"> -->
                        </div>
                        <div :class="'nav-li' + navClass(it.handleFlag)">
                            <div v-for="(navItem, navItemIndex) in it.navItems" :key="navItem.id"
                                @click="getVideosList(it.id, navItem.id, navItemIndex)"
                                :class="'li ' + (navItem.handleFlag ? 'active-nav-item' : '')">
                                <img class="flag" src="../assets/img/sign.svg" alt="">
                                {{ navItem.name }}

                                <!-- 刷新渲染 -->
                                <div :key="flagKey + index + navItemIndex"></div>


                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <!-- 导航条底部 -->
            <div class="said-foot padding-20">
                <div class="foot-grid">
                    <img src="../assets/img/1.svg" alt="" @click="changeView(1)">
                    <img src="../assets/img/4.svg" alt="" @click="changeView(4)">
                    <img src="../assets/img/9.svg" alt="" @click="changeView(9)">
                    <img src="../assets/img/25.svg" alt="" @click="changeView(25)">
                </div>
                <div class="foot-tag cursor-pointer">
                    <img src="../assets/img/tag.svg" alt="">
                    新标签页打开
                </div>
                <div class="foot-back cursor-pointer">
                    <img src="../assets/img/back.svg" alt="">
                </div>
            </div>
        </div>

        <!-- 视频列表容器 -->
        <div class="main" v-loading="loadingMain" element-loading-text="加载中" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <div v-if="!viewNums" class="wh-1 not-view-nums">
                <div v-for="(item, index) in videosList" :key="index" :class="classMainBox(index)">
                    <div class="box-head">
                        <div>
                            <img src="../assets/img/sign.svg" alt="">
                            河豚{{ navItemFlags[navItemIndex] }}号
                        </div>
                        <div class="head-tail">
                            <img src="../assets/img/view.svg" alt="" title="展开">
                            <img src="../assets/img/close.svg" alt="" title="关闭">
                        </div>
                    </div>
                </div>
                <div v-if="videosList != 0" :class="'main-box wh-25'" style="background-image: none;">
                    <div class="box-head none">
                        <div>
                            <img src="../assets/img/sign.svg" alt="">
                            河豚{{ navItemFlags[navItemIndex] }}号
                        </div>
                        <div class="head-tail">
                            <img src="../assets/img/view.svg" alt="" title="展开" @click="changeView(1)">
                            <img src="../assets/img/close.svg" alt="" title="关闭">
                        </div>
                    </div>
                    <div class="source-none">
                        <div>
                            <img src="../assets/img/signal_source.svg" alt="">
                            <div class="none-text">无视频源接入</div>
                        </div>

                    </div>
                </div>
            </div>
            <div v-else class="wh-1 position-relative">
                <div class="carousel-arrow left-arrow">
                    <img src="../assets/img/arrow.svg" @click="arrowClick('left')" />
                </div>
                <el-carousel :interval="5000" arrow="never" :autoplay="false" ref="cardShow">
                    <el-carousel-item v-for="(item, index) in carouselItem" :key="index" class="flex flex-wrap">
                        <div v-for="(item, index) in viewNums" :key="index" :class="classMainBox(index)">
                            <div class="box-head">
                                <div>
                                    <img src="../assets/img/sign.svg" alt="">
                                    河豚{{ navItemFlags[navItemIndex] }}号
                                </div>
                                <div class="head-tail">
                                    <img src="../assets/img/view.svg" alt="" title="展开">
                                    <img src="../assets/img/close.svg" alt="" title="关闭">
                                </div>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
                <div class="carousel-arrow right-arrow">
                    <img src="../assets/img/arrow.svg" @click="arrowClick('right')" />
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import {
    getNavsList,
    getVideosList
} from '../api/test'
export default {
    name: 'Test',
    data() {
        return {
            navList: [],
            videosList: 0,
            viewNums: null,
            flagIndex: 0,
            flagKey: 0,
            loadingContent: false,
            loadingMain: false,
            navItemFlags: ['一', '二', '三', '四'],
            navItemIndex: 0,
        }
    },
    mounted() {
        this.loadingContent = true
        this.getNavsList()
    },
    computed: {
        // 计算轮播数
        carouselItem() {
            let carouselItem = parseInt(this.videosList / this.viewNums)
            if (!carouselItem) {
                this.viewNums = null
            }
            console.log(carouselItem);
            return carouselItem + 1
        }
    },
    methods: {
        // 获取导航条
        getNavsList() {
            getNavsList().then(res => {
                console.log(res, '导航条请求');
                if (res.data) {
                    this.navList = res.data
                    this.changeNav(0)
                    this.loadingContent = false
                }
            })
        },

        // 点击导航条
        changeNav(index) {
            console.log('点击了导航条');
            this.flagIndex = index
            this.flagKey += 1
            this.navList.map((it, i) => {
                if (index == i && !it.handleFlag) {
                    it.handleFlag = true
                    this.getVideosList(it.id, it.navItems[0].id, 0)
                } else {
                    it.handleFlag = false
                }
            })
        },

        // 获取视频列表
        getVideosList(navId, navItemId, index) {
            this.loadingMain = true
            this.navList[this.flagIndex].navItems.map((it, i) => {
                if (i == index) {
                    it.handleFlag = true
                    this.navItemIndex = i
                } else {
                    it.handleFlag = false
                }
            })
            getVideosList(navId, navItemId).then(res => {
                console.log(res, '视频列表请求');
                this.videosList = 0
                if (res.data) {
                    this.videosList = res.data
                    this.loadingMain = false
                }
            })
        },

        // 视频列表容器class
        classMainBox(index) {
            let classMain = 'main-box wh-' + this.viewNums
            if (index == 2) {
                classMain += ' info2'
            }
            return classMain
        },

        // 视图数量变换
        changeView(e) {
            this.viewNums = e
        },

        // 导航条展开或收起动画class
        navClass(e) {
            if (!e) {
                return ' max-height-0'
            }
            return ' max-height-100'
        },

        // 轮播切换
        arrowClick(val) {
            if (val === 'right') {
                this.$refs.cardShow.next()
            } else {
                this.$refs.cardShow.prev()
            }
        },
    },
}
</script>

<style lang="" scoped>
.content {
    width: 100vw;
    /* height: 100vh; */
    color: #fff;
    display: flex;
}

.said {
    width: 180px;
    height: calc(100vh - 100px);
    background-color: #232323;
    position: relative;
    padding: 20px 0;
}

.said-head {
    width: 180px;
}

.head-title {
    width: 100%;
    display: flex;
    font-size: 16px;
}

.line {
    width: 150px;
    margin: 0 auto;
    border-bottom: 1px solid #fff;
}

.head-title>img {
    margin-right: 20px;
}

.head-nav {
    padding: 10px 0;
}

.nav-title {
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-title>img {
    transform: rotate(0deg);
    transition: all 0.3s ease-in-out;
}

.down {
    transform: rotate(180deg) !important;
    -webkit-transform: rotate(180deg) !important;
    -moz-transform: rotate(180deg) !important;
    -o-transform: rotate(180deg) !important;
    -ms-transform: rotate(180deg) !important;
}

.flag {
    margin-right: 6px;
}

.nav-title:hover {
    background-color: #1234BB;
    cursor: pointer;
}

.nav-li {
    transition: max-height 0.2s ease-in-out;
}

.max-height-100 {
    max-height: 100%;
}

.max-height-0 {
    max-height: 0;
    overflow: hidden;
}

.nav-li .li {
    padding: 20px;
}

.nav-li .li:hover {
    background-color: #1234BB;
    cursor: pointer;
}

.said-foot {
    position: fixed;
    bottom: 0;
    width: 140px;
    background-color: #232323;
}

.said-foot .foot-grid {
    display: flex;
    justify-content: space-between;
}

.foot-grid {
    cursor: pointer;
}

.foot-tag {
    margin: 40px 0;
}

.foot-tag img {
    margin-right: 8px;
}

.foot-back {
    text-align: left;
}

.active-nav-title {
    background-color: #1234BB;
}

.active-nav-item {
    background-color: #1234bbb3;
}

.main {
    width: calc(100% - 180px);
    height: 100vh;
    background-color: #232323;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: auto;
}

.main-box {
    width: 25%;
    height: 25%;
    background-image: url(../assets/img/info.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.not-view-nums{
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
}
.info2 {
    background-image: url(../assets/img/info2.png);
}

.wh-1 {
    width: 100%;
    height: 100%;
}

.wh-4 {
    width: 50%;
    height: 50%;
}

.wh-9 {
    width: 33.3%;
    height: 33.3%;
}

.wh-25 {
    width: 25%;
    height: 25%;
}

.box-head {
    background-color: #232323bd;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    padding: 5px;
}

.none {
    background-color: #535353;
}

.box-head img {
    width: 9px;
    height: 9px;
    margin-top: 6px;
}

.head-tail img {
    width: 12px;
    height: 12px;
    margin: 0 3px;
    cursor: pointer;
}

.source-none {
    justify-content: center;
    display: flex;
    align-items: center;
    height: 100%;
}

.none-text {
    padding-top: 10px;
    padding-right: 100px;
}
.carousel-arrow{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 22;
    cursor: pointer;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.carousel-arrow:hover{
    background-color: #ffffff6e;
}
.carousel-arrow img{
    width: 30px;
    height: 30px;
}
.left-arrow{
    left: 20px;
    transform: rotate(180deg);
}
.right-arrow{
    right: 20px;
}
/deep/ .el-carousel{
    width: 100%;
    height: 100%;
}
/deep/ .el-carousel__container{
    height: 100%;
}
/deep/ .el-carousel__indicators--horizontal{
    display: none;
}
/deep/ .el-carousel__arrow{
    font-size: 30px !important;
    color: #1234BB;
}
</style>
