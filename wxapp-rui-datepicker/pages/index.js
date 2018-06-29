//index.js
let _this;
Page({
    data: {
    	isRuiDatepickerShow: false
    },
    onLoad() {

	},
    showDatepicker() {	
    	// 显示组件
	    this.setData({
	      	isRuiDatepickerShow: true
	    })
	},
	dateConfirm(event) {
		console.log(event);
	}
})