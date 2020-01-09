/* CSS??????? */
/* ----------------------------------------------------- */
var css_browser_selector = function() {
	var 
		ua=navigator.userAgent.toLowerCase(),
		is=function(t){ return ua.indexOf(t) != -1; },
		h=document.getElementsByTagName('html')[0],
		b=(!(/opera|webtv/i.test(ua))&&/msie (\d)/.test(ua))?('ie ie'+RegExp.$1):is('gecko/')? 'gecko':is('opera/9')?'opera opera9':/opera (\d)/.test(ua)?'opera opera'+RegExp.$1:is('konqueror')?'konqueror':is('applewebkit/')?'webkit safari':is('mozilla/')?'gecko':'',
		os=(is('x11')||is('linux'))?' linux':is('mac')?' mac':is('win')?' win':'';
	var c=b+os+' js';
	h.className += h.className?' '+c:c;
}();

/* ----------------------------------------------------- */
/* jquery ??????*/
/* ----------------------------------------------------- */
$(function(){

	/* a??????????????????+???? */
	/* ----------------------------------------------------- */
	$('a').focus(
		function(){
		this.blur();
	});

	/* ????Call */
	/* ----------------------------------------------------- */
	
		/* NEW?????????(?????) */
		newMark('#news-col div.topics dt');
		
		/* ?????????????????? */
		SwapImg('#thum a','#main-pic');		
		
		/* ???????????????????????????? */
		setNum('#detail-wrap a.to-res','#product_id');
		
		/* ????????? */
		popupWindow('a.to-pop',780,650);
		
		/* ?????????????????? */
		SwapImg('.d_pic-list a','.d_pic');	
		
		
		
	/* ???????????????????????????????????????????????????????????????????? */
	/* ----------------------------------------------------- */
	var activeObj ='#g-'+ $('body').attr('id');
	if($('#g-nav li').filter(activeObj).size()==1){
		$activeObj = $(activeObj).find('a:first img');
		$activeObj.removeClass('over');
		var src = $activeObj.attr('src');
		var ftype = src.substring(src.lastIndexOf('.'), src.length);
		var hsrc = src.replace(ftype, '-o'+ftype);
		$activeObj.attr('src', hsrc);
	}
	
	/* ????????????? */
	/* ----------------------------------------------------- */
	$('img.over').not('[src*="-o."]').hover(function()
	{
		Rollover($(this),$(this).attr('src'));	
	},function() {
		Rollover($(this),$(this).attr('src'));	
	});	

	/* ???????????????? */
	/* ----------------------------------------------------- */
  $('a[href^=#]').click(function(event) {
    var hash = this.hash;
		if(hash!==''){
			var tarPosition = $(hash).offset().top;
			if(undefined !== window.opera && "function" === typeof window.opera.version){ // opera
				$('html').animate({scrollTop: tarPosition}, 400, 'easeOutQuad'); 
			}
			else{
				$('html, body').animate({scrollTop: tarPosition}, 400, 'easeOutQuad');
			}
			return false;
		}
  });
  

	/* ???????????????????????k */
	/* ----------------------------------------------------- */
	$('#cls').click(function(){
		window.close();
	});
	
	/* ??????? */
	/* ----------------------------------------------------- */
	$("form input[type=text],form textarea").focus(function(){
		$(this).addClass('focus');															
  });
	$("form input[type=text],form textarea").blur(function(){
		$(this).removeClass('focus');															
  });

	/* addclass */
	/* ----------------------------------------------------- */
	$('div.s-nav ul.children li').addClass('accordion');
	$('#header div.wrap li:last-child').addClass('last-c');
	$('#news-col .topics dl:last').addClass('last');
	$('#side-wrap .s-nav li:last-child').addClass('last-c');
	$('#main table.common-table02 tr:first-child th:first-child').addClass('first-c');
	$('#main table.common-table02 tr:first-child th:last-child').addClass('last-c');
	$('#main table.common-table02').each(function(){
			$('tr',$(this)).each(function(i){
			var obj = $(this);
			if(i===0){
				size = $('th',obj).size();
			}
			if($('td',obj).size()>=size){
				$('td:last-child',obj).addClass('last-c');
			}
		});
	});

	$('#main div.course-route dd dd:last-child').addClass('last-c');
	
	$('#sitemap li:first').addClass('first');
	$('#sitemap li:last-child').addClass('close');
	
	/* ??????????????????????????????? */
	/* ----------------------------------------------------- */
	$(document).ready(function(){   
	//?????????????????????jQuery??????????v??????????1??r???  
	$('div.s-nav > ul > li').children('a').removeAttr('href');  
	//?????????????????????jQuery??????????v??????????1??r???  
	$('div.s-nav > ul > li > ul > li').children('a').removeAttr('href');  
	//??????????????  
	$('div.s-nav .children > li > .children ').hide();  
	$('div.s-nav > ul >li > ul > li').click(function(){  
		$(this).children('ul').show('slow');  
		$('div.s-nav ul ul ul').not($(this).children('ul')).hide('slow');  
	});  
}); 

});



/* ----------------------------------------------------- */
/*??????????????????????*/
/* ----------------------------------------------------- */
jQuery.easing.easeOutQuad = function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
};
	
