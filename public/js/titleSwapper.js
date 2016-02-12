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


var JeffApp2 = JeffApp2 || function(focusTitle, blurTitle) {
    this.focusTitle = focusTitle;
    this.blurTitle = blurTitle;
};

/**
 *
 * @type {Function|(function(this:*))}
 */
JeffApp2.prototype.switchToFocus = function(){
    document.title = this.focusTitle;
}.bind(this); //binds to parent object namespace

JeffApp2.prototype.switchToBlur = function(){
    document.title = this.blurTitle;
}.bind(this);

