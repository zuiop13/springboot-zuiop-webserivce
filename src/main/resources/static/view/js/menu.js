// 퀵메뉴
function quick(){
    var el = $("#quick"),
        btn = el.find(".quick_btn"),
        speed = 300;

    btn.on("click",function(){
        var t = $(this);

        if(t.next().is(":hidden")){
            t.addClass("on").find(".blind").text("닫기");
            t.next().show();
            t.closest("#quick").stop().animate({right:0}, speed);
        }else{
            t.removeClass("on").find(".blind").text("열기");
            t.closest("#quick").stop().animate({right:"-9.375rem"}, speed, function () {
                t.next().css({display:"none"});
            });
        }
    });
}

// 사이트 맵
function site_map(){
    $(".btn_total").on("click",function(){
        var winW = $(window).width()
        if(winW > 984) {
            $(".html").toggleClass("site_map");
        } else {
        	return false;
        }
    })
}

//PC GNB 메뉴
function gnb(){
    var el = $("#gnb"),
        sub_bg = $(".gnb_bg"),
        dep1_btn = el.find(">ul>li>a"),
        dep2_btn = dep1_btn.next().find(">ul>li>a"),
        dep3_btn = dep2_btn.next().find(">li>a"),
        sub = dep1_btn.next(),
        speed = 300,
        easing = "easeInOutCubic",
        gnb_on = el.find(".gnb_on");

    dep1_btn.on("focus mouseenter",function(){
        var winW = $(window).width();
        if(winW > 982){
            var t = $(this),
                subH = t.next().outerHeight(true),
                left_off = t.find("span").offset().left,
                menuW = t.find("span").innerWidth();

            if(t.next().length > 0){
                if(t.next().is(":hidden")){
                    dep1_btn.removeClass("on");
                    sub.stop().fadeOut("fast");
                    t.addClass("on").next().stop().fadeIn(speed, easing);
                    
                    var ps = $(".html").hasClass("site_map");
                    if(!ps){
                        sub_bg.show().stop().animate({height:subH},200,easing);

                        gnb_on.stop().animate({left:left_off, width:menuW},speed,easing);
                    }
                }
            }
            return false
        }
    });

    dep2_btn.on("focus mouseover",function(){
        var winW = $(window).width();
        if(winW > 982) {
            dep2_btn.removeClass("on");
            $(this).addClass("on");

            return false;
        }
    });

    dep3_btn.on("focus mouseover",function () {
        var winW = $(window).width();
        if(winW > 982) {
            dep2_btn.removeClass("on");
            $(this).closest("ul").prev("a").addClass("on");

            return false;
        }
    });

    $("#header_top").on("mouseleave",function(){
        var winW = $(window).width();
        if(winW > 982) {
            el.find("a").removeClass("on");
            sub.stop().fadeOut(100, easing);
            sub_bg.stop().animate({height: 0}, 200, easing, function () {
                sub_bg.hide();
            });
        }
    });
 // gnb 마지막 버튼 포커스 아웃 시 사용자 가이드 버튼으로 포커스 이동
    $("#gnb>ul>li:last>.sub>ul>li:last>a").on("focusout",function () {
        $(".gnb_etcM_box li:first a").focus();
    });

    //GNB서브메뉴 우측 링크 마지막 링크 포커스 아웃 시 헤더 알림, 유저 메뉴로 포커스 이동과 동시에 메뉴 닫힘
    $(".gnb_etcM_box li:last a").on("focusout",function(){
        $("#header_top .etc_menu .link li:first a").focus();
        var winW = $(window).width();
        if(winW > 982) {
            el.find("a").removeClass("on");
            sub.stop().fadeOut(speed, easing);
            sub_bg.stop().animate({height: 0}, 200, easing, function () {
                sub_bg.hide();
            });
        }
    });
}

//모바일 메뉴
var tm = null;
function mobile_gnb(){
    var el = $("#gnb"),
        dep1_btn = el.find(">ul>li>a"),
        dep2_btn = dep1_btn.next().find(">ul>li>a"),
        sub = dep1_btn.next();
    
    $(".btn_total").click(function(){
    var winW = $(window).width();

        if( winW <= 983){
            $('#gnb').show();
            $('#gnb .sub').removeAttr('style');
            $('#gnb .sub').find("ul").prev().addClass('dep');
            $('#gnb .sub').find("ul").prev().attr('href','#a');
            $('#gnb>ul>li:first-child>a').addClass('on');
            $('#gnb>ul>li:first-child>.sub').show();
            $('body').css('overflow','hidden');

            return false;
        }
    });
    

    dep1_btn.on("click",function () {
        var t = $(this);

        console.log($(this));

        dep1_btn.removeClass("on");
        sub.stop().fadeOut("fast");
        t.addClass("on");
        t.next().stop().fadeIn("fast");

        return false;
    });

    dep2_btn.on("click",function () {
        var t = $(this);

        dep2_btn.removeClass("on");
        t.toggleClass("on");

        return false;
    });

    $(".all_close").on("click",function () {
        $("#gnb").fadeOut("fast");
        $("body").css({overflow:"visible",height:"initial"});

        $('#gnb>ul>li>a').removeClass("on");
        $('#gnb .sub>ul>li>a').removeClass("on");
    });

    $(".gnb_bg").removeAttr("style").hide();
}

$(window).on("resize load", function(){
    var winW = $(window).width();

    if(winW < 984 ){
        clearTimeout( tm );
        tm = setTimeout(mobile_gnb,100);
        // mobile_gnb();
        $("#gnb").hide();
    }else if(winW > 983){
        gnb();
        $('#gnb').show();
        $("#gnb .sub").hide();
    }
});

