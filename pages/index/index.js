
import dayjs from 'dayjs';
import API from '../../utils/api.js';
import { formatDay, formatDate, formatWeek, formatMonth } from '../../utils/util';

let touchDot = 0;//触摸时的原点  
// let time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动  
// let interval = "";// 记录清理时间记录

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShowOther: false,
        calendarData: [],
        from: "",
        to: "",
        isIphoneX: app.globalData.isIphoneX,
        current: 10,
        shareImg: {},
        showDrawer: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
            mask: true
        })

        API.getData({
            from: dayjs().subtract(10, 'day').format('YYYYMMDD'),
            to: dayjs().format('YYYYMMDD')
        }).then(resData => {
            //   console.log('resData', resData)
            const result = resData.data;
            console.log('result', result)
            if (result.status === "OK") {
                wx.hideLoading()
                let { hasMore, ...resultData } = result.result
                const formatResultData = Object.values(resultData).map((item) => {
                    const date = formatDate(item.dateKey)
                    const formatDateObj = {
                        date: dayjs(date).date(),
                        week: formatWeek(dayjs(date).day()),
                        month: formatMonth(dayjs(date).month()),
                    }
                    item.dateObj = formatDateObj;
                    item.images.iphoneX = item.images['iphone-x']
                    item.geo.reverse = item.geo.reverse.replace(/,/g, "，")
                    item.text.short = item.text.short.replace(/,/g, "，")
                    return item
                })
                this.setData({
                    calendarData: formatResultData,
                    from: dayjs().subtract(10, 'day'),
                    to: dayjs(),
                    current: formatResultData.length - 1,
                    shareImg: formatResultData[formatResultData.length - 1].images
                });
            }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    bindchange: function (event) {
        if (event.detail.current === 0) {
            wx.showLoading({
                title: '加载中',
                mask: true
            })
            API.getData({
                from: this.data.from.subtract(10, 'day').format('YYYYMMDD'),
                to: this.data.to.subtract(10, 'day').format('YYYYMMDD')
            }).then(resData => {
                const result = resData.data;
                console.log('result', result)
                if (result.status === "OK") {
                    wx.hideLoading()
                    let { hasMore, ...resultData } = result.result
                    const formatResultData = Object.values(resultData).map((item) => {
                        const date = formatDate(item.dateKey)
                        const formatDateObj = {
                            date: dayjs(date).date(),
                            week: formatWeek(dayjs(date).day()),
                            month: formatMonth(dayjs(date).month()),
                        }
                        item.dateObj = formatDateObj;
                        item.images.iphoneX = item.images['iphone-x']
                        item.geo.reverse = item.geo.reverse.replace(/,/g, "，")
                        item.text.short = item.text.short.replace(/,/g, "，")
                        return item
                    })
                    // console.log('formatResultData', formatResultData)
                    this.setData({
                        calendarData: formatResultData,
                        from: this.data.from.subtract(10, 'day'),
                        to: this.data.to.subtract(10, 'day'),
                        shareImg: formatResultData[formatResultData.length - 1].images
                        // current: event.detail.current
                    });
                }
            })
        } else {
            this.setData({
                current: event.detail.current,
                shareImg: this.data.calendarData[event.detail.current].images
            });
        }
    },

    touchOther: function (event) {
        // console.log('冒泡')
        this.setData({
            isShowOther: false
        })
    },

    touchStart: function (e) {
        // console.log('整屏触碰')
        touchDot = e.touches[0].pageY; // 获取触摸时的原点  
    },
    // 触摸移动事件  
    touchMove: function (e) {
        let touchMove = e.touches[0].pageY;
        // console.log('e.touches[0]', e.touches[0])
        if (touchDot - touchMove >= 20) {
            this.setData({
                isShowOther: true
            })
        } else {
            this.setData({
                isShowOther: false
            })
        }
    },

    touchEnd: function (e) {
        // console.log('触摸结束')
        // this.setData({
        //     isShowOther: false
        // })
    },

    catchTouchStart: function (e) {
        // return;
    },

    catchTouchMove: function (e) {
        // return;
    },

    bindsetup() {
        // console.log('设置')
        this.setData({
            showDrawer: true
        })
    },

    toggleDrawer() {
        this.setData({
          showDrawer: !this.data.showDrawer
        });
    },

    handleCustomer() {
        // console.log('客服')
    },

    handleAbout() {
        // console.log('跳转页面')
        wx.navigateTo({
            url: '../about/about',
            success: function(res) {
              // 通过eventChannel向被打开页面传送数据
              res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
            }
        })

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        console.log('分享')
        let that = this;
        return {
            title: '寻找每一天',
            path: '/pages/index/index',
            imageUrl: that.data.shareImg.small
        }
    },
    onShareTimeline: function () {
        let that = this;
        return {
            path: '/pages/index/index',
            // query: 'name=123',
            imageUrl: that.data.shareImg.small
        };
    }
})