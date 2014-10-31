function toDetailScreen(e) {
	console.log('in to detail screen');
	var serial = $(this).attr('data-serial');
	var html = loadTemplate('templates/article-' + serial + '.html');
	var detail = Handlebars.compile(html);
	
	$('.details-div').empty();
	$('.details-div').append(detail);

	var insights = createInsights();
	$('.details-div').append(insights);

	$('.titles-div').hide("slide", { direction: "left" }, 200);
	$('.details-div').show("slide", { direction: "right" }, 400);
	$('.back-button').addClass('isDetail');
}

function createInsights() {
	var insights = $('<div class="insights"><img src="./img/UBS-logo.png" height="50px" class="logo"></img><span class="updates">Insights</span></div>');
	var social = Handlebars.compile(loadTemplate('templates/social.html'));
	var economy = Handlebars.compile(loadTemplate('templates/economy.html'));
	var analytics = Handlebars.compile(loadTemplate('templates/analytics.html'));
	var relatedlinks = Handlebars.compile(loadTemplate('templates/relatedlinks.html'));
	var companyoverview = Handlebars.compile(loadTemplate('templates/companyoverview.html'));
	insights.append(companyoverview);
	insights.append(analytics);
	insights.append(social);
	insights.append(economy);
	insights.append(relatedlinks);

	return insights;
}

function backToHome(e) {
	if (!$(this).hasClass('isDetail')) {
		return false;
	}
	$('.details-div').hide("slide", { direction: "right" }, 200);
	$('.titles-div').show("slide", { direction: "left" }, 400);
	$(this).removeClass('isDetail');
}

function loadTemplate(path) {
	var html = '';
	$.ajax({
        url: path,
        success: function (data) {
            html = data;
        },
        async: false
    });
    return html;
}

$('.back-button').on('click', backToHome);
$('.title').on('click', toDetailScreen);
var isHome = true;
