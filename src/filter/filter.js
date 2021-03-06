
const vfilter = {
    formatDates: function (dataStr) {
        let date = new Date(dataStr)
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        return Y + M + D
    },
    isEmptyStr: function (str) {
        if (str === ''){
            str = '无'
        }
        return str
    }
}

export default vfilter;
