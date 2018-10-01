/*--------------  coin distrubution chart END ------------*/
if ($('#coin_distribution').length) {

    zingchart.THEME = "classic";

    var myConfig = {
        "globals": {
            "font-family": "Roboto"
        },
        "graphset": [{
                "type": "pie",
                "background-color": "#fff",
                "legend": {
                    "background-color": "none",
                    "border-width": 0,
                    "shadow": false,
                    "layout": "float",
                    "margin": "auto auto 16% auto",
                    "marker": {
                        "border-radius": 3,
                        "border-width": 0
                    },
                    "item": {
                        "color": "%backgroundcolor"
                    }
                },
                "plotarea": {
                    "background-color": "#FFFFFF",
                    "border-color": "#DFE1E3",
                    "margin": "25% 8%"
                },
                "labels": [{
                    "x": "45%",
                    "y": "47%",
                    "width": "10%",
                    "text": "340 Coin",
                    "font-size": 17,
                    "font-weight": 700
                }],
                "plot": {
                    "size": 70,
                    "slice": 90,
                    "margin-right": 0,
                    "border-width": 0,
                    "shadow": 0,
                    "value-box": {
                        "visible": true
                    },
                    "tooltip": {
                        "text": "%v USD",
                        "shadow": false,
                        "border-radius": 2
                    }
                },
                "series": [{
                        "values": [1355460],
                        "text": "Bitcoin",
                        "background-color": "#4cff63"
                    },
                    {
                        "values": [1585218],
                        "text": "LiteCoin",
                        "background-color": "#fd9c21"
                    },
                    {
                        "values": [1064598],
                        "text": "Euthorium",
                        "background-color": "#2c13f8"
                    }
                ]
            }

        ]
    };

    zingchart.render({
        id: 'coin_distribution',
        data: myConfig,
    });
}
/*--------------  coin distrubution chart END ------------*/

/*-------------- 1 Pie chart amchart start ------------*/
if ($('#ampiechart1').length) {
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
if ($('#ampiechart2').length) {
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

if ($('#ampiechart3').length) {
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
if ($('#highpiechart4').length) {
    var pieColors = (function() {
        var colors = [],
            base = Highcharts.getOptions().colors[0],
            i;

        for (i = 0; i < 10; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
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
if ($('#highpiechart5').length) {
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
if ($('#highpiechart6').length) {
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
if ($('#seolinechart8').length) {
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
            legend: {
                display: true
            },
            animation: {
                easing: "easeInOutBack"
            }
        }
    });
}
/*-------------- 7 Pie chart chartjs end ------------*/