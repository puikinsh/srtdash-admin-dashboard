/*--------------  Coin Distribution doughnut (Chart.js)  ------------*/
if (document.getElementById('coin-distribution-chart')) {

    /* Center text plugin */
    var centerTextPlugin = {
        id: 'centerText',
        afterDraw: function(chart) {
            var ctx = chart.ctx;
            var width = chart.width;
            var height = chart.height;
            ctx.save();
            ctx.font = '700 17px Poppins, sans-serif';
            ctx.fillStyle = '#1e293b';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('340 Coin', width / 2, height / 2 - 10);
            ctx.restore();
        }
    };

    new Chart(document.getElementById('coin-distribution-chart'), {
        type: 'doughnut',
        data: {
            labels: ['Bitcoin', 'LiteCoin', 'Ethereum'],
            datasets: [{
                data: [1355460, 1585218, 1064598],
                backgroundColor: ['#3b82f6', '#f59e0b', '#6366f1'],
                hoverBackgroundColor: ['#2563eb', '#d97706', '#4f46e5'],
                borderWidth: 3,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 16,
                        font: { family: 'Poppins', size: 12 },
                        color: '#64748b'
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleFont: { family: 'Poppins', size: 13 },
                    bodyFont: { family: 'Poppins', size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            var val = context.parsed;
                            var total = context.dataset.data.reduce(function(a, b) { return a + b; }, 0);
                            var pct = ((val / total) * 100).toFixed(1);
                            return ' ' + context.label + ': $' + val.toLocaleString() + ' (' + pct + '%)';
                        }
                    }
                }
            }
        },
        plugins: [centerTextPlugin]
    });
}
/*--------------  Coin Distribution END  ------------*/

/*-------------- 1 Pie chart amchart start ------------*/
if (document.getElementById('ampiechart1')) {
    var chart = AmCharts.makeChart("ampiechart1", {
        "type": "pie",
        "labelRadius": -35,
        "labelText": "[[percents]]%",
        "dataProvider": [{
            "country": "Lithuania",
            "litres": 501.9,
            "backgroundColor": "#815DF6"
        }, {
            "country": "Czech Republic",
            "litres": 301.9,
            "backgroundColor": "#67B7DC"
        }, {
            "country": "Ireland",
            "litres": 201.1,
            "backgroundColor": "#9c82f4"
        }, {
            "country": "The Netherlands",
            "litres": 150,
            "backgroundColor": "#FDD400"
        }],
        "color": "#fff",
        "colorField": "backgroundColor",
        "valueField": "litres",
        "titleField": "country"
    });
}

/*-------------- 1 Pie chart amchart end ------------*/

/*-------------- 2 Pie chart amchart start ------------*/
if (document.getElementById('ampiechart2')) {
    var chart = AmCharts.makeChart("ampiechart2", {
        "type": "pie",
        "theme": "light",
        "labelRadius": -65,
        "labelText": "[[title]]%",
        "dataProvider": [{
            "title": "New",
            "value": 4852
        }, {
            "title": "Returning",
            "value": 9899
        }],
        "titleField": "title",
        "valueField": "value",
        "export": {
            "enabled": false
        },
        "color": "#fff"
    });
}
/*-------------- 2 Pie chart amchart end ------------*/

/*-------------- 3 Pie chart amchart start ------------*/
var chart;
var legend;
var selected;

var types = [{
    type: "Fossil Energy",
    percent: 70,
    color: "#ff9e01",
    subs: [{
        type: "Oil",
        percent: 15
    }, {
        type: "Coal",
        percent: 35
    }, {
        type: "Nuclear",
        percent: 20
    }]
}, {
    type: "Green Energy",
    percent: 30,
    color: "#6E4FD1",
    subs: [{
        type: "Hydro",
        percent: 15
    }, {
        type: "Wind",
        percent: 10
    }, {
        type: "Other",
        percent: 5
    }]
}];

function generateChartData() {
    var chartData = [];
    for (var i = 0; i < types.length; i++) {
        if (i == selected) {
            for (var x = 0; x < types[i].subs.length; x++) {
                chartData.push({
                    type: types[i].subs[x].type,
                    percent: types[i].subs[x].percent,
                    color: types[i].color,
                    pulled: true
                });
            }
        } else {
            chartData.push({
                type: types[i].type,
                percent: types[i].percent,
                color: types[i].color,
                id: i
            });
        }
    }
    return chartData;
}

