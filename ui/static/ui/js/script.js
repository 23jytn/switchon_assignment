$(document).ready(function () {

    // initialize data
    var initial_url = "http://localhost:3000/sensors?_page=1&_limit=100";

    var chart1 = null;

    var chart2 = null;
    $.getJSON(initial_url, function (data) {
        var temperature_data = [];
        var rh_data = [];
        var ah_data = [];
        $.each(data, function (index, item) {
            var timestamp = new Date(item.timestamp * 1000);
            temperature_data.push({
                x: timestamp,
                y: item.temprature
            });

            rh_data.push({
                x: timestamp,
                y: item.relative_humidity
            })

            ah_data.push({
                x: timestamp,
                y: item.absolute_humidity
            })
        });

        chart1 = new Chartist.Line('.temp-chart', {
            series: [{
                name: 'temperature',
                data: temperature_data
            }]
        }, {
            axisX: {
                showLabel: false,
                showGrid: false
            }
        });


        chart2 = new Chartist.Line('.humidity-chart', {
            series: [{
                name: 'relative_humidity',
                data: rh_data
            }]
        }, {
            axisX: {
                showLabel: false,
                showGrid: false
            }
        });


    });



    var currentPage = 50;

    setInterval(function () {

        if (chart1 !== null && chart2 !== null) {
            var updateUrl = "http://localhost:3000/sensors?_start=" + currentPage + "&_limit=1";
            currentPage++;
            $.getJSON(updateUrl, function (data) {
                var chart1Data = chart1.data.series[0].data;
                chart1Data.shift();

                chart1Data.push({
                    x: new Date(data[0].timestamp * 1000),
                    y: data[0].temprature
                });

                chart1.update();

                var chart2Data = chart2.data.series[0].data;
                chart2Data.shift();

                chart2Data.push({
                    x: new Date(data[0].timestamp * 1000),
                    y: data[0].relative_humidity
                });

                chart2.update();
            });
        }
    }, 1000);







});