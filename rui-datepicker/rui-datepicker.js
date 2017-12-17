/*
 * ruiDatePicker 农历公历-日历控件
 * 版本：1.0
 * 作者：羯瑞
 * 邮箱：410232098@qq.com
 * 创建于：2016-12-31
 */
window.ruiDatepicker = (function() {
	// 兼容IE-classList处理
	if (!("classList" in document.documentElement)) {
        Object.defineProperty(HTMLElement.prototype, 'classList', {
            get: function() {
                var self = this;
                function update(fn) {
                    return function(value) {
                        var classes = self.className.split(/\s+/g),
                            index = classes.indexOf(value);
                        
                        fn(classes, index, value);
                        self.className = classes.join(" ");
                    }
                }
                
                return {                    
                    add: update(function(classes, index, value) {
                        if (!~index) classes.push(value);
                    }),
                    
                    remove: update(function(classes, index) {
                        if (~index) classes.splice(index, 1);
                    }),
                    
                    toggle: update(function(classes, index, value) {
                        if (~index)
                            classes.splice(index, 1);
                        else
                            classes.push(value);
                    }),
                    
                    contains: function(value) {
                        return !!~self.className.split(/\s+/g).indexOf(value);
                    },
                    
                    item: function(i) {
                        return self.className.split(/\s+/g)[i] || null;
                    }
                };
            }
        });
    }
	var datePicker = function() {
		this.gearDate;
		this.minY = 1940;
		this.minM = 1,
		this.minD = 1,
		this.maxY = 2019,
		this.maxM = 12,
		this.maxD = 31,
		this.type = 1 //0公历，1农历
	}
	datePicker.prototype = {
		init: function(id) {
			this.trigger = document.querySelector(id);
			this.bindEvent('date');
		},
		bindEvent: function(type) {
			var _self = this;
			// 农历数据
		    var LunarCal = [
		     	new tagLunarCal(38, 0, 0, 38, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1), /* 1940 */
		     	new tagLunarCal(26, 6, 2, 44, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0),
		     	new tagLunarCal(45, 0, 3, 49, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0),
		     	new tagLunarCal(35, 0, 4, 54, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1),
		     	new tagLunarCal(24, 4, 5, 59, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1), /* 1944 */
		     	new tagLunarCal(43, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1),
		     	new tagLunarCal(32, 0, 1, 10, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1),
		     	new tagLunarCal(21, 2, 2, 15, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1),
		     	new tagLunarCal(40, 0, 3, 20, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1), /* 1948 */
		     	new tagLunarCal(28, 7, 5, 26, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1),
		     	new tagLunarCal(47, 0, 6, 31, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1),
		     	new tagLunarCal(36, 0, 0, 36, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0),
		     	new tagLunarCal(26, 5, 1, 41, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1), /* 1952 */
		     	new tagLunarCal(44, 0, 3, 47, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1),
		     	new tagLunarCal(33, 0, 4, 52, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0),
		     	new tagLunarCal(23, 3, 5, 57, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1),
		     	new tagLunarCal(42, 0, 6, 2, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1), /* 1956 */
		     	new tagLunarCal(30, 8, 1, 8, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0),
		     	new tagLunarCal(48, 0, 2, 13, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0),
		     	new tagLunarCal(38, 0, 3, 18, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1),
		     	new tagLunarCal(27, 6, 4, 23, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0), /* 1960 */
		     	new tagLunarCal(45, 0, 6, 29, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0),
		     	new tagLunarCal(35, 0, 0, 34, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1),
		     	new tagLunarCal(24, 4, 1, 39, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0),
		     	new tagLunarCal(43, 0, 2, 44, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0), /* 1964 */
		     	new tagLunarCal(32, 0, 4, 50, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1),
		     	new tagLunarCal(20, 3, 5, 55, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0),
		     	new tagLunarCal(39, 0, 6, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0),
		     	new tagLunarCal(29, 7, 0, 5, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1), /* 1968 */
		     	new tagLunarCal(47, 0, 2, 11, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1),
		     	new tagLunarCal(36, 0, 3, 16, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0),
		     	new tagLunarCal(26, 5, 4, 21, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1),
		     	new tagLunarCal(45, 0, 5, 26, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1), /* 1972 */
		     	new tagLunarCal(33, 0, 0, 32, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1),
		     	new tagLunarCal(22, 4, 1, 37, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1),
		     	new tagLunarCal(41, 0, 2, 42, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1),
		     	new tagLunarCal(30, 8, 3, 47, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1), /* 1976 */
		     	new tagLunarCal(48, 0, 5, 53, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1),
		     	new tagLunarCal(37, 0, 6, 58, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1),
		     	new tagLunarCal(27, 6, 0, 3, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0),
		     	new tagLunarCal(46, 0, 1, 8, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0), /* 1980 */
		     	new tagLunarCal(35, 0, 3, 14, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1),
		     	new tagLunarCal(24, 4, 4, 19, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1),
		     	new tagLunarCal(43, 0, 5, 24, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1),
		     	new tagLunarCal(32, 10, 6, 29, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1), /* 1984 */
		     	new tagLunarCal(50, 0, 1, 35, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0),
		     	new tagLunarCal(39, 0, 2, 40, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1),
		     	new tagLunarCal(28, 6, 3, 45, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0),
		     	new tagLunarCal(47, 0, 4, 50, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1), /* 1988 */
		     	new tagLunarCal(36, 0, 6, 56, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0),
		     	new tagLunarCal(26, 5, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1),
		     	new tagLunarCal(45, 0, 1, 6, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0),
		     	new tagLunarCal(34, 0, 2, 11, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0), /* 1992 */
		     	new tagLunarCal(22, 3, 4, 17, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0),
		     	new tagLunarCal(40, 0, 5, 22, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0),
		     	new tagLunarCal(30, 8, 6, 27, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1),
		     	new tagLunarCal(49, 0, 0, 32, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1), /* 1996 */
		     	new tagLunarCal(37, 0, 2, 38, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1),
		     	new tagLunarCal(27, 5, 3, 43, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1),
		     	new tagLunarCal(46, 0, 4, 48, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1), /* 1999 */
		     	new tagLunarCal(35, 0, 5, 53, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1), /* 2000 */
		     	new tagLunarCal(23, 4, 0, 59, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1),
		     	new tagLunarCal(42, 0, 1, 4, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1),
		     	new tagLunarCal(31, 0, 2, 9, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0),
		     	new tagLunarCal(21, 2, 3, 14, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1), /* 2004 */
		     	new tagLunarCal(39, 0, 5, 20, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1),
		     	new tagLunarCal(28, 7, 6, 25, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1),
		     	new tagLunarCal(48, 0, 0, 30, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1),
		     	new tagLunarCal(37, 0, 1, 35, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1), /* 2008 */
		     	new tagLunarCal(25, 5, 3, 41, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1),
		     	new tagLunarCal(44, 0, 4, 46, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1),
		     	new tagLunarCal(33, 0, 5, 51, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1),
		     	new tagLunarCal(22, 4, 6, 56, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0), /* 2012 */
		     	new tagLunarCal(40, 0, 1, 2, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0),
		     	new tagLunarCal(30, 9, 2, 7, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1),
		     	new tagLunarCal(49, 0, 3, 12, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1),
		     	new tagLunarCal(38, 0, 4, 17, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0), /* 2016 */
		     	new tagLunarCal(27, 6, 6, 23, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1),
		     	new tagLunarCal(46, 0, 0, 28, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0),
		     	new tagLunarCal(35, 0, 1, 33, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0),
		     	new tagLunarCal(24, 4, 2, 38, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1), /* 2020 */
		     	new tagLunarCal(42, 0, 4, 44, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1),
		     	new tagLunarCal(31, 0, 5, 49, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0),
		     	new tagLunarCal(21, 2, 6, 54, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1),
		     	new tagLunarCal(40, 0, 0, 59, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1), /* 2024 */
		     	new tagLunarCal(28, 6, 2, 5, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0),
		     	new tagLunarCal(47, 0, 3, 10, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1),
		     	new tagLunarCal(36, 0, 4, 15, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1),
		     	new tagLunarCal(25, 5, 5, 20, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0), /* 2028 */
		     	new tagLunarCal(43, 0, 0, 26, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1),
		     	new tagLunarCal(32, 0, 1, 31, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0)
		    ];
			//呼出日期插件
			function popupDate(e) {
				//阻止获得焦点
				document.activeElement.blur();
				_self.gearDate = document.createElement("div");
				_self.gearDate.className = "gearDate";
				// 判断是否启用时辰
				if(_self.trigger.getAttribute('data-toid-hour')){
					_self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
						'<div class="date_info_box lcalendar_info">' +
						'</div>' +
						'<div class="date_class_box">' +
						'<div class="date_class lcalendar_gongli">公历</div>' +
						'<div class="date_class lcalendar_nongli">农历</div>' +
						'</div>' +
						'<div class="date_roll_mask">' +
						'<div class="date_roll date_roll_more">' +
						'<div>' +
						'<div class="gear date_yy" data-datetype="date_yy"></div>' +
						'<div class="date_grid">' +
						'</div>' +
						'</div>' +
						'<div>' +
						'<div class="gear date_mm" data-datetype="date_mm"></div>' +
						'<div class="date_grid">' +
						'</div>' +
						'</div>' +
						'<div>' +
						'<div class="gear date_dd" data-datetype="date_dd"></div>' +
						'<div class="date_grid">' +
						'</div>' +
						'</div>' +
						'<div>' +
						'<div class="gear date_hh" data-datetype="date_hh"></div>' +
						'<div class="date_grid">' +
						'</div>' +
						'</div>' +
						'</div>' +
						'<div class="date_btn_box">' +
						'<div class="date_btn lcalendar_finish">确定</div>' +
						'<div class="date_btn lcalendar_cancel">取消</div>' +
						'</div>' +
						'</div>';
				}else{
					_self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
						'<div class="date_info_box lcalendar_info">' +
						'</div>' +
						'<div class="date_class_box">' +
						'<div class="date_class lcalendar_gongli">公历</div>' +
						'<div class="date_class lcalendar_nongli">农历</div>' +
						'</div>' +
						'<div class="date_roll_mask">' +
						'<div class="date_roll">' +
						'<div>' +
						'<div class="gear date_yy" data-datetype="date_yy"></div>' +
						'<div class="date_grid">' +
						'</div>' +
						'</div>' +
						'<div>' +
						'<div class="gear date_mm" data-datetype="date_mm"></div>' +
						'<div class="date_grid">' +
						'</div>' +
						'</div>' +
						'<div>' +
						'<div class="gear date_dd" data-datetype="date_dd"></div>' +
						'<div class="date_grid">' +
						'</div>' +
						'</div>' +
						'</div>' +
						'</div>' +
						'<div class="date_btn_box">' +
						'<div class="date_btn lcalendar_finish">确定</div>' +
						'<div class="date_btn lcalendar_cancel">取消</div>' +
						'</div>' +
						'</div>';
				}
				document.body.appendChild(_self.gearDate);
				dateCtrlInit();
				var hasTouch='ontouchstart' in window;
				var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
				lcalendar_cancel.addEventListener(hasTouch?'touchstart':'click', closeMobileCalendar);
				var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
				lcalendar_finish.addEventListener(hasTouch?'touchstart':'click', finishMobileDate);
				var lcalendar_gongli = _self.gearDate.querySelector(".lcalendar_gongli");
				var lcalendar_nongli = _self.gearDate.querySelector(".lcalendar_nongli");
				lcalendar_gongli.addEventListener(hasTouch?'touchstart':'click', function(){convertTap('gongli')},false);
				lcalendar_nongli.addEventListener(hasTouch?'touchstart':'click', function(){convertTap('nongli')},false);
				var date_yy = _self.gearDate.querySelector(".date_yy");
				var date_mm = _self.gearDate.querySelector(".date_mm");
				var date_dd = _self.gearDate.querySelector(".date_dd");
				var date_hh = _self.gearDate.querySelector(".date_hh");
				date_yy.addEventListener('touchstart', gearTouchStart);
				date_mm.addEventListener('touchstart', gearTouchStart);
				date_dd.addEventListener('touchstart', gearTouchStart);
				date_hh?date_hh.addEventListener('touchstart', gearTouchStart):'';
				date_yy.addEventListener('mousedown', gearMouseSlide);
				date_mm.addEventListener('mousedown', gearMouseSlide);
				date_dd.addEventListener('mousedown', gearMouseSlide);
				date_hh?date_hh.addEventListener('mousedown', gearMouseSlide):'';
				date_yy.addEventListener('touchmove', gearTouchMove);
				date_mm.addEventListener('touchmove', gearTouchMove);
				date_dd.addEventListener('touchmove', gearTouchMove);
				date_hh?date_hh.addEventListener('touchmove', gearTouchMove):'';
				date_yy.addEventListener('touchend', gearTouchEnd);
				date_mm.addEventListener('touchend', gearTouchEnd);
				date_dd.addEventListener('touchend', gearTouchEnd);
				date_hh?date_hh.addEventListener('touchend', gearTouchEnd):'';
				// 阻止透视滑动
				_self.gearDate.addEventListener("touchmove",function(e){ e.preventDefault(); });
				// 阻止鼠标滚轮事件
				if(navigator.userAgent.indexOf("Firefox")>0){ 
			        _self.gearDate.addEventListener('DOMMouseScroll',function(e){e.preventDefault();},false); 
			        date_yy.addEventListener('DOMMouseScroll', gearMouseRolling , false);
					date_mm.addEventListener('DOMMouseScroll', gearMouseRolling , false);
					date_dd.addEventListener('DOMMouseScroll', gearMouseRolling , false); 
					date_hh?date_hh.addEventListener('DOMMouseScroll', gearMouseRolling , false):''; 
			    }else{ 
			        _self.gearDate.onmousewheel = function(e){ return false};
			        date_yy.onmousewheel=gearMouseRolling;
					date_mm.onmousewheel=gearMouseRolling;
					date_dd.onmousewheel=gearMouseRolling;
					date_hh?date_hh.onmousewheel=gearMouseRolling:'';
			    }
			}
			// 公历农历选择
			function convertTap(type){
				var nongli=_self.gearDate.querySelector(".lcalendar_nongli");
				var gongli=_self.gearDate.querySelector(".lcalendar_gongli");
				var changeOn=0;
				if(type=='nongli' && _self.type !=1){
					nongli.className=nongli.className.replace(/active/, "").replace(/(^\s*)|(\s*$)/g, "")+' active';
					gongli.className=gongli.className.replace(/active/, "");
					_self.type=1;
					changeOn=1;
				}else if(type=='gongli' && _self.type !=0){
					nongli.className=nongli.className.replace(/active/, "");
					gongli.className=gongli.className.replace(/active/, "").replace(/(^\s*)|(\s*$)/g, "")+' active';
					_self.type=0;
					changeOn=1;
				}
				//判断是否切换
				if(changeOn){
					var passY = _self.maxY - _self.minY + 1;
					var val_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
					var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
					var date_dd = parseInt(Math.round(_self.gearDate.querySelector(".date_dd").getAttribute("val"))) + 1;
					var date_yy=val_yy % passY + _self.minY;
					var type=_self.type?0:1;
					// 农历转公历前判断是否有闰月
					var rmNum=LunarCal[val_yy].Intercalation?LunarCal[val_yy].Intercalation:0;
					if(!_self.type && rmNum){
						if(rmNum==(date_mm-1)){
							date_mm=-(date_mm-1);
						}else if(rmNum<(date_mm-1)){
							date_mm=date_mm-1;
						}else{
							date_mm=date_mm;
						}
					}
					var objDate=calendarConvert(type,date_yy,date_mm,date_dd);//返回转换对象
					// 公历转农历后判断是否有闰月
					var rmTip=LunarCal[objDate.yy - _self.minY].Intercalation?LunarCal[objDate.yy - _self.minY].Intercalation:0;
					if(rmTip && _self.type){
						if(objDate.mm<0){
							objDate.mm=-objDate.mm+1
						}else if(objDate.mm>rmTip){
							objDate.mm=objDate.mm+1;
						}
					}
					_self.gearDate.querySelector(".date_yy").setAttribute("val", objDate.yy - _self.minY);
					_self.gearDate.querySelector(".date_mm").setAttribute("val", objDate.mm-1);
					_self.gearDate.querySelector(".date_dd").setAttribute("val", objDate.dd-1);
					_self.gearDate.querySelector(".date_yy").setAttribute("top", '');
					setDateGearTooth();
				}
			}
			//初始化年月日插件默认值
			function dateCtrlInit() {
				var date = new Date();
				var dateArr = {
					yy: date.getYear(),
					mm: date.getMonth(),
					dd: date.getDate() - 1
				};
				if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(_self.trigger.getAttribute('data-date'))) {
					rs = _self.trigger.getAttribute('data-date').match(/(^|-)\d{1,4}/g);
					dateArr.yy = rs[0] - _self.minY;
					dateArr.mm = rs[1].replace(/-/g, "") - 1;
					dateArr.dd = rs[2].replace(/-/g, "") - 1;
				} else {
					dateArr.yy = dateArr.yy + 1900 - _self.minY;
				};
				_self.gearDate.querySelector(".date_yy").setAttribute("val", dateArr.yy);
				_self.gearDate.querySelector(".date_mm").setAttribute("val", dateArr.mm);
				_self.gearDate.querySelector(".date_dd").setAttribute("val", dateArr.dd);
				// 判断有时辰
				if(_self.gearDate.querySelector(".date_hh")){
					var hour_val=0;
					if(_self.trigger.getAttribute('data-hour') && _self.trigger.getAttribute('data-hour')>=0){
						hour_val=parseInt(Math.round(_self.trigger.getAttribute('data-hour'))+1);
					}
					_self.gearDate.querySelector(".date_hh").setAttribute("val", hour_val);
				}
				// 默认农历或公历
				if(parseInt(_self.trigger.getAttribute('data-type'))){
					_self.type=1;
					var nongli=_self.gearDate.querySelector(".lcalendar_nongli");
					nongli.className=nongli.className.replace(/active/, "").replace(/(^\s*)|(\s*$)/g, "")+' active';
					var passY = _self.maxY - _self.minY + 1;
					var date_yy=dateArr.yy % passY + _self.minY;
					var date_mm=dateArr.mm+1;
					var date_dd=dateArr.dd+1;
					var objDate=calendarConvert(0,date_yy,date_mm,date_dd);//返回转换对象
					var isRm=LunarCal[objDate.yy - _self.minY].Intercalation?LunarCal[objDate.yy - _self.minY].Intercalation:0;//判断是不是闰年
					if(objDate.mm<0) {
						objDate.mm=-objDate.mm+1;//返回的负数为 闰年
					}else{
						//闰年月份+1重复选择，位置才正确
						if(isRm && (objDate.mm-1)>=isRm) objDate.mm=objDate.mm+1;
					}
					//console.log(objDate.yy - _self.minY+'_'+isRm+'_'+objDate.mm);
					_self.gearDate.querySelector(".date_yy").setAttribute("val", objDate.yy - _self.minY);
					_self.gearDate.querySelector(".date_mm").setAttribute("val", objDate.mm-1);
					_self.gearDate.querySelector(".date_dd").setAttribute("val", objDate.dd-1);
				}else{
					_self.type=0;
					var gongli=_self.gearDate.querySelector(".lcalendar_gongli");
					gongli.className=gongli.className.replace(/active/, "").replace(/(^\s*)|(\s*$)/g, "")+' active';
				}
				setDateGearTooth();
			}
			//重置日期节点个数+设置日期
			function setDateGearTooth() {
				var passY = _self.maxY - _self.minY + 1;
				var date_yy = _self.gearDate.querySelector(".date_yy");
				var itemStr = "";
				if (date_yy && date_yy.getAttribute("val")) {
					//得到年份的值
					var yyVal = parseInt(date_yy.getAttribute("val"));
					//p 当前节点前后需要展示的节点个数
					for (var p = 0; p <= passY - 1; p++) {
						itemStr += "<div class='tooth'>" + (_self.minY + p) + "</div>";
					}
					date_yy.innerHTML = itemStr;
					var top = Math.floor(parseFloat(date_yy.getAttribute('top')));
					if (!isNaN(top)) {
						top % 2 == 0 ? (top = top) : (top = top + 1);
						top > 8 && (top = 8);
						var minTop = 8 - (passY - 1) * 2;
						top < minTop && (top = minTop);
						date_yy.style["transform"] = 'translate(0,' + top + 'em)';
						date_yy.style["-webkit-transform"] = 'translate(0,' + top + 'em)';
						date_yy.style["-moz-transform"] = 'translate(0,' + top + 'em)';
						date_yy.style["-ms-transform"] = 'translate(0,' + top + 'em)';
						date_yy.style["-o-transform"] = 'translate(0,' + top + 'em)';
						date_yy.setAttribute('top', top + 'em');
						yyVal = Math.abs(top - 8) / 2;
						date_yy.setAttribute("val", yyVal);
					} else {
						date_yy.style["transform"] = 'translate(0,' + (8 - yyVal * 2) + 'em)';
						date_yy.style["-webkit-transform"] = 'translate(0,' + (8 - yyVal * 2) + 'em)';
						date_yy.style["-moz-transform"] = 'translate(0,' + (8 - yyVal * 2) + 'em)';
						date_yy.style["-ms-transform"] = 'translate(0,' + (8 - yyVal * 2) + 'em)';
						date_yy.style["-o-transform"] = 'translate(0,' + (8 - yyVal * 2) + 'em)';
						date_yy.setAttribute('top', (8 - yyVal * 2) + 'em');
					}
				} else {
					return;
				}
				var date_mm = _self.gearDate.querySelector(".date_mm");
				if (date_mm && date_mm.getAttribute("val")) {
					itemStr = "";
					//得到月份的值
					var mmVal = parseInt(date_mm.getAttribute("val"));
					// 判断否有闰月
					var rmNum=LunarCal[yyVal].Intercalation?LunarCal[yyVal].Intercalation:0;
					if(rmNum && _self.type){
						var maxM = 12;
					}else{
						var maxM = 11;
					}
					var minM = 0;
					//当年份到达最大值
					if (yyVal == passY - 1) {
						if(_self.type){
							maxM = _self.maxM - 2;
						}else{
							maxM = _self.maxM - 1;
						}
						// maxM = _self.maxM - 1;
					}
					//当年份到达最小值
					if (yyVal == 0) {
						if(_self.type){
							minM = _self.minM - 1;
						}else{
							minM = _self.minM;
						}
						// minM = _self.minM - 1;
					}
					//p 当前节点前后需要展示的节点个数
					for (var p = 0; p < maxM - minM + 1; p++) {
						var strVal=minM + p + 1;
						// 农历
						if(_self.type){
							// 闰月
							if(rmNum && rmNum==p){
								strVal=getChinese('rm',strVal-1);
							}else if(rmNum && rmNum<p){
								strVal=getChinese('mm',strVal-1);
							}else{
								strVal=getChinese('mm',strVal);
							}
						}
						itemStr += "<div class='tooth'>" + strVal + "</div>";
					}
					date_mm.innerHTML = itemStr;
					if (mmVal > maxM) {
						mmVal = maxM;
						date_mm.setAttribute("val", mmVal);
					} else if (mmVal < minM) {
						mmVal = maxM;
						date_mm.setAttribute("val", mmVal);
					}
					date_mm.style["transform"] = 'translate(0,' + (8 - (mmVal - minM) * 2) + 'em)';
					date_mm.style["-webkit-transform"] = 'translate(0,' + (8 - (mmVal - minM) * 2) + 'em)';
					date_mm.style["-moz-transform"] = 'translate(0,' + (8 - (mmVal - minM) * 2) + 'em)';
					date_mm.style["-ms-transform"] = 'translate(0,' + (8 - (mmVal - minM) * 2) + 'em)';
					date_mm.style["-o-transform"] = 'translate(0,' + (8 - (mmVal - minM) * 2) + 'em)';
					date_mm.setAttribute('top', 8 - (mmVal - minM) * 2 + 'em');
				} else {
					return;
				}
				var date_dd = _self.gearDate.querySelector(".date_dd");
				if (date_dd && date_dd.getAttribute("val")) {
					itemStr = "";
					//得到日期的值
					var ddVal = parseInt(date_dd.getAttribute("val"));
					//返回月份的天数
					var maxMonthDays = calcDays(yyVal, mmVal);
					// console.log(yyVal+','+mmVal+','+maxMonthDays);
					//p 当前节点前后需要展示的节点个数
					var maxD = maxMonthDays - 1;
					var minD = 0;
					//当年份月份到达最大值
					if (yyVal == passY - 1 && 11 == mmVal + 1) {
						if(_self.type){
							maxD = _self.maxD - 7;
						}else{
							maxD = _self.maxD - 2;
						}
						// maxD = _self.maxD - 1;
					}
					//当年、月到达最小值
					if (yyVal == 0 && 2 == mmVal + 1) {
						if(_self.type){
							minD = _self.minD -1;
						}else{
							minD = _self.minD + 6;
						}
					}
					for (var p = 0; p < maxD - minD + 1; p++) {
						var strVal=_self.type?getChinese('dd',minD + p + 1):(minD + p + 1);
						itemStr += "<div class='tooth'>" + strVal + "</div>";
					}
					date_dd.innerHTML = itemStr;
					if (ddVal > maxD) {
						ddVal = maxD;
						date_dd.setAttribute("val", ddVal);
					} else if (ddVal < minD) {
						ddVal = minD;
						date_dd.setAttribute("val", ddVal);
					}
					date_dd.style["transform"] = 'translate(0,' + (8 - (ddVal - minD) * 2) + 'em)';
					date_dd.style["-webkit-transform"] = 'translate(0,' + (8 - (ddVal - minD) * 2) + 'em)';
					date_dd.style["-moz-transform"] = 'translate(0,' + (8 - (ddVal - minD) * 2) + 'em)';
					date_dd.style["-ms-transform"] = 'translate(0,' + (8 - (ddVal - minD) * 2) + 'em)';
					date_dd.style["-o-transform"] = 'translate(0,' + (8 - (ddVal - minD) * 2) + 'em)';
					date_dd.setAttribute('top', 8 - (ddVal - minD) * 2 + 'em');
				} else {
					return;
				}
				var date_hh = _self.gearDate.querySelector(".date_hh");
				if (date_hh && date_hh.getAttribute("val")) {
					var hhVal = parseInt(date_hh.getAttribute("val"));
					itemStr = "<div class='tooth'>未知</div>";
					for (var p = 0; p < 24; p++) {
						var strVal=_self.type?getChinese('hh',p):p;
						itemStr += "<div class='tooth'>" + strVal + "时</div>";
					}
					date_hh.innerHTML = itemStr;
					date_hh.style["transform"] = 'translate(0,' + (8 - hhVal * 2) + 'em)';
					date_hh.style["-webkit-transform"] = 'translate(0,' + (8 - hhVal * 2) + 'em)';
					date_hh.style["-moz-transform"] = 'translate(0,' + (8 - hhVal * 2) + 'em)';
					date_hh.style["-ms-transform"] = 'translate(0,' + (8 - hhVal * 2) + 'em)';
					date_hh.style["-o-transform"] = 'translate(0,' + (8 - hhVal * 2) + 'em)';
					date_hh.setAttribute('top', (8 - hhVal * 2) + 'em');
				}
				getCalendarDate();//设置日期
			}
			//求月份最大天数
			function calcDays(year, month) {
				// 农历查询数据
				if(_self.type==1){
					if(LunarCal[year].MonthDays[month]){
						return 30;
					}else{
						return 29;
					}
				}else{
					if (month == 1) {
						year += _self.minY;
						if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0 && year % 4000 != 0)) {
							return 29;
						} else {
							return 28;
						}
					} else {
						if (month == 3 || month == 5 || month == 8 || month == 10) {
							return 30;
						} else {
							return 31;
						}
					}
				}
			}
			// 中文转换,type:rm闰月，mm月份，dd日期，num值
			function getChinese(type,num){
				var rmArr=['闰正月','闰二月','闰三月','闰四月','闰五月','闰六月','闰七月','闰八月','闰九月','闰十月','闰冬月','闰腊月'];
				var mmArr=['正月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
				var ddArr=['初一','初二','初三','初四','初五','初六','初七','初八','初九','初十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十','三十一'];
				var hhArr=['0子','1丑','2丑','3寅','4寅','5卯','6卯','7辰','8辰','9巳','10巳','11午','12午','13未','14未','15申','16申','17酉','18酉','19戌','20戌','21亥','22亥','23子'];
				if(type=='rm') return rmArr[num-1];
				if(type=='mm') return mmArr[num-1];
				if(type=='dd') return ddArr[num-1];
				if(type=='hh') return hhArr[num];
			}
			/**
			 * 公历农历转换
			 * M=0公历到农历,M=1农历到公历
			 * date_yy:年
			 * date_mm:月，闰月为 负数
			 * date_dd:日
			 */
			function calendarConvert(M,date_yy,date_mm,date_dd){
			    var year = date_yy;
			    var month = date_mm;
			    var date = date_dd;

			    var FIRSTYEAR = 1940;//最小年份
			    var LASTYEAR = 2030;//最大年份

			    //西曆年每月之日數
			    var SolarCal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

			    //西曆年每月之累積日數, 平年與閏年
			    var SolarDays = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365, 396,0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366, 397];

			    //公历转农历
			    if (M == 0) {  
			        var SolarYear = parseInt(year);
			        var SolarMonth = parseInt(month);
			        var SolarDate = parseInt(date);

			        var sm = SolarMonth - 1;

			        var leap = GetLeap(SolarYear);

			        var d=(sm == 1)?leap + 28:SolarCal[sm];

			        var y = SolarYear - FIRSTYEAR;
			        var acc = SolarDays[leap * 14 + sm] + SolarDate;
			        var kc = acc + LunarCal[y].BaseKanChih;
			        var Age = kc % 60;
			        Age=(Age < 22)?22 - Age:82 - Age;

			        Age = Age + 3;
			        if (Age < 10) Age = Age + 60;

			        if (acc <= LunarCal[y].BaseDays) {
			            y--;
			            var LunarYear = SolarYear - 1;
			            leap = GetLeap(LunarYear);
			            sm += 12;
			            acc = SolarDays[leap * 14 + sm] + SolarDate;
			        }else{
			            var LunarYear = SolarYear;
			        }
			        var l1 = LunarCal[y].BaseDays;
			        for (i = 0; i < 13; i++) {
			            var l2 = l1 + LunarCal[y].MonthDays[i] + 29;
			            if (acc <= l2) break;
			            l1 = l2;
			        }
			        var LunarMonth = i + 1;
			        var LunarDate = acc - l1;
			        var im = LunarCal[y].Intercalation;
			        if (im != 0 && LunarMonth > im) {
			            LunarMonth--;
			            if (LunarMonth == im) LunarMonth = -im;
			        }
			        if (LunarMonth > 12) LunarMonth -= 12;

			        return {yy:LunarYear,mm:LunarMonth,dd:LunarDate};
			    }
			    /* 农历转公历 */
			    else  {
			        var LunarYear = parseInt(year);
			        var LunarMonth = parseInt(month);
			        var LunarDate = parseInt(date);

			        var y = LunarYear - FIRSTYEAR;
			        var im = LunarCal[y].Intercalation;
			        var lm = LunarMonth;

			        if (im != 0) {
			            if (lm > im){
			                lm++;
			            }else if (lm == -im){
			                lm = im + 1;
			            }
			        }
			        lm--;

			        var acc = 0;
			        for (var i = 0; i < lm; i++) {
			            acc += LunarCal[y].MonthDays[i] + 29;
			        }

			        acc += LunarCal[y].BaseDays + LunarDate;

			        var leap = GetLeap(LunarYear);

			        for (var i = 13; i >= 0; i--) {
			            if (acc > SolarDays[leap * 14 + i]) break;
			        }
			        var SolarDate = acc - SolarDays[leap * 14 + i];

			        if (i <= 11) {
			            var SolarYear = LunarYear;
			            var SolarMonth = i + 1;
			        }
			        else {
			            var SolarYear = LunarYear + 1;
			            var SolarMonth = i - 11;
			        }
			        // return SolarYear + "-" + SolarMonth + "-" + SolarDate;
			        return {yy:SolarYear,mm:SolarMonth,dd:SolarDate};
			    }    
			}
			/* 闰年, 返回 0 平年, 1 闰年 */
			function GetLeap(year) {
			    if (year % 400 == 0)
			        return 1;
			    else if (year % 100 == 0)
			        return 0;
			    else if (year % 4 == 0)
			        return 1;
			    else
			        return 0;
			}
			// 农历对象数据处理
			function tagLunarCal(d, i, w, k, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13) {
			    this.BaseDays = d;         /* 1 月 1 日到正月初一的累计日 */
			    this.Intercalation = i;    /* 闰月月份. 0==此年沒有闰月 */
			    this.BaseWeekday = w;      /* 此年 1 月 1 日为星期减 1 */
			    this.BaseKanChih = k;      /* 此年 1 月 1 日之干支序号减 1 */
			    this.MonthDays = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13]; /* 此农历年每月之大小, 0==小月(29日), 1==大月(30日) */
			}
			// PC滑动鼠标滚轮处理
			function gearMouseRolling(e){
				var e=e||event;
				var dir=true;
				if(e.wheelDelta){
				    dir=e.wheelDelta>0?true:false; //ie和chrome
				}else{
				    dir=e.detail<0?true:false;//firefox
				}
				//dir:true向上滚动，false向下滚动
				var moveDir=dir?21:-21;
				// 移动前
				e.preventDefault();
				var target = e.target;
				while (true) {
					if (!target.classList.contains("gear")) {
						target = target.parentElement;
					} else {
						break
					}
				}
				clearInterval(target["int_" + target.id]);
				target["old_" + target.id] = 0;
				target["o_t_" + target.id] = (new Date()).getTime();
				var top = target.getAttribute('top');
				if (top) {
					target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
				} else {
					target["o_d_" + target.id] = 0;
				}
				// 移动中
				target["new_" + target.id] = moveDir;
				target["n_t_" + target.id] = (new Date()).getTime()+360;
				var f = (target["new_" + target.id] - target["old_" + target.id]) * 18 / 370;
				target["pos_" + target.id] = target["o_d_" + target.id] + f;
				target.setAttribute('top', target["pos_" + target.id] + 'em');
				// 移动后
				var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
				if (Math.abs(flag) <= 0.2) {
					target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
				} else {
					if (Math.abs(flag) <= 0.5) {
						target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
					} else {
						target["spd_" + target.id] = flag / 2;
					}
				}
				if (!target["pos_" + target.id]) {
					target["pos_" + target.id] = 0;
				}
				if(e.preventDefault){e.preventDefault();}
				rollGear(target);
				return false;
			}
			// PC滑动鼠标处理
			function gearMouseSlide(e){
				e.preventDefault();
				var target = e.target;
				var targetPc=target;
				var mousedownTip=false;//鼠标滑动锁
				while (true) {
					if (!target.classList.contains("gear")) {
						target = target.parentElement;
					} else {
						break
					}
				}
				clearInterval(target["int_" + target.id]);
				target["old_" + target.id] = e.screenY;
				target["o_t_" + target.id] = (new Date()).getTime();
				var top = target.getAttribute('top');
				if (top) {
					target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
				} else {
					target["o_d_" + target.id] = 0;
				}
				document.onmousemove=function(e){
					mousedownTip=true;//鼠标滑动锁
					e = e || window.event;
					e.preventDefault();
					var target = targetPc;//鼠标兼容处理
					while (true) {
						if (!target.classList.contains("gear")) {
							target = target.parentElement;
						} else {
							break
						}
					}
					target["new_" + target.id] = e.screenY;
					target["n_t_" + target.id] = (new Date()).getTime();
					var f = (target["new_" + target.id] - target["old_" + target.id]) * 18 / 370;
					target["pos_" + target.id] = target["o_d_" + target.id] + f;
					target.style["transform"] = 'translate(0,' + target["pos_" + target.id] + 'em)';
					target.style["-webkit-transform"] = 'translate(0,' + target["pos_" + target.id] + 'em)';
					target.style["-moz-transform"] = 'translate(0,' + target["pos_" + target.id] + 'em)';
					target.style["-ms-transform"] = 'translate(0,' + target["pos_" + target.id] + 'em)';
					target.style["-o-transform"] = 'translate(0,' + target["pos_" + target.id] + 'em)';
					target.setAttribute('top', target["pos_" + target.id] + 'em');
				};
				// 释放鼠标
	            document.onmouseup=function(e){
	            	//阻止点击
	            	if(!mousedownTip){
	            		document.onmousemove=null;
	                	document.onmouseup=null; 
	            		return false;
	            	}
	            	e = e || window.event;
	                e.preventDefault();
					var target = targetPc;//鼠标兼容处理
					while (true) {
						if (!target.classList.contains("gear")) {
							target = target.parentElement;
						} else {
							break;
						}
					}
					var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
					if (Math.abs(flag) <= 0.2) {
						target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
					} else {
						if (Math.abs(flag) <= 0.5) {
							target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
						} else {
							target["spd_" + target.id] = flag / 2;
						}
					}
					if (!target["pos_" + target.id]) {
						target["pos_" + target.id] = 0;
					}
					rollGear(target);
	                document.onmousemove=null;
	                document.onmouseup=null; 
				}
			}
			//触摸开始
			function gearTouchStart(e) {
				e.preventDefault();
				var target = e.target;
				target['touchTip']=false;//滑动锁
				while (true) {
					if (!target.classList.contains("gear")) {
						target = target.parentElement;
					} else {
						break
					}
				}
				clearInterval(target["int_" + target.id]);
				target["old_" + target.id] = e.targetTouches[0].screenY;
				target["o_t_" + target.id] = (new Date()).getTime();
				var top = target.getAttribute('top');
				if (top) {
					target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
				} else {
					target["o_d_" + target.id] = 0;
				}
			}
			//手指移动
			function gearTouchMove(e) {
				e.preventDefault();
				var target = e.target;
				target['touchTip']=true;//滑动锁
				while (true) {
					if (!target.classList.contains("gear")) {
						target = target.parentElement;
					} else {
						break
					}
				}
				target["new_" + target.id] = e.targetTouches[0].screenY;
				target["n_t_" + target.id] = (new Date()).getTime();
				var f = (target["new_" + target.id] - target["old_" + target.id]) * 18 / 370;
				target["pos_" + target.id] = target["o_d_" + target.id] + f;
				target.style["transform"] = 'translate(0,' + target["pos_" + target.id] + 'em)';
				target.style["-webkit-transform"] = 'translate(0,' + target["pos_" + target.id] + 'em)';
				target.style["-moz-transform"] = 'translate(0,' + target["pos_" + target.id] + 'em)';
				target.style["-ms-transform"] = 'translate(0,' + target["pos_" + target.id] + 'em)';
				target.style["-o-transform"] = 'translate(0,' + target["pos_" + target.id] + 'em)';
				target.setAttribute('top', target["pos_" + target.id] + 'em');
			}
			//离开屏幕
			function gearTouchEnd(e) {
				e.preventDefault();
				var target = e.target;
				if(!target['touchTip']) return false;
				while (true) {
					if (!target.classList.contains("gear")) {
						target = target.parentElement;
					} else {
						break;
					}
				}
				var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
				if (Math.abs(flag) <= 0.2) {
					target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
				} else {
					if (Math.abs(flag) <= 0.5) {
						target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
					} else {
						target["spd_" + target.id] = flag / 2;
					}
				}
				if (!target["pos_" + target.id]) {
					target["pos_" + target.id] = 0;
				}
				rollGear(target);
			}
			//缓动效果
			function rollGear(target) {
				var d = 0;
				var stopGear = false;
				var passY = _self.maxY - _self.minY + 1;
				clearInterval(target["int_" + target.id]);
				target["int_" + target.id] = setInterval(function() {
					var pos = target["pos_" + target.id];
					var speed = target["spd_" + target.id] * Math.exp(-0.03 * d);
					pos += speed;
					if (Math.abs(speed) > 0.1) {} else {
						speed = 0.1;
						var b = Math.round(pos / 2) * 2;
						if (Math.abs(pos - b) < 0.02) {
							stopGear = true;
						} else {
							if (pos > b) {
								pos -= speed
							} else {
								pos += speed
							}
						}
					}
					if (pos > 8) {
						pos = 8;
						stopGear = true;
					}
					switch (target.getAttribute('data-datetype')) {
						case "date_yy":
							var minTop = 8 - (passY - 1) * 2;
							if (pos < minTop) {
								pos = minTop;
								stopGear = true;
							}
							if (stopGear) {
								var gearVal = Math.abs(pos - 8) / 2;
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						case "date_mm":
							var date_yy = _self.gearDate.querySelector(".date_yy");
							//得到年份的值
							var yyVal = parseInt(date_yy.getAttribute("val"));
							// 判断否有闰月
							var rmNum=LunarCal[yyVal].Intercalation?LunarCal[yyVal].Intercalation:0;
							if(rmNum && _self.type){
								var maxM = 12;
							}else{
								var maxM = 11;
							}
							var minM = 0;
							//当年份到达最大值
							if (yyVal == passY - 1) {
								if(_self.type){
									maxM = _self.maxM - 2;
								}else{
									maxM = _self.maxM - 1;
								}
								// maxM = _self.maxM - 1;
							}
							//当年份到达最小值
							if (yyVal == 0) {
								if(_self.type){
									minM = _self.minM - 1;
								}else{
									minM = _self.minM;
								}
								// minM = _self.minM - 1;
							}
							var minTop = 8 - (maxM - minM) * 2;
							if (pos < minTop) {
								pos = minTop;
								stopGear = true;
							}
							if (stopGear) {
								var gearVal = Math.abs(pos - 8) / 2 + minM;
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						case "date_dd":
							var date_yy = _self.gearDate.querySelector(".date_yy");
							var date_mm = _self.gearDate.querySelector(".date_mm");
							//得到年份的值
							var yyVal = parseInt(date_yy.getAttribute("val"));
							//得到月份的值
							var mmVal = parseInt(date_mm.getAttribute("val"));
							//返回月份的天数
							var maxMonthDays = calcDays(yyVal, mmVal);
							var maxD = maxMonthDays - 1;
							var minD = 0;
							//当年份月份到达最大值
							if (yyVal == passY - 1 && 11 == mmVal + 1) {
								if(_self.type){
									maxD = _self.maxD - 7;
								}else{
									maxD = _self.maxD - 2;
								}
								// maxD = _self.maxD - 1;
							}
							//当年、月到达最小值
							if (yyVal == 0 && 2 == mmVal + 1) {
								if(_self.type){
									minD = _self.minD -1;
								}else{
									minD = _self.minD + 6;
								}
								// minD = _self.minD - 1;
							}
							var minTop = 8 - (maxD - minD) * 2;
							if (pos < minTop) {
								pos = minTop;
								stopGear = true;
							}
							if (stopGear) {
								var gearVal = Math.abs(pos - 8) / 2 + minD;
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						case "date_hh":
							var minTop = 8 - (25 - 1) * 2;
							if (pos < minTop) {
								pos = minTop;
								stopGear = true;
							}
							if (stopGear) {
								var gearVal = Math.abs(pos - 8) / 2;
								setGear(target, gearVal);
								clearInterval(target["int_" + target.id]);
							}
							break;
						default:
					}
					target["pos_" + target.id] = pos;
					target.style["transform"] = 'translate(0,' + pos + 'em)';
					target.style["-webkit-transform"] = 'translate(0,' + pos + 'em)';
					target.style["-moz-transform"] = 'translate(0,' + pos + 'em)';
					target.style["-ms-transform"] = 'translate(0,' + pos + 'em)';
					target.style["-o-transform"] = 'translate(0,' + pos + 'em)';
					target.setAttribute('top', pos + 'em');
					d++;
				}, 6);
			}
			//控制插件滚动后停留的值
			function setGear(target, val) {
				val = Math.round(val);
				target.setAttribute("val", val);
				setDateGearTooth();
			}
			//取消
			function closeMobileCalendar(e) {
				e.preventDefault();
				if (!window.CustomEvent) {
					var evt = new CustomEvent('input');
					_self.trigger.dispatchEvent(evt);
				}
				document.body.removeChild(_self.gearDate);
			}
			//日期确认
			function finishMobileDate(e) {
				var d=getCalendarDate();
				_self.trigger.setAttribute('data-date',d.yy+ "-" + d.mm + "-" +d.dd);
				_self.trigger.setAttribute('data-hour',d.hh);
				var inputId=_self.trigger.getAttribute('data-toid-date');
				var hourId=_self.trigger.getAttribute('data-toid-hour');
				if(inputId) document.getElementById(inputId).value=d.yy+ "-" + d.mm + "-" +d.dd;
				if(hourId) document.getElementById(hourId).value=d.hh<0?'':d.hh;
				var hourStr='';
				if(_self.type){
					var mmChina=d._mm<0?getChinese('rm',-d._mm):getChinese('mm',d._mm);
					if(hourId){
						if(d.hh<0){
							hourStr="时辰未知";
						}else{
							hourStr=getChinese('hh',d.hh)+'时';
						}
					}
					_self.trigger.value = "农历:"+d._yy+ "年" +mmChina+''+getChinese('dd',d._dd)+' '+hourStr;
				}else{
					if(hourId){
						if(d.hh<0){
							hourStr="时辰未知";
						}else{
							hourStr=d.hh+'时';
						}
					}
					_self.trigger.value = "公历:"+d.yy+ "-" + d.mm + "-" +d.dd+' '+hourStr;
				}
				closeMobileCalendar(e);
			}
			//设置顶部日期+返回对象 _yy 农历年  yy公历年   
			function getCalendarDate(){
				var passY = _self.maxY - _self.minY + 1;
				var val_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
				var date_yy=val_yy % passY + _self.minY;
				var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
				var date_dd = parseInt(Math.round(_self.gearDate.querySelector(".date_dd").getAttribute("val"))) + 1;
				// 判断是否启用时辰
				var hour_on=_self.gearDate.querySelector(".date_hh")?1:0;
				if(hour_on){
					var date_hh=parseInt(Math.round(_self.gearDate.querySelector(".date_hh").getAttribute("val"))) - 1;
				}
				// 判断否有闰月
				var rmNum=LunarCal[val_yy].Intercalation?LunarCal[val_yy].Intercalation:0;
				if(_self.type && rmNum){
					if(rmNum==(date_mm-1)){
						date_mm=-(date_mm-1);
					}else if(rmNum<(date_mm-1)){
						date_mm=date_mm-1;
					}else{
						date_mm=date_mm;
					}
				}
				var objDate=calendarConvert(_self.type,date_yy,date_mm,date_dd);
				var info=_self.gearDate.querySelector(".lcalendar_info");
				if(_self.type){
					_self.trigger.setAttribute("data-type", 1);
					var mmChina=date_mm<0?getChinese('rm',-date_mm):getChinese('mm',date_mm);
					var hhStr="";
					if(hour_on){
						if(date_hh<0){
							hhStr="时辰未知";
						}else{
							hhStr=getChinese('hh',date_hh)+'时';
						}
					}
					info.innerHTML='农历:'+date_yy+'年'+mmChina+''+getChinese('dd',date_dd)+' '+hhStr;
					return {
						yy:objDate.yy,
						mm:objDate.mm,
						dd:objDate.dd,
						_yy:date_yy,
						_mm:date_mm,
						_dd:date_dd,
						hh:date_hh
					}
				}else{
					_self.trigger.setAttribute("data-type", 0);
					var hhStr="";
					if(hour_on){
						if(date_hh<0){
							hhStr="时辰未知";
						}else{
							hhStr=date_hh+'时';
						}
					}
					info.innerHTML='公历:'+date_yy+'年'+date_mm+'月'+date_dd+'日'+' '+hhStr;
					return {
						_yy:objDate.yy,
						_mm:objDate.mm,
						_dd:objDate.dd,
						yy:date_yy,
						mm:date_mm,
						dd:date_dd,
						hh:date_hh
					}
				}
			}
			// 判断移动端
			var isMove = false;
        	var startTime = 0;
			if('ontouchstart' in window){
				// 判断移动的点击事件tap操作
				_self.trigger.addEventListener('touchstart',function(e){
		            startTime = Date.now();
		        });
		        _self.trigger.addEventListener('touchmove',function(e){
		            isMove = true;
		        });
		        _self.trigger.addEventListener('touchend',function(e){
		            /*判读  是否满足tap 的要求  一般要求tap的响应时间150*/
		            if(!isMove && (Date.now()-startTime) < 150){
		                e.preventDefault();
						popupDate();
		            }
		            /*重置 参数*/
		            isMove = false;
		            startTime = 0;
		        });
			}else{
				_self.trigger.addEventListener('click',function(){
					popupDate();
				})
			}
		}
	}
	return datePicker;
})()