/**
 * Created by jefferson.wu on 2/11/16.
 * TitleSwapper: Swaps tab titles based on focus and blur.
 */

var siteTitle = 'SXSW 180';

//when user switches to another tab or opens a link
window.addEventListener('blur', function(event){
    document.title = 'come back!';
});

//when user switches back to the tab
window.addEventListener('focus', function(event){
    document.title = siteTitle;
});
