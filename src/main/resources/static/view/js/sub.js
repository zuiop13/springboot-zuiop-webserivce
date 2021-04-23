// 연혁
function textHeight(){
	var content = $(".dh_right p");
	
	content.each(function(){
        var t = $(this);
    		/*$(".dh_content_wrap > img").height();*/
		if(t.height() > 160){
			t.parent().addClass("ibt");
		} 
	})
	
	$(".dh_content.ibt > i").on("click",function(){
		$(this).toggleClass('on').siblings('p').toggleClass('on')
	})
}


//슬라이드 박스(언어선택 등)
function slideBox(){
    var parent = $(".slide_box"),
        btn = parent.find("a");

    btn.each(function(){
        var t = $(this);

        if(t.hasClass("on")){
            t.find("span").text("CLOSE");
            t.next().show();
        }
    });

    btn.on("click",function () {
        var t = $(this);

        if(t.next(".slide_item").is(":hidden")){
            t.find("span").text("CLOSE");
            t.addClass("on").next().slideDown("fast", "easeOutCubic");
        }else{
            t.find("span").text("OPEN");
            t.removeClass("on").next().slideUp("fast", "easeOutCubic");
        }
        return false;
    });
}

// 이메일 직접입력 및 선택입력
function email() {
    var sel = $(".email_sel");

    sel.on("change",function(){
        $(".email_sel option:selected").each(function () {
            if($(this).val() == '1'){
                $(this).parent().siblings(".email_addr").val('');
                $(this).parent().siblings(".email_addr").attr("disabled",false);
            }else{
                $(this).parent().siblings(".email_addr").val($(this).text());
                $(this).parent().siblings(".email_addr").attr("disabled",true);
            }
        });
    });
}

// 달력(Datepicker)
$(function () {
    $('.dateBox').datepicker({
        showButtonPanel: true,
        changeYear: true,
        changeMonth: true,
        dayNames: ['월요일','화요일','수요일','목요일','금요일','토요일','일요일'],
        dayNamesMin: ['월','화','수','목','금','토','일'],
        monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        currentText: '오늘',
        rightText: '다음달',
        leftText: '이전달',
        closeText: '닫기',
        dateFormat: "yy-mm-dd"
    });
    $('.dateBox').datepicker("setDate", new Date());
});

//모달창
$(function () {
    $('[rel^="modal"]').click(function(event) {
        $(this).modal({
            fadeDuration:150
        });
        return false;
    });

    //tip 모달 (닫기)
    $(".tip_close").on("click",function(){
        var t = $(this);

        t.closest(".tip_layer").fadeOut("fast");
    });
});

//데이터등록 상단 탭
function data_tab(){
    var el = $(".data_tabMenu");
    var btn = el.find(">li>a");

    btn.each(function(){
        var t = $(this);
        var tabH = t.outerHeight(true) + t.next().outerHeight(true);

        if(t.hasClass("on")){
            btn.attr("title","비활성 메뉴");
            t.attr("title","활성 메뉴").next().show();
            el.height(tabH);
        }
    });

    btn.on("click",function(){
        var t = $(this);
        var tabH = t.outerHeight(true) + t.next().outerHeight(true);

        if(t.next().is(":hidden")){
            btn.attr("title","비활성 메뉴").removeClass("on").next().hide();
            t.attr("title","활성 메뉴").addClass("on").next().show();
            el.height(tabH);
        }
        return false;
    });
}
//데이터 등록

function dataLink(){
    var stepItem = $(".step_guide li");
    var stepItemL = stepItem.length;
    stepItem.width(100/stepItemL+"%");
}

//통합검색(조건검색) 펼치기
function schSlide(){
    var btn = $(".facetBtn");

    btn.on("click",function(){
        var t = $(this);

        if(!t.hasClass("on")){
            t.text("닫기").addClass("on").parent().prev().addClass("on");
            t.parent().prev(".list").addClass("on");
        }else{
            t.text("펼치기").removeClass("on").parent().prev().removeClass("on");
            t.parent().prev(".list").removeClass("on");
        }
        return false;
    });
}

//북마크
function bookmark(){
    var btn = $(".bookMark_in");

    btn.on("click",function(){
        $(this).toggleClass("on");
        //height_chk()
        return false;
    });
}

//회원가입_구분
$(function(){
    /*$('input[type=radio]').click(function(){
        if (this.previous) {
            this.checked = false;
        }
        this.previous = this.checked;
    });*/
    $(".join_info").on('click',function(){
        $(this).toggleClass('active');
    })
});

//통합검색(조건검색) 레이어 전체선택
function layer_allChk(){
    var btn = $(".allChk");

    btn.on("click",function(){
        var t = $(this);
        t.closest(".layer_content").find(".schChk_list input[type=checkbox]").prop("checked", true);
    });
}

// 리스트 페이지 체크박스 토글
function group_chk(){
    $(".chk label").on('click',function(){
        $(this).toggleClass("active");
    })
}

//페이징 처리
function paging() {
	var pagingL = $(".board_pager ul li").length;
	var lastPage = pagingL-3;
	var usePage = $(".page-item .page-link > span").eq(lastPage).text().length;

	if (usePage >= 4) {
	   $(".page-item .page-link > span").addClass("small_texting");
	}
}

function statSelect(){
    $(".stat_select ul li > a").on('click',function(){
        $(this).parent().addClass('on').siblings().removeClass('on');
    })
}
function selectToggle() {
    $("#all").on('click',function(){
        $(this).toggleClass("select");
            if($("#all").hasClass('select')===true){
                $("input[name=box]").each(function() {
                    $('input[name=box]:checkbox').prop('checked',function(){});
                $(this).prop("checked", true);
            });
            } else if ($("#all").hasClass('select')===false){
                $("input[name=box]").each(function() {
                    $('input[name=box]:checkbox').prop('checked',function(){});
                $(this).prop("checked", false);
            });
        }
    })
}

function title_tab_toggle(){
	$(".title_tab").on('click',function(){
		$(this).addClass("on").parent().siblings().children().removeClass("on");
		title_tab();
	})
}

function title_tab() {
	if($(".title_tab_local").hasClass("on")){
		$(".myDfu_local").addClass("on").siblings().removeClass("on");
	} else {
		$(".myDfu_url").addClass("on").siblings().removeClass("on");
	}
}

function rst_count_more() {
	$(".rst_count_more").on('click',function(){
		$(this).parent().parent().toggleClass("on");
	})
}

function rst_content(){
	$(".item.title ul li .look").on('click', function(){
		$(this).addClass("on").parent().siblings().children().removeClass("on").parent().parent().parent().parent().parent().addClass("look").removeClass("meta");
	})
	
	$(".item.title ul li .meta").on('click', function(){
		$(this).addClass("on").parent().siblings().children().removeClass("on").parent().parent().parent().parent().parent().addClass("meta").removeClass("look");
	})
}
/* 실행부 */
$(function(){
	rst_content()
	rst_count_more()
    selectToggle();
    statSelect();
//	myD_trList();
    slideBox();
    email();

    $(window).on("resize",function(){
        data_tab();
    });
    data_tab();
    schSlide();
    bookmark();

    title_tab();
	$(window).ready(function(){
        //height_chk();
        var winW = $(window).width();
        if(winW >= 1050) {
            dataLink();
        } else {
            return false;
        }
    })
    group_chk();
    paging();
	textHeight();
});