//当前选中id
let thisDatePickerId = '';
Page({
    data: {
        dateStr1: '',
        date1: '',
        hour1: '',
        dateStr2: '',
        date2: '',
        dateStr3: '',
        date3: '',
        hour3: ''
    },
    onLoad() {
	},
    // 带时辰
    showDatepicker1(event) {
        thisDatePickerId = 1;
        let date = this.data['date'+thisDatePickerId];
        let hour = this.data['hour'+thisDatePickerId];
        // 获取日期组件对象实例，并初始化配置
    	this.selectComponent("#ruiDatepicker").init({
            date: date,
            hour: hour,
            lunar: false
        });
	},
    // 不带时辰
    showDatepicker2(event) {
        thisDatePickerId = 2;
        let date = this.data['date'+thisDatePickerId];
        // 获取日期组件对象实例，并初始化配置
        this.selectComponent("#ruiDatepicker").init({
            date: date,
            showHour: false
        });
    },
    // 带时辰（不需要确认）
    showDatepicker3(event) {
        thisDatePickerId = 3;
        let date = this.data['date'+thisDatePickerId];
        let hour = this.data['hour'+thisDatePickerId];
        // 获取日期组件对象实例，并初始化配置
        this.selectComponent("#ruiDatepicker").init({
            date: date,
            hour: hour,
            confirm: false
        });
    },
	dateConfirm(event) {
        let json = {};
        json['date'+thisDatePickerId] = event.detail.year+'-'+event.detail.month+'-'+event.detail.day;
        json['hour'+thisDatePickerId] = event.detail.hour;
        json['dateStr'+thisDatePickerId] = event.detail.thisStr;
        // 更新数据
		this.setData(json);
    console.log(event);
	}
})