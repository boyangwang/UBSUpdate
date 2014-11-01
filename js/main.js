function toDetailScreen(e) {
	console.log('in to detail screen');
	var serial = $(this).attr('data-serial');
	var html = loadTemplate('templates/article-' + serial + '.html');
	var detail = Handlebars.compile(html);
	
	$('.titles-div').hide("slide", { direction: "left" }, 200);

	$('.details-div').empty();
	$('.details-div').append(detail);
	var newArticleBody = $('<div class="article_body"  itemprop="articleBody">');
	$('.article_body p').each(function(idx, value) {
		var row = $('<div class="row">');
		var col11 = $('<div class="col-xs-10" style="margin: 0px; padding: 0px;";>');
		var col1 = $('<div class="col-xs-2" style="margin: 0px ;padding: 0px !important;">');
		row.append(col11).append(col1);
		col11.append(value);
		var chatbox = $('<img class="unopened-chatbox" src="img/MessageBubble.png">');
		col1.append(chatbox);
		newArticleBody.append(row);
	});
	$('.article_body').replaceWith(newArticleBody);
	
	var insights = createInsights();
	$('.details-div').append(insights);

	
	$('.details-div').show("slide", { direction: "right" }, 400);
	$('.back-button').addClass('isDetail');
	$('.unopened-chatbox').on('click', function(e) {

		$(this).css('opacity', '1');
		var speechBubble = $('<textarea class="speech-bubble" rows="4" cols="20" style="font-size: 12pt;font-family: Arial; line-height: 1.0;">');
		(speechBubble.appendTo($(this).parent()));
		$.scrollTo(speechBubble, 100, {axis:'x'});
		speechBubble.on('blur', function(e) {
			$(this).before($('<img src="img/1comment.png" class="1-comment" style="height: 32px;">'));
			$(this).hide(200);			
			$('.unopened-chatbox').css('opacity', '0.2');
			swal({  text: "Your comment has been sent to your UBS Wealth Manager", title:"", confirmButtonText: "OK", type: "info"});
		});
	});

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