/* ----------------------------------------------------- */
/*?????????????????*/
/* ----------------------------------------------------- */
var Rollover = function(obj,thisSrc) {
	/* ??????? */
	var sTempSrc = thisSrc;
	var ftype = thisSrc.substring(thisSrc.lastIndexOf('.'), thisSrc.length);
	var hsrc = thisSrc.replace(ftype, '-o'+ftype);	
	var aPreLoad = new Image();

	/* ????????? */
	aPreLoad.src = hsrc;

	re = new RegExp('-o[\.]');
	
	if(!sTempSrc.match(re)){
		$(obj).attr('src', hsrc);
	}
	
	if (sTempSrc.match(re)) {
		sTempSrc = $(obj).attr('src').replace('-o'+ftype, ftype);
		$(obj).attr('src', sTempSrc);
	}
}


/* ----------------------------------------------------- */
/* ????new?????*/
/* ----------------------------------------------------- */
var newMark = function(obj){
	$(obj).each(function(){
		var year = $(this).text().split('.')[0];
		var month = $(this).text().split('.')[1];
		var day = $(this).text().split('.')[2];
		var objDate = new Date(year,month-1,day);
		var nowDate = new Date();
    myDay = Math.floor((nowDate.getTime()-objDate.getTime()) / (1000*60*60*24)) + 1;
    //??@2???????????"new!"?????
    if (myDay < 15 ){
			$(this).parent().find('dt').append('<span class="new">&nbsp;</span>');
    }
	});
}

/* ----------------------------------------------------- */
/*???????????????????*/
/* ----------------------------------------------------- */
var PreLoad = function(tar){
	$(tar).each(function(i){               
		var PreLoad = new Image();
		var src = $(this).attr('src');
		var ftype = src.substring(src.lastIndexOf('.'), src.length);
		var hsrc = src.replace(ftype, '-b'+ftype);
		PreLoad[i] = new Image();
		PreLoad[i].src = hsrc;
	});
}

/* ----------------------------------------------------- */
/*?????????*/
/* ----------------------------------------------------- */
var SwapImg = function(href,mainImg){
	/* ????????? */
	$(href).each(function(i){				
		var siPreLoad = new Array();
		var src = $(this).attr('href');
		siPreLoad[i] = new Image();
		siPreLoad[i].src = src;
	});
	/* ??????? */
	$(href).click(function(){
		src = $(this).attr('href');
		$(mainImg).find('img').attr('src',src);
		return false;
	});
}

/* ----------------------------------------------------- */
/* ????????????????????? */
/* ----------------------------------------------------- */
var popupWindow = function(tar,w,h,windowName){
	$(tar).click(function(){
		var Loc = $(this).attr('href');
		var features="scrollbars=yes,resizable=yes";
		features+=", left="+(window.screen.width-w)/2;
		features+=", top="+(window.screen.height-h)/2;
		features+=", width="+w;
		features+=", height="+h;
		var newWin=window.open(Loc,windowName,features);
		newWin.focus();
		return false;
	});
}

/* ----------------------------------------------------- */
/*?????????*/
/* ----------------------------------------------------- */
var SwapImg = function(href,mainImg){
	/* ????????? */
	$(href).each(function(i){				
		var siPreLoad = new Array();
		var src = $(this).attr('href');
		siPreLoad[i] = new Image();
		siPreLoad[i].src = src;
	});
	/* ??????? */
	$(href).click(function(){
		src = $(this).attr('href');
		$(mainImg).find('img').attr('src',src);
		return false;
	});
}

/* ----------------------------------------------------- */
/* ?????????? */
/* ----------------------------------------------------- */
var setNum = function(obj,Num){
	$(obj).click(function(){
		var Insert_No = new Array();
		var Parameter = new Array();	
		Parameter[0] = "No_Name";
		var Str,Target,Value;
		var Set_Url ="";
		Value = "";
		URL =$(this).attr("href");
		Str = $(Num).text();
		Value += Str;
		Set_Url += "?" +Parameter[0]  + "=" + escape(Value);
		URL = URL + Set_Url;
		$(this).attr("href",URL)
	});
}

/* ----------------------------------------------------- */
/* ??????????????????? */
/* ----------------------------------------------------- */
$(function() {
	$('.fadein').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if(isInView){
			if (visiblePartY == 'both' || visiblePartY == 'bottom') {
				$(this).stop().addClass('fadein_on');
			}
		}
	});
	$('.fadeinDown').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if(isInView){	
			if (visiblePartY == 'both' || visiblePartY == 'bottom') {
				$(this).stop().addClass('fadeinDown_on');
			}
		}
		/*else{
			$(this).stop().removeClass('panMove');
		}*/
	});
	$('.slideinRight').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if(isInView){
			if (visiblePartY == 'both' || visiblePartY == 'bottom') {
				$(this).stop().addClass('slideinRight_on');
			}
		}
		/*else{
			$(this).stop().removeClass('panMove');
		}*/
	});
	$('.slideinLeft').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if(isInView){
			if (visiblePartY == 'both' || visiblePartY == 'bottom') {
				$(this).stop().addClass('slideinLeft_on');
			}
		}
		/*else{
			$(this).stop().removeClass('panMove');
		}*/
	});
	$('.slideLine').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if(isInView){
			if (visiblePartY == 'both' || visiblePartY == 'bottom') {
				$(this).stop().addClass('slideLine_on');
			}
		}
		/*else{
			$(this).stop().removeClass('panMove');
		}*/
	});

});