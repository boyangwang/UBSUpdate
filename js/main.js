function toDetailScreen(e) {
	console.log('in to detail screen');
	var serial = $(this).attr('data-serial');
	var html = loadTemplate('templates/article-' + serial + '.html');
	var detail = Handlebars.compile(html);
	$('.titles-div').hide("slide", { direction: "left" }, 300);
	$('.details-div').append(detail());
	$('.details-div').show("slide", { direction: "right" }, 600);
	$('.back-button').addClass('isDetail');
}

function backToHome(e) {
	if (!$(this).hasClass('isDetail')) {
		return false;
	}
	$('.details-div').hide("slide", { direction: "right" }, 300);
	$('.titles-div').show("slide", { direction: "left" }, 600);
	$(this).removeClass('isDetail');
}

function loadTemplate(path) {
	var html = '';
	$.ajax({
        url: path,
        cache: true,
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
