/*function main_fullpage(){
    var myFullpage = new fullpage('#main_Contents', {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        anchors: ['section1', 'section2', 'section3', 'section4'],
        autoScrolling:true,
        scrollHorizontally:true,
        scrollBar:true,
        resize:true,
        verticalCentered: true,
        responsiveWidth:1000,
        menu:".section_menu",
        paddingTop:"5.25rem",
        afterLoad: function(anchor, index){
            $('.fp-section.active').addClass('effect');
        }
    });
}*/

function main_fullpage(){
	
	var winW = $(window).width();
	    if(winW >= 982) {
	    var myFullpage = new fullpage('#main_Contents', {
	        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
	        anchors: ['section1', 'section2', 'section3', 'section4'],
	        autoScrolling:true,
	        scrollHorizontally:true,
	        scrollBar:true,
	        resize:true,
	        verticalCentered:true,
	        responsiveWidth:1000,
	        menu:".section_menu",
	        paddingTop:"5.25rem",
	        normalScrollElements:"#footer",
	        afterLoad: function(anchor, index){
	            $('.fp-section.active').addClass('effect');
	
	            fullpage_api.setFitToSection(false);
	            if(index.index === 3){
	                fullpage_api.setAutoScrolling(false);
	            }else{
	                fullpage_api.setAutoScrolling(true);
	            }
	        }
	    });
    } else {
    	var myFullpage = new fullpage('#main_Contents', {
	        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
	        anchors: ['section1', 'section2', 'section3', 'section4'],
	        autoScrolling:false,
	        scrollHorizontally:false,
	        scrollBar:false,
	        resize:false,
	        verticalCentered:false,
	        responsiveWidth:1000,
	        menu:".section_menu",
	        paddingTop:"5.25rem",
	        normalScrollElements:"#footer",
	        afterLoad: function(anchor, index){
	            $('.fp-section.active').addClass('effect');

	        }
	    });
    }
}

function numCount(){
    $('.sec1_count li strong').each(function () {
        var t = $(this);
        $({ Counter: 0 }).delay(200).animate({ Counter: t.text().replace(/,/g,"") }, {
            duration:1200,
            easing: 'swing',
            step: function () {
                t.text(numComma(Math.ceil(this.Counter)));
            },
            complete: function() {
                t.text(numComma(Math.ceil(this.Counter)));
            }
        });
    });

    function numComma(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

//메인 최신글(section3)
function main_latest(){
    var el = $(".sec3_latest>ul"),
        btn = el.find(">li>a"),
        box = el.find(">li>div");

    btn.each(function () {
        var t = $(this);
        if(t.hasClass("on")){
            var tabH = t.innerHeight() + t.next().innerHeight();
            // el.height(tabH);
            btn.attr("title","비활성 메뉴");
            t.attr("title","활성 메뉴").next().show();
       }
   });
    
	btn.on("click",function(){
	    var t = $(this),
	        tabH = t.innerHeight() + t.next().innerHeight();
	
	    if(t.next().is(":hidden")){
	        // el.height(tabH);
	        btn.attr("title","비활성 메뉴").removeClass("on");
	        box.hide();
	        t.attr("title","활성 메뉴").addClass("on").next().stop().show();
	    }
	    return false;
	});  
}

// 메인 푸터 - 배너 슬라이드
$(document).ready(function(){
    var winW = $(window).width();
    var slider;
    if(winW >= 500) {
        slider = $('.footer_rolling_wrap ul').bxSlider({
            nextText: "<span class='blind'>이전</span>",
            prevText: "<span class='blind'>다음</span>",
            controls: true,
            pager: false,
            minSlides: 3,
            maxSlides: 5,
            moveSlides: 1,
            slideWidth: 227,
            slideMargin: 37
        });
    }else{
        slider = $('.footer_rolling_wrap ul').bxSlider({
            nextText:"<span class='blind'>이전</span>",
            prevText:"<span class='blind'>다음</span>",
            controls:true,
            pager:false,
            minSlides:1,
            maxSlides:1,
            moveSlides:1
        });
    }
    $(window).on("resize",function(){
        var winW = $(window).width();
        if(winW >= 500){
            slider.reloadSlider({
                nextText:"<span class='blind'>이전</span>",
                prevText:"<span class='blind'>다음</span>",
                controls:true,
                pager:false,
                minSlides:1,
                maxSlides:5,
                moveSlides:1,
                slideWidth:227,
                slideMargin:37
            })
        }else{
            slider.reloadSlider({
                nextText:"<span class='blind'>이전</span>",
                prevText:"<span class='blind'>다음</span>",
                controls:true,
                pager:false,
                minSlides:1,
                maxSlides:1,
                moveSlides:1
            });
        }
    });
});

 
///* 메인 1섹션 캔버스 */
//function main1Canv(){
//    var scene = new THREE.Scene();
//    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
//    var renderer = new THREE.WebGLRenderer();
//
//    renderer.setSize(window.innerWidth, window.innerHeight);
//
//    document.getElementById("sec1_canvas").appendChild(renderer.domElement);
//
//    /* Create Lights: PointLight / SpotLight etc.*/
//    var spotLight = new THREE.SpotLight(0xffffff);
//    spotLight.position.set(100,100,100);
//    spotLight.castShadow = true;
//    spotLight.shadowMapWidth = 500;
//    spotLight.shadowMapHeight = 500;
//    spotLight.shadowCameraNear = 500;
//    spotLight.shadowCameraFar = 2000;
//    spotLight.shadowCameraFov = 30;
//    scene.add(spotLight);
//
//    /* Create Material */
//    function Mat(){
//        var material = new THREE.MeshPhongMaterial({
//            color      : new THREE.Color("rgb(35,35,213)"),
//            emissive   : new THREE.Color("rgb(64,128,255)"),
//            specular   : new THREE.Color("rgb(93,195,255)"),
//            shininess  : 1,
//            shading    : THREE.FlatShading,
//            wireframe  : 1,
//            transparent: 1,
//            opacity    : 0.13
//        });
//        return material;
//    }
//
//    /* Create Geometry */
//    var geometry = new THREE.SphereGeometry(50,20,20,0,Math.PI*2,0,Math.PI);
//
//    /* Create Earth Sphere*/
//    var earth = new THREE.Mesh(geometry, Mat());
//
//    scene.add(earth);
//
//    camera.position.z = 90;
//
//    function render(){
//        requestAnimationFrame(render);
//        earth.rotation.x += 0.003;
//        earth.rotation.y += 0.004;
//        renderer.render(scene, camera);
//    }
//    render();
//
//    /* window resize */
//    window.addEventListener( 'resize', onWindowResize, false );
//
//    function onWindowResize(){
//        camera.aspect = window.innerWidth / window.innerHeight;
//        camera.updateProjectionMatrix();
//        renderer.setSize( window.innerWidth, window.innerHeight );
//    }
//}
/* 실행부 */
$(function(){
    main_fullpage(); //풀페이지
    numCount(); //메인 상단 숫자 카운트업
    main_latest(); //메인 최신글 
});