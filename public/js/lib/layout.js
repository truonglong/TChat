var isMemberList = false;
var isMenuList = true;
var currentWindowSize = '';
var lastTimelineClass = 'col-xs-12 col-md-10';
$(document).ready(function(){
    console.log('document.ready');
    currentWindowSize = detectCurrentWindowSize();
    autoLayout();

    $(window).bind('resize', function() {
        var tempCurrentWindowSize = detectCurrentWindowSize();
        if(tempCurrentWindowSize != currentWindowSize){
            currentWindowSize = tempCurrentWindowSize;
            autoLayout();
        }
    });
    
    $('.timeline-pushpin-remove').click(function(){
        $('.timeline-pushpin').hide();
        $('.message-list').css({
            'height': 'calc(100% - 0)'
        });
    });
    
    $('#collapseMember').click(function(){
        if($('#memberList').hasClass('hidden-xs hidden-sm hidden-md hidden-lg')){
            isMemberList = true;
            $('#memberList').removeClass('hidden-xs hidden-sm hidden-md hidden-lg');
        } else {
            isMemberList = false;
            $('#memberList').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
        }
        restoreTimeline();
    });
    
    $('#collapseMenu').click(function(){
        if($('#menuList').hasClass('hidden-xs hidden-sm')){
            isMenuList = true;
            $('#menuList').removeClass('hidden-xs hidden-sm');
        } else {
            isMenuList = false;
            $('#menuList').addClass('hidden-xs hidden-sm');
        }
        restoreTimeline();
    });
    // CKEDITOR.replace('ckeditor',{
    //     language: 'en',
    //     uiColor: '#23BAB5',
    //     height: "calc(100% - 135px)"
    // });
    
    // CKEDITOR.replace('editck',{
    //     language: 'en',
    //     uiColor: '#23BAB5',
    //     height: "calc(100% - 135px)"
    // });
    notificationPermission();
});

function detectCurrentWindowSize(){ 
    var width = $(window).width();
    if(width < 768){
        return 'xs';
    } else if(width >=768 && width < 992){
        return 'sm';
    } else if(width >= 992 && width < 1200){
        return 'md';
    } else {
        return 'lg';
    }
}

function restoreTimeline(){
    console.log('restoreTimeline');
    $('#timeline').removeClass(lastTimelineClass);
    var tempClass = '';
    if(isMemberList && isMenuList){
        tempClass = 'col-xs-4 col-md-8';
    } else if(!isMemberList && !isMenuList){
        tempClass = 'col-xs-12 col-md-12';
    } else {
        tempClass = 'col-xs-8 col-md-10';
    }
    $('#timeline').addClass(tempClass);
    lastTimelineClass = tempClass;
}

function autoLayout(){
     console.log('call autoLayout');
    if((currentWindowSize == 'xs' || currentWindowSize == 'sm') && $('#menuList').hasClass('hidden-xs hidden-sm')){
        isMenuList = false;
    } else {
        isMenuList = true;
    }
    restoreTimeline();
    if(currentWindowSize == 'xs' || currentWindowSize == 'sm'){
        $('.timeline-header-left').width(80);
        $('.timeline-header-right').css({
            'width': 'calc(100% - 142px)'
        });
        
        $('.timeline-pushpin-left').width(110);
        $('.timeline-pushpin-right').css({
            'width': 'calc(100% - 110px)'
        });
    } else {
        $('.timeline-header-left').width(220);
        $('.timeline-header-right').css({
            'width': 'calc(100% - 220px)'
        });
        
        $('.timeline-pushpin-left').width(80);
        $('.timeline-pushpin-right').css({
            'width': 'calc(100% - 80px)'
        });
    }
}

function notificationPermission() {
    if (!("Notification" in window)) {
        //alert("This browser does not support desktop notification");
        return;
    }
    if (Notification.permission == 'granted') {
        return;
    }
    if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            if (!('permission' in Notification)) {
                Notification.permission = permission;
            }
        });
    }
}