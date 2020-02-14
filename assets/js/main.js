$(window).on('load', function() {

    $('.level-bar-inner').each(function() {

        var itemWidth = $(this).data('level');

        $(this).animate({
            width: itemWidth
        }, 800);

    });

});


jQuery(document).ready(function($) {


    /*======= Skillset *=======*/

    $('.level-bar-inner').css('width', '0');



    /* Bootstrap Tooltip for Skillset */
    $('.level-label').tooltip();


    /* Github Calendar - https://github.com/IonicaBizau/github-calendar */
    new GitHubCalendar("#github-graph", "leandrocorreasantos", {"responsive": true});


    /* Github Activity Feed - https://github.com/caseyscarborough/github-activity */
    GitHubActivity.feed({ username: "leandrocorreasantos", selector: "#ghfeed" });

    function name_to_color(name_item){
        var color = '';
        var red, green, blue = '';
        red = parseInt(name_item.charCodeAt(0)/10).toString(16);
        green = parseInt(name_item.charCodeAt(1)/10).toString(16);
        blue = parseInt(name_item.charCodeAt(2)/10).toString(16);
        if (green == 'NaN'){
            green = '0';
        }
        if (blue == 'NaN'){
            blue = 'f';
        }
        color = '#'+red+green+blue;
        return color;
    }


    /* skill by wakatime */
    $.ajax({
        type: 'GET',
        url: 'https://wakatime.com/share/@dc4fa62f-3b77-4284-87e1-1687b7e0495f/31800068-d985-465c-9f4e-fd221f8c1311.json',
        dataType: 'jsonp',
        success: function(response) {
            var skills = $('div#skillset_list');
            var canvas_item = $('canvas#bar-chart-horizontal');
            var skill_label = [];
            var skill_data = [];
            var skill_color = [];
            var name = '';
            var color = '';
            $.each(response.data, function(i, item){
                var percent = parseFloat(item.percent);
                if (percent >= 0.8){
                    if(item.name != 'Other'){
                        skill_label.push(item.name);
                        skill_data.push(item.percent);
                        color = name_to_color(item.name);
                        skill_color.push(color);
                    }
                }
            });

            new Chart(document.getElementById("bar-chart-horizontal"), {
                type: 'pie',
                data: {
                    label: 'Linguagens de Programação',
                    datasets: [{
                        data: skill_data,
                        backgroundColor: skill_color,
                        label: 'Linguagens'
                    }],
                    labels: skill_label,
                },
                options:{
                    legend: {
                        display:true
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var index = tooltipItem.index;
                                tooltipItem.yLabel = data.labels[index];
                                return tooltipItem.yLabel;
                            }
                        }
                    }
                }
            });
        },
    });

});
