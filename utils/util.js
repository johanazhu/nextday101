const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}


export const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatDay = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return [year, month, day].map(formatNumber).join('')
}

/**
 *
 * @param dateKey  20220416
 * @returns {string}  2022-04-16
 */
export function formatDate(dateKey) {
    const reg = /^(\d{4})(\d{2})(\d{2})$/;
    const result = dateKey.replace(reg, "$1-$2-$3");
    return result;
}

/**
 * 日期周几换算成英文
 * @param number  0-6 星期日到星期六
 * @returns {string}  英文缩写
 */
export function formatWeek(number) {
    switch (number) {
        case 0:
            return 'SUNDAY';
        case 1:
            return 'MONDAY';
        case 2:
            return 'THESDAY';
        case 3:
            return 'WEDNESDAY';
        case 4:
            return 'THURSDAY';
        case 5:
            return 'FRIDAY';
        case 6:
            return 'SATURDAY';
        default:
            return '';
    }
}

/**
 * 日期月份换算成英文缩写
 * @param number  0-11 即 1 月是 0。
 * @returns {string}  英文缩写
 */
export function formatMonth(number) {
    switch (number) {
        case 0:
            return 'JAN';
        case 1:
            return 'FEB';
        case 2:
            return 'MAR';
        case 3:
            return 'APR';
        case 4:
            return 'MAY';
        case 5:
            return 'JUN';
        case 6:
            return 'JUL';
        case 7:
            return 'AUG';
        case 8:
            return 'SEP';
        case 9:
            return 'OCT';
        case 10:
            return 'NOV';
        case 11:
            return 'DEC';
        default:
            return '';
    }
}

