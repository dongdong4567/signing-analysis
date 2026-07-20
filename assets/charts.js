(function() {
  'use strict';

  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  var palette = [accent, '#10b981', accent2, '#8b5cf6', '#f43f5e', '#06b6d4', '#f97316', '#14b8a6', '#6366f1', '#ec4899', '#84cc16', '#0ea5e9', '#d946ef', '#22c55e', '#eab308'];
  var palette2 = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e'];

  // ========== Data ==========
  var branchData = [
    { name: '北京分公司', value: 1708 },
    { name: '河北分公司', value: 833 },
    { name: '湖北分公司', value: 546 },
    { name: '贵州分公司', value: 516 },
    { name: '山东分公司', value: 515 },
    { name: '青岛分公司', value: 435 },
    { name: '临沂分公司', value: 406 },
    { name: '辽宁分公司', value: 335 },
    { name: '烟台分公司', value: 269 },
    { name: '江西分公司', value: 155 },
    { name: '河北雄安分公司', value: 138 },
    { name: '宜昌分公司', value: 107 },
    { name: '上海分公司', value: 101 },
    { name: '海菱智慧服务', value: 24 },
    { name: '云南分公司', value: 9 },
    { name: '内蒙古分公司', value: 5 },
    { name: '潍坊分公司', value: 2 }
  ];

  var monthlyData = [
    { month: '1月', value: 1096 },
    { month: '2月', value: 471 },
    { month: '3月', value: 1100 },
    { month: '4月', value: 1080 },
    { month: '5月', value: 906 },
    { month: '6月', value: 1148 },
    { month: '7月', value: 303 }
  ];

  var months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月'];
  var top5Branches = ['北京分公司', '河北分公司', '湖北分公司', '贵州分公司', '山东分公司'];
  var top5Data = {
    '北京分公司': [247, 99, 410, 303, 212, 277, 160],
    '河北分公司': [160, 125, 122, 179, 124, 118, 5],
    '湖北分公司': [189, 37, 67, 92, 86, 73, 2],
    '贵州分公司': [91, 52, 53, 131, 0, 186, 3],
    '山东分公司': [135, 52, 35, 29, 85, 79, 100]
  };

  // All branches data for heatmap (sorted by total descending)
  var heatmapBranches = [
    '北京分公司', '河北分公司', '湖北分公司', '贵州分公司', '山东分公司',
    '青岛分公司', '临沂分公司', '辽宁分公司', '烟台分公司', '江西分公司',
    '河北雄安分公司', '宜昌分公司', '上海分公司', '海菱智慧服务', '云南分公司',
    '内蒙古分公司', '潍坊分公司'
  ];

  var heatmapData = [
    [0, 0, 247], [0, 1, 99], [0, 2, 410], [0, 3, 303], [0, 4, 212], [0, 5, 277], [0, 6, 160],
    [1, 0, 160], [1, 1, 125], [1, 2, 122], [1, 3, 179], [1, 4, 124], [1, 5, 118], [1, 6, 5],
    [2, 0, 189], [2, 1, 37], [2, 2, 67], [2, 3, 92], [2, 4, 86], [2, 5, 73], [2, 6, 2],
    [3, 0, 91], [3, 1, 52], [3, 2, 53], [3, 3, 131], [3, 4, 0], [3, 5, 186], [3, 6, 3],
    [4, 0, 135], [4, 1, 52], [4, 2, 35], [4, 3, 29], [4, 4, 85], [4, 5, 79], [4, 6, 100],
    [5, 0, 34], [5, 1, 3], [5, 2, 203], [5, 3, 55], [5, 4, 33], [5, 5, 96], [5, 6, 11],
    [6, 0, 55], [6, 1, 24], [6, 2, 60], [6, 3, 114], [6, 4, 116], [6, 5, 29], [6, 6, 8],
    [7, 0, 90], [7, 1, 30], [7, 2, 19], [7, 3, 15], [7, 4, 66], [7, 5, 110], [7, 6, 5],
    [8, 0, 39], [8, 1, 0], [8, 2, 8], [8, 3, 75], [8, 4, 41], [8, 5, 106], [8, 6, 0],
    [9, 0, 8], [9, 1, 15], [9, 2, 24], [9, 3, 14], [9, 4, 80], [9, 5, 14], [9, 6, 0],
    [10, 0, 9], [10, 1, 26], [10, 2, 43], [10, 3, 38], [10, 4, 18], [10, 5, 4], [10, 6, 0],
    [11, 0, 23], [11, 1, 0], [11, 2, 35], [11, 3, 4], [11, 4, 7], [11, 5, 38], [11, 6, 0],
    [12, 0, 12], [12, 1, 4], [12, 2, 21], [12, 3, 29], [12, 4, 35], [12, 5, 0], [12, 6, 0],
    [13, 0, 0], [13, 1, 0], [13, 2, 0], [13, 3, 0], [13, 4, 2], [13, 5, 13], [13, 6, 9],
    [14, 0, 4], [14, 1, 4], [14, 2, 0], [14, 3, 1], [14, 4, 0], [14, 5, 0], [14, 6, 0],
    [15, 0, 0], [15, 1, 0], [15, 2, 0], [15, 3, 0], [15, 4, 0], [15, 5, 5], [15, 6, 0],
    [16, 0, 0], [16, 1, 0], [16, 2, 0], [16, 3, 1], [16, 4, 1], [16, 5, 0], [16, 6, 0]
  ];

  // ========== Chart 1: Branch Ranking ==========
  var chart1 = echarts.init(document.getElementById('chart-branch-rank'), null, { renderer: 'svg' });
  chart1.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      appendToBody: true,
      formatter: function(params) {
        var p = params[0];
        return '<strong>' + p.name + '</strong><br/>签约数量：<strong>' + p.value.toLocaleString() + '</strong>';
      }
    },
    grid: { left: 120, right: 40, top: 20, bottom: 40 },
    xAxis: {
      type: 'value',
      axisLabel: { color: muted, fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    yAxis: {
      type: 'category',
      data: branchData.map(function(d) { return d.name; }).reverse(),
      axisLabel: { color: ink, fontSize: 11, fontWeight: 500 },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [{
      type: 'bar',
      data: branchData.map(function(d) { return d.value; }).reverse(),
      barWidth: 18,
      itemStyle: {
        borderRadius: [0, 4, 4, 0],
        color: function(params) {
          return params.dataIndex >= branchData.length - 5 ? accent : muted + '55';
        }
      },
      label: {
        show: true,
        position: 'right',
        color: muted,
        fontSize: 11,
        formatter: function(p) { return p.value.toLocaleString(); }
      }
    }]
  });
  window.addEventListener('resize', function() { chart1.resize(); });

  // ========== Chart 2: Monthly Trend ==========
  var chart2 = echarts.init(document.getElementById('chart-monthly-trend'), null, { renderer: 'svg' });
  chart2.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      formatter: function(params) {
        var p = params[0];
        return '<strong>' + p.name + '</strong><br/>签约量：<strong>' + p.value.toLocaleString() + '</strong>';
      }
    },
    grid: { left: 50, right: 20, top: 20, bottom: 30 },
    xAxis: {
      type: 'category',
      data: months,
      axisLabel: { color: muted, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: muted, fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [{
      type: 'line',
      data: monthlyData.map(function(d) { return d.value; }),
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: { color: accent, width: 3 },
      itemStyle: { color: accent },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: accent + '40' },
            { offset: 1, color: accent + '05' }
          ]
        }
      },
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' }
        ],
        symbolSize: 40,
        label: { color: '#fff', fontSize: 10, formatter: function(p) { return p.value; } },
        itemStyle: { color: function(p) { return p.data.type === 'max' ? '#f43f5e' : accent2; } }
      }
    }]
  });
  window.addEventListener('resize', function() { chart2.resize(); });

  // ========== Chart 3: Distribution Pie ==========
  var chart3 = echarts.init(document.getElementById('chart-distribution'), null, { renderer: 'svg' });
  var pieData = [
    { name: '北京分公司', value: 1708 },
    { name: '河北分公司', value: 833 },
    { name: '湖北分公司', value: 546 },
    { name: '贵州分公司', value: 516 },
    { name: '山东分公司', value: 515 },
    { name: '其他', value: 435 + 406 + 335 + 269 + 155 + 138 + 107 + 101 + 24 + 9 + 5 + 2 }
  ];
  chart3.setOption({
    animation: false,
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      formatter: function(p) {
        return '<strong>' + p.name + '</strong><br/>' + p.value.toLocaleString() + ' 笔 (' + p.percent + '%)';
      }
    },
    series: [{
      type: 'pie',
      radius: ['35%', '65%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: true,
      label: {
        show: true,
        formatter: function(p) { return p.name + '\n' + p.percent + '%'; },
        color: ink,
        fontSize: 10,
        lineHeight: 16
      },
      labelLine: { length: 8, length2: 12 },
      emphasis: {
        label: { fontWeight: 'bold', fontSize: 12 },
        itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.15)' }
      },
      data: pieData.map(function(d, i) {
        return { name: d.name, value: d.value, itemStyle: { color: palette[i] } };
      })
    }]
  });
  window.addEventListener('resize', function() { chart3.resize(); });

  // ========== Chart 4: Heatmap ==========
  var chart4 = echarts.init(document.getElementById('chart-heatmap'), null, { renderer: 'svg' });
  chart4.setOption({
    animation: false,
    tooltip: {
      position: 'top',
      appendToBody: true,
      formatter: function(p) {
        var val = p.data[2];
        return '<strong>' + heatmapBranches[p.data[1]] + '</strong> - ' + months[p.data[0]] + '<br/>签约量：<strong>' + val + '</strong>';
      }
    },
    grid: { left: 110, right: 60, top: 20, bottom: 30 },
    xAxis: {
      type: 'category',
      data: months,
      axisLabel: { color: muted, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false },
      splitArea: { show: false }
    },
    yAxis: {
      type: 'category',
      data: heatmapBranches,
      axisLabel: { color: ink, fontSize: 10, fontWeight: 500 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitArea: { show: false }
    },
    visualMap: {
      min: 0,
      max: 410,
      calculable: true,
      orient: 'vertical',
      right: 0,
      top: 'center',
      textStyle: { color: muted, fontSize: 10 },
      inRange: { color: ['#f1f5f9', '#93c5fd', '#3b82f6', '#1d4ed8', '#1e3a5f'] }
    },
    series: [{
      type: 'heatmap',
      data: heatmapData,
      label: {
        show: true,
        color: function(p) {
          return p.data[2] > 200 ? '#fff' : ink;
        },
        fontSize: 10,
        fontWeight: 500
      },
      emphasis: {
        itemStyle: { shadowBlur: 6, shadowColor: 'rgba(0,0,0,0.2)' }
      }
    }]
  });
  window.addEventListener('resize', function() { chart4.resize(); });

  // ========== Chart 5: Top 5 Line Trend ==========
  var chart5 = echarts.init(document.getElementById('chart-top5'), null, { renderer: 'svg' });
  chart5.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis',
      appendToBody: true
    },
    legend: {
      data: top5Branches,
      bottom: 0,
      left: 'center',
      textStyle: { color: muted, fontSize: 11 }
    },
    grid: { left: 50, right: 30, top: 20, bottom: 50 },
    xAxis: {
      type: 'category',
      data: months,
      axisLabel: { color: muted, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: muted, fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: top5Branches.map(function(name, i) {
      return {
        name: name,
        type: 'line',
        data: top5Data[name],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2.5 },
        itemStyle: { color: palette2[i] }
      };
    })
  });
  window.addEventListener('resize', function() { chart5.resize(); });

})();