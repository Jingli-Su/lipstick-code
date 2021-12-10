
  var lipstickData = [];
  var en_data = [];
  var jk_data = [];
  var esasia_data = [];
  var china_data = [];
  var lipstickData2 = [];
  var mCharts = echarts.init(document.querySelector('#scatter_chart'));
    //读取文件中的数据
    $.getJSON('dist/lipstick3.json', function (data) {
        //console.log(typeof lipstickData2)
        updateLipstickData(data);
        console.log(lipstickData[1])
        //console.log(lipstickData2)
        mCharts.setOption(option);

    });

    function updateLipstickData(rawData) {
    //lipstickData = [];
    for (var rid = 0, rlen = rawData.data.length; rid < rlen; ++rid) {
        var region_data = [];
        var region = rawData.data[rid];
        for (var bid = 0, blen = region.brand.length; bid < blen; ++bid) {
        //var brand_data = [];
            var brand = region.brand[bid];
            for (var lid = 0, llen = brand.lipsticks.length; lid < llen; ++lid){
                var lip = brand.lipsticks[lid];
                var name = lip.name;
                var color = lip.color;
                var hsl = tinycolor(color).toHsl();
                var hue = encodeHue(hsl.h);
                var saturation = hsl.s;
                var l_region = region.region_name;
                var l_brand = brand.brand_name;
                if (l_region =='En_region'){
                    en_data.push([hue,saturation,l_region,l_brand, name,color]);
                }
                else if(l_region == 'Jk_region'){
                    jk_data.push([hue,saturation,l_region,l_brand, name,color]);
                }
               else if(l_region == "EsAsia_region"){
                    esasia_data.push([hue,saturation,l_region,l_brand, name,color]);
                }
                else {
                    china_data.push([hue,saturation,l_region,l_brand, name,color]);
                }

                //lipstickData2.push([hue,light,l_region,l_brand, name,color]);
                //brand_data.push([hue,light,l_region,l_brand,name,color]);
                //region_data.push([hue,light,l_region,l_brand,name,color]);
            }
        }
        //lipstickData.push(region_data);
    }
   }

   function encodeHue(hue) {
    if (hue < 180) {
        return 180 - hue;
    }
    else {
        return 540 - hue;
    }
}
    var option = {
        title: {
          text: '不同地区口红色号分布',
          left: 'center',
          textStyle: {
            fontSize: 30
          },
        },
        legend: {
            data: ["欧美", "日韩","东南亚", "中国"],
            selectedMode: 'multiple',
            left: 10,
            bottom: 10
        },
        tooltip: {formatter:'{c}'},
        xAxis: {max:350},
        yAxis: {max:1},
  series: [{
    name: "欧美",
    data: en_data,
    type: 'scatter',
    itemStyle:{
    //debug记录：刚开始设置颜色参数return arg[5]，无法设置颜色，因为arg并不直接是传入的数组数据，需要通过arg.data去引用
  color:function(arg){
  return arg.data[5]
  }
  },
    dimensions: ['hue','saturation','region','brand','name','color'],
  },
  {
    name: "日韩",
    data:jk_data,
    type: 'scatter',
    dimensions: ['hue','saturation','region','brand','name','color'],
    itemStyle:{
        color:function(arg){
            //console.log('hhhhhh');
            return arg.data[5]
        }
    }
  },{
    name: "东南亚",
    data:esasia_data,
    type: 'scatter',
    dimensions: ['hue','saturation','region','brand','name','color'],
    itemStyle:{
        color:function(arg){
            //console.log('hhhhhh');
            return arg.data[5]
        }
    }
  },{
    name: "中国",
    data:china_data,
    type: 'scatter',
    dimensions: ['hue','saturation','region','brand','name','color'],
    itemStyle:{
        color:function(arg){
            //console.log('hhhhhh');
            return arg.data[5]
        }
    }
  }  ]
 };

