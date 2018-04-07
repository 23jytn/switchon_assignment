$(document).ready(function () {

    // initialize data
    var initial_url = "http://localhost:8000/api/sensors?start=0&limit=20";

    var chart1 = null;

    var chart2 = null;
    $.getJSON(initial_url, function (data) {
        var temperature_data = [];
        var rh_data = [];
        var ah_data = [];
        $.each(data, function (index, element) {
            var item = element.fields;
            var timestamp = new Date(item.timestamp * 1000);
            temperature_data.push({
                x: timestamp,
                y: item.temperature
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
            var updateUrl = "http://localhost:8000/api/sensors?start=" + currentPage + "&limit=1";
            currentPage++;
            $.getJSON(updateUrl, function (element) {
                var data = element[0].fields;
                var chart1Data = chart1.data.series[0].data;
                chart1Data.shift();

                chart1Data.push({
                    x: new Date(data.timestamp * 1000),
                    y: data.temperature
                });

                chart1.update();

                var chart2Data = chart2.data.series[0].data;
                chart2Data.shift();

                chart2Data.push({
                    x: new Date(data.timestamp * 1000),
                    y: data.relative_humidity
                });

                chart2.update();
            });
        }
    }, 1000);







});