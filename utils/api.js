import md5 from './md5.js';
import { partnerName, PartnerKey, hostUrl } from '../config/index.js';
import http from 'http.js'

const getData = ({ from, to }) => {
    const calendarUrl = '/api/calendar';
    const params = `from=${from}&to=${to}`
    const partnerUrl = `${calendarUrl}?${params}`
    const date = new Date()
    const formatDate = date.toString().replace(/中国标准时间/g, 'CTS')
    const mdHash = md5.hexMD5(`${partnerUrl}&${partnerName}&${formatDate}&${PartnerKey}`)
    const authorization = `${partnerName}:${mdHash}`;
    return http({
        url: partnerUrl,
        header: {
            // 'X-ND-Date': formatDate,
            'Date': formatDate,
            'authorization': authorization,
        }
    })
}


export default {
    getData,
}