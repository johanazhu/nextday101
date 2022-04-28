
// const md5 = require('./md5.js')
// const { partnerName, PartnerKey, hostUrl } = require('../config/index.js');
import { hostUrl } from '../config/index.js';

const http = (options) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${hostUrl}${options.url}`,
            method: options.method || 'get',
            data: options.data || {},
            header: options.header,
            success: resolve,
            fail: reject
        })
    })
}

export default http;