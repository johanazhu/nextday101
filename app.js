//app.js
App({
    onLaunch: function () {
        const that = this;

        const systemInfo = wx.getSystemInfoSync();
        // console.log('systemInfo', systemInfo)
        if (systemInfo.safeArea.top > 20) {
            // 刘海屏
            that.globalData.isIphoneX = true
        } else if (systemInfo.safeArea.width <= 320) {
            // 小屏手机
            that.globalData.isSmallPhone = true
        }
    },
    globalData: {
        isIphoneX: false,
        isSmallPhone: false
    }
})