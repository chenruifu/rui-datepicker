Component({
    // 组件对外属性列表
    properties: {
        //是否显示
        show: {
            type: Boolean,
            value: false
        },
        //日期
    	date: {
    		type: String,
    		value: '2016-12-12',
    		observer: function(newVal, oldVal, changedPath) {

    		}
    	},
        //时辰
    	hour: {
    		type: String,
    		value: '0',
    		observer: function(newVal, oldVal, changedPath) {

    		}
    	}
    },
    // 组件的初始数据
    data: {
        // 选择块数据
        yearArr: [1991,1992,1993,1994,1995,1996],
        monthArr: [1,2,3,4,5,6,7,8,9,10,11,12],
        dayArr: [1,2,3,4,5,6,7],
        // 确认块隐藏
    	hiddenConfirm: true,
    },
    //组件的方法列表
    methods: {
    	// 取消
    	cancel() {
            // 判断是否在确认步骤[返回修改&取消]
            if(this.data.hiddenConfirm === false){
                this.setData({
                    hiddenConfirm: true
                })
            }else{
                this.setData({
                    show: false
                });
            }
    	},
		// 确认
    	confirm() {
            // 判断是否在确认步骤[完成&确认]
            if(this.data.hiddenConfirm === false){
                this.setData({
                    show: false
                });
            }else{
                this.setData({
                    hiddenConfirm: false
                });
            }
            this.triggerEvent('confirm', { date: '123'});
    	},
        // 选择切换
        bindChange() {
            console.log(111);
        }
    }
})