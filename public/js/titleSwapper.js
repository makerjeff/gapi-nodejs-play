/**
 * Created by jefferson.wu on 2/11/16.
 * TitleSwapper: Swaps tab titles based on focus and blur.
 */

//var siteTitle = 'SXSW 180';
//
////when user switches to another tab or opens a link
//window.addEventListener('blur', function(event){
//    document.title = 'come back!';
//});
//
////when user switches back to the tab
//window.addEventListener('focus', function(event){
//    document.title = siteTitle;
//});


// namespacing
var JeffApp = {

        switchTitle: function(focusTitle, blurTitle){
            window.addEventListener('focus', function(event){
                document.title = focusTitle;
            });

            window.addEventListener('blur', function(event){
                document.title = blurTitle;
            });
        }
    };


var JeffApp2 = function(focusTitle, blurTitle) {
    this.focusTitle = focusTitle;
    this.blurTitle = blurTitle;

    this.debug1 = function(ft, bt) {
        console.log('focus: ' + ft + ', bt: ' + bt);
    }
};

JeffApp2.prototype.debug2 = function(ft, bt) {
    console.log('focus: ' + ft + ', bt: ' + bt);
};