if (document.getElementById('ampiechart3')) {
    AmCharts.makeChart("ampiechart3", {
        "type": "pie",
        "theme": "light",
        "labelRadius": -35,
        "labelText": "[[percents]]%",
        "dataProvider": generateChartData(),
        "balloonText": "[[title]]: [[value]]",
        "titleField": "type",
        "valueField": "percent",
        "outlineColor": "#FFFFFF",
        "outlineAlpha": 0.8,
        "outlineThickness": 2,
        "colorField": "color",
        "color": "#fff",
        "pulledField": "pulled",
        "titles": [{
            "text": "Click a slice to see the details"
        }],
        "listeners": [{
            "event": "clickSlice",
            "method": function(event) {
                var chart = event.chart;
                if (event.dataItem.dataContext.id != undefined) {
                    selected = event.dataItem.dataContext.id;
                } else {
                    selected = undefined;
                }
                chart.dataProvider = generateChartData();
                chart.validateData();
            }
        }],
        "export": {
            "enabled": false
        }
    });
}

/*-------------- 3 Pie chart amchart end ------------*/

/*-------------- 4 Pie chart highcharts start ------------*/
if (document.getElementById('highpiechart4')) {
    var pieColors = (function() {
        var colors = [],
            base = Highcharts.getOptions().colors[0],
            i;

        for (i = 0; i < 10; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(new Highcharts.Color(base).brighten((i - 3) / 7).get());
        }
        return colors;
    }());

    // Build the chart
    Highcharts.chart('highpiechart4', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Dollar market Values, 2018'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                colors: pieColors,
                dataLabels: {
                    style: { "color": "contrast", "fontSize": "11px", "fontWeight": "bold", "textOutline": "" },
                    enabled: true,
                    format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                    distance: -50,
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 4
                    }
                }
            }
        },
        series: [{
            name: 'Share',
            data: [
                { name: 'USD', y: 61.41 },
                { name: 'BTC', y: 11.84 },
                { name: 'TCN', y: 10.85 }
            ]
        }]
    });
}
/*-------------- 4 Pie chart highcharts end ------------*/

/*-------------- 5 Pie chart highcharts start ------------*/
if (document.getElementById('highpiechart5')) {
    Highcharts.chart('highpiechart5', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Dollar market Values, 2018'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#444',
                        "textOutline": ""
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'USB',
                y: 61.41,
                sliced: true,
                selected: true
            }, {
                name: 'BTC',
                y: 11.84
            }, {
                name: 'ETC',
                y: 10.85
            }]
        }]
    });
}

/*-------------- 5 Pie chart highcharts end ------------*/

/*-------------- 6 Pie chart highcharts start ------------*/
if (document.getElementById('highpiechart6')) {
    Highcharts.chart('highpiechart6', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: '<br>Values<br>',
            align: 'center',
            verticalAlign: 'middle',
            y: 40
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -30,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textOutline: 0
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '65%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            innerSize: '55%',
            data: [
                ['USD', 58.9],
                ['BTC', 13.29],
                ['TCN', 13],
                {
                    name: 'Other',
                    y: 7.61,
                    dataLabels: {
                        enabled: false
                    }
                }
            ]
        }]
    });
}
/*-------------- 6 Pie chart highcharts end ------------*/

/*-------------- 7 Pie chart chartjs start ------------*/
if (document.getElementById('seolinechart8')) {
    var ctx = document.getElementById("seolinechart8").getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'doughnut',
        // The data for our dataset
        data: {
            labels: ["FB", "TW", "G+", "INS"],
            datasets: [{
                backgroundColor: [
                    "#8919FE",
                    "#12C498",
                    "#F8CB3F",
                    "#E36D68"
                ],
                borderColor: '#fff',
                data: [810, 410, 260, 150],
            }]
        },
        // Configuration options go here
        options: {
            plugins: {
                legend: {
                    display: true
                }
            },
            animation: {
                easing: "easeInOutBack"
            }
        }
    });
}
/*-------------- 7 Pie chart chartjs end ------------*/