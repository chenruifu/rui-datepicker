//index.js
Page({
    data: {
    	show: true,
    	isRuiDatepickerShow: false
    },
    onLoad() {
	},
    showDatepicker(event) {	
    	console.log('1122');
    	this.selectComponent("#ruiDatepicker").bindChange();
    	return;
    	this.dialog = this.selectComponent("#ruiDatepicker");
    	// 显示组件
	    this.setData({
	      	isRuiDatepickerShow: true
	    })
	},
	dateConfirm(event) {
		console.log('1122');
		this.selectComponent("#ruiDatepicker").bindChange();
		// console.log(event);
	}
})