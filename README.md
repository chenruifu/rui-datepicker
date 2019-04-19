## 公农历日期选择器(rui-datepicker)

rui-datepicker是一款支持农历公历选择的原生插件。PC和移动端通用，支持公历农历切换，带时辰和不带时辰...

时间区间定死的1940-2-8至2018-12-31，如需调整可到代码里面自行修改。


### 使用方法

```html
<!-- 在页面中引入js和css文件 -->
<link rel="stylesheet" href="./rui-datepicker.css">
<script src="./rui-datepicker.js"></script>
```

### HTML结构及调用

```html
<!-- 不带时辰 -->
<input id="demo1" type="text" data-toid-date="date" placeholder="日期选择不带时辰"  data-type="1" readonly="readonly" /></input>
<input type="hidden" id="date" name="date">

<!-- 带时辰 -->
<input id="demo2" type="text" data-toid-date="date1" data-toid-hour="hour1" data-hour="7" placeholder="日期选择带时辰" readonly="readonly"/>
<input type="hidden" id="date1" name="date">
<input type="hidden" id="hour1" name="hour">

<!-- 带时辰(提示确认)-->
<input id="demo3" type="text" data-confirm="true" data-toid-date="date1" data-toid-hour="hour1" data-hour="7" placeholder="日期选择带时辰" readonly="readonly"/>
<input type="hidden" id="date1" name="date">
<input type="hidden" id="hour1" name="hour">

<!-- js -->
<script>
    var date1 = new ruiDatepicker().init('#demo1');
    var date2 = new ruiDatepicker().init('#demo2');
    var date3 = new ruiDatepicker().init('#demo3');
</script>
```

### 参数配置

* 参数配置全部在HTML中，日期区间默认写死：1940-2-8至2018-12-31

```js
//起始农历&公历：默认公历
data-type="0"   公历
data-type="1"   农历

//起始日期(公历)：默认当前日期
data-date="2016-12-31"  

//确认日期后赋值隐藏表单日期ID(公历)
data-toid-date="inputDate"

//确认日期后赋值隐藏表单时辰ID(公历)
data-toid-hour="inputHour"
//起始时辰：默认0未知，该参数作用居于data-toid-hour为真
data-hour="3"  

//点击完成后，显示确认框（默认不显示）
data-confirm="true"      
```