//사용자 메뉴
function userMenu(){
    var btn = $(".login_user");
    var tooltip = $(".user_menu");

    btn.on("click",function(){
        var t = $(this);
        if(t.next().is(":hidden")){
            t.addClass("on").next().show();
        }else{
            t.removeClass("on").next().hide();
        }
        return false;
    });

    $("html").on("click",function(e) {
        if(!$(e.target).parents().hasClass("link")){
            btn.removeClass("on");
            tooltip.hide();
        }
    })
}

//서브상단 검색
function totSch(){
    var btn = $(".search_btn");

    btn.each(function(){
        var t = $(this);

        if(t.hasClass("on")){
            t.next().show();
        }
    });

    btn.on("click",function(){
        var t = $(this);

        if(t.next().is(":hidden")){
            t.find("span").text("CLOSE");
            t.addClass("on").next().fadeIn("fast");
        }else{
            t.find("span").text("SEARCH");
            t.removeClass("on").next().fadeOut("fast");
        }
    });
}

//마이드라이브 좌측메뉴
function myDrive_menu(element){
    var el = $(element),
        dep1Btn = el.find(">li>a"),
        dep2 = el.find(">li>.subM"),
        dep2Btn = dep2.find(">ul>li>a"),
        dep3 = dep2.find(">ul>li>ul"),
        dep3Btn = dep3.find(">li>a"),
        speed = 300;

    dep1Btn.each(function(){
        var t = $(this);

        if(t.hasClass("on")){
            t.next().show();
            t.parent().addClass("on");
        }

        if(!t.next().length){
            t.parent().addClass("empty");
        }
    });

    dep2Btn.each(function(){
        var t = $(this);

        if(t.hasClass("on")){
            t.closest(".subM").show().prev().addClass("on");
        }
    });

    dep3Btn.each(function(){
        var t = $(this);

        if(t.hasClass("on")){
            t.closest("ul").prev().addClass("on");
            t.closest("ul").closest(".subM").show().prev().addClass("on");
        }
    });

    dep1Btn.on("click",function () {
        var t = $(this);
        dep1Btn.removeClass("on");
        dep1Btn.parent().removeClass("on");
        t.addClass("on");
        t.parent().addClass("on");
        dep2.slideUp(speed);

        if(t.next().length){
            if(t.next().is(":hidden")){
                dep1Btn.removeClass("on");
                dep1Btn.parent().removeClass("on");
                dep2.slideUp(speed);
                t.addClass("on").next().slideDown(speed);
                t.parent().addClass("on");
            }else{
                t.removeClass("on").next().slideUp(speed);
                t.parent().removeClass("on");
            }
        }
    });

    dep2Btn.on("click",function(){
        var t = $(this);

        if(t.next().length){
            /*if(t.next().is(":hidden")){
                t.addClass("on").next().slideDown(speed);
            }else{
                t.removeClass("on").next().slideUp(speed);
            }*/
            return false;
        }else{
            dep2Btn.removeClass("on");
            dep3Btn.removeClass("on");
            t.addClass("on");
        }
    });

    dep3Btn.on("click",function(){
        var t = $(this);

        dep2Btn.removeClass("on");
        dep3Btn.removeClass("on");
        t.addClass("on").closest("ul").prev().addClass("on");
    });
}

//마이드라이브 좌측메뉴(모바일)
function myDrive_moMenu() {
    var btn = $(".mo_myDmenu");
    var menu = $(".n_myDrive_menu>ul");

    btn.on("click",function () {
        var t = $(this);
        var tmenu = t.next().find(".n_myDrive_menu>ul");
        if(tmenu.is(":hidden")){
            t.addClass("on").find("span").text("닫기");
            tmenu.slideDown("fast");
        }else{
            t.removeClass("on").find("span").text("열기");
            tmenu.slideUp("fast");
        }
    });

    $(window).on("resize",function(){
        var winW = $(window).width();

        if(winW > 769){
            menu.show();
        }else{
            menu.hide();
        }
    });
}

//마이드라이브 높이 재조정
function myD_left(){
    // var myD_height = $(window).innerHeight() - $(".header_wrap").height();
    var myD_height = $(".n_myDrive_content").height();
    var leftMenu = $(".n_myDrive_left");

    leftMenu.height(myD_height);
}

//마이드라이브(상세 첨부파일 목록 show/hide
function myD_slide() {
    var btn = $(".myD_f, .myD_dtl");

    btn.on("click",function () {
        var t = $(this);
        var t_item = t.closest("tr").next(".myD_item");

        if(t_item.is(":hidden")){
            t_item.show();
            t.closest("tr").addClass("on").find(".myD_f").addClass("on");
        }else{
            t_item.hide();
            t.closest("tr").removeClass("on").find(".myD_f").removeClass("on");
        }
        return false;
    });
}

//마이드라이브 전체선택
function myD_allChk() {
    var allChk = $("#allChk");
    var chk = $(".aChk");

    allChk.on("click",function () {
        if($(this).is(":checked")){
            $(this).closest("thead").next("tbody").find("input[type=checkbox]").prop("checked",true);
        }else{
            $(this).closest("thead").next("tbody").find("input[type=checkbox]").prop("checked",false);
        }
    });

    chk.on("click",function(){
        var t_chk = $(this).closest("tbody").find("input[type=checkbox]");
        var t_chkC = $(this).closest("tbody").find("input[type=checkbox]:checked");

        if(t_chk.length > t_chkC.length){
            allChk.prop("checked",false);
        }else if(t_chk.length == t_chkC.length){
            allChk.prop("checked",true);
        }
    });
}

/* 실행부 */
$(function(){
	site_map() //사이트맵
    quick();    //퀵메뉴
    userMenu(); //사용자메뉴
    totSch(); //서브상단 검색
});