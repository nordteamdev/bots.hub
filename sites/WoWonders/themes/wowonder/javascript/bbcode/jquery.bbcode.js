// +------------------------------------------------------------------------+
// | @author Deen Doughouz (DoughouzForest)
// | @author_url 1: http://www.wowonder.com
// | @author_url 2: http://codecanyon.net/user/doughouzforest
// | @author_email: wowondersocial@gmail.com   
// +------------------------------------------------------------------------+
// | WoWonder - The Ultimate Social Networking Platform
// | Copyright (c) 2017 WoWonder. All rights reserved.
// +------------------------------------------------------------------------+

(function(){var d={},i;d.VERSION="0.1";i=function(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")};_render=function(e,d){var a={},f={escape:!0,newlines:!0};if(!e)return"";if(d)for(var g in d)d.hasOwnProperty(g)&&(f[g]=d[g]);f.escape&&(e=i(e));a.bold={re:/\[b\]([\s\S]*?)\[\/b\]/ig,sub:function(a,b){return"<strong>"+b+"</strong>"}};a.italic={re:/\[i\]([\s\S]*?)\[\/i\]/ig,sub:function(a,b){return"<em>"+b+"</em>"}};a.code={re:/\[code\]([\s\S]*?)\[\/code\]/ig,
sub:function(a,b){return"<pre><code>"+b+"</code></pre>"}};a.quote={re:/\[quote\]([\s\S]*?)\[\/quote\]/ig,sub:function(a,b){return"<blockquote><p>"+b+"<p></blockquote>"}};a.quotespecific={re:/\[quote=(?:"|&quot;)(.*?)(?:"|&quot;)\]([\s\S]*?)\[\/quote\]/ig,sub:function(a,b,c){return b+" wrote: <blockquote><p>"+c+"<p></blockquote>"}};a.size={re:/\[size=(\d+)\]([\s\S]*?)\[\/size\]/ig,sub:function(a,b,c){return'<span style="font-size:'+b+'%;">'+c+"</span>"}};a.strikethrough={re:/\[s\]([\s\S]*?)\[\/s\]/ig,
sub:function(a,b){return"<del>"+b+"</del>"}};a.underline={re:/\[u\]([\s\S]*?)\[\/u\]/ig,sub:function(a,b){return'<span style="text-decoration:underline;">'+b+"</span>"}};a.center={re:/\[center\]([\s\S]*?)\[\/center\]/ig,sub:function(a,b){return'<div style="text-align:center;">'+b+"</div>"}};a.color={re:/\[color=([#a-z0-9]+)\]([\s\S]*?)\[\/color\]/ig,sub:function(a,b,c){return'<span style="color:'+b+';">'+c+"</span>"}};a.email={re:/\[email\]([\s\S]*?)\[\/email\]/ig,sub:function(a,b){return'<a href="mailto:'+
b+'">'+b+"</a>"}};a.emailcustom={re:/\[email=(.*?)\]([\s\S]*?)\[\/email\]/ig,sub:function(a,b,c){return'<a href="mailto:'+b+'">'+c+"</a>"}};a.url={re:/\[url\]([\s\S]*?)\[\/url\]/ig,sub:function(a,b){return'<a href="'+b+'">'+b+"</a>"}};a.urlcustom={re:/\[url=(.*?)\]([\s\S]*?)\[\/url\]/ig,sub:function(a,b,c){return'<a href="'+b+'">'+c+"</a>"}};a.img={re:/\[img\]([\s\S]*?)\[\/img\]/ig,sub:function(a,b){return'<img src="'+b+'"/>'}};a.lists={re:/\[list\]([\s\S]*?)\[\/list\]/ig,sub:function(a,b){b=b.replace(/\[\*\]([^\[\*\]]*)/ig,
function(b,a){return"<li>"+a.replace(/[\n\r?]/,"")+"</li>"});return"<ul>"+b.replace(/[\n\r?]/,"")+"</ul>"}};a.lists2={re:/\[list=(1|a)\]([\s\S]*?)\[\/list\]/ig,sub:function(a,b,c){a="";a=b==="1"?"<ol>":b==="a"?'<ol style="list-style-type: lower-alpha">':"<ol>";c=c.replace(/\[\*\]([^\[\*\]]*)/ig,function(a,b){return"<li>"+b.replace(/[\n\r?]/,"")+"</li>"});return a+c.replace(/[\n\r?]/,"")+"</ol>"}};a.youtube={re:/\[youtube\](?:http?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/watch\?v=)([A-Z0-9\-_]+)(?:&(.*?))?\[\/youtube\]/ig,
sub:function(a,b){return'<iframe class="youtube-player" type="text/html" width="640" height="385" src="http://www.youtube.com/embed/'+b+'" frameborder="0"></iframe>'}};if(f.newlines)a.newlines={re:/\n\r?/g,sub:function(){return"<br/>"}};for(var h in a)a.hasOwnProperty(h)&&(e=e.replace(a[h].re,a[h].sub));return e};d.render=_render;typeof module!=="undefined"&&module.exports?module.exports=d:this.bbcode=d})();



(function($) {
    var UNDEF = "undefined";
    var getSelection, setSelection, deleteSelectedText, deleteText, insertText;
    var replaceSelectedText, surroundSelectedText, extractSelectedText, collapseSelection;


    function isHostMethod(object, property) {
        var t = typeof object[property];
        return t === "function" || (!!(t == "object" && object[property])) || t == "unknown";
    }

    function isHostProperty(object, property) {
        return typeof(object[property]) != UNDEF;
    }

    function isHostObject(object, property) {
        return !!(typeof(object[property]) == "object" && object[property]);
    }

    function fail(reason) {
        if (window.console && window.console.log) {
            window.console.log("RangyInputs not supported in your browser. Reason: " + reason);
        }
    }

    function adjustOffsets(el, start, end) {
        if (start < 0) {
            start += el.value.length;
        }
        if (typeof end == UNDEF) {
            end = start;
        }
        if (end < 0) {
            end += el.value.length;
        }
        return { start: start, end: end };
    }

    function makeSelection(el, start, end) {
        return {
            start: start,
            end: end,
            length: end - start,
            text: el.value.slice(start, end)
        };
    }

    function getBody() {
        return isHostObject(document, "body") ? document.body : document.getElementsByTagName("body")[0];
    }

    $(document).ready(function() {
        var testTextArea = document.createElement("textarea");

        getBody().appendChild(testTextArea);

        if (isHostProperty(testTextArea, "selectionStart") && isHostProperty(testTextArea, "selectionEnd")) {
            getSelection = function(el) {
                var start = el.selectionStart, end = el.selectionEnd;
                return makeSelection(el, start, end);
            };

            setSelection = function(el, startOffset, endOffset) {
                var offsets = adjustOffsets(el, startOffset, endOffset);
                el.selectionStart = offsets.start;
                el.selectionEnd = offsets.end;
            };

            collapseSelection = function(el, toStart) {
                if (toStart) {
                    el.selectionEnd = el.selectionStart;
                } else {
                    el.selectionStart = el.selectionEnd;
                }
            };
        } else if (isHostMethod(testTextArea, "createTextRange") && isHostObject(document, "selection") &&
                   isHostMethod(document.selection, "createRange")) {

            getSelection = function(el) {
                var start = 0, end = 0, normalizedValue, textInputRange, len, endRange;
                var range = document.selection.createRange();

                if (range && range.parentElement() == el) {
                    len = el.value.length;

                    normalizedValue = el.value.replace(/\r\n/g, "\n");
                    textInputRange = el.createTextRange();
                    textInputRange.moveToBookmark(range.getBookmark());
                    endRange = el.createTextRange();
                    endRange.collapse(false);
                    if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                        start = end = len;
                    } else {
                        start = -textInputRange.moveStart("character", -len);
                        start += normalizedValue.slice(0, start).split("\n").length - 1;
                        if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                            end = len;
                        } else {
                            end = -textInputRange.moveEnd("character", -len);
                            end += normalizedValue.slice(0, end).split("\n").length - 1;
                        }
                    }
                }

                return makeSelection(el, start, end);
            };

            var offsetToRangeCharacterMove = function(el, offset) {
                return offset - (el.value.slice(0, offset).split("\r\n").length - 1);
            };

            setSelection = function(el, startOffset, endOffset) {
                var offsets = adjustOffsets(el, startOffset, endOffset);
                var range = el.createTextRange();
                var startCharMove = offsetToRangeCharacterMove(el, offsets.start);
                range.collapse(true);
                if (offsets.start == offsets.end) {
                    range.move("character", startCharMove);
                } else {
                    range.moveEnd("character", offsetToRangeCharacterMove(el, offsets.end));
                    range.moveStart("character", startCharMove);
                }
                range.select();
            };

            collapseSelection = function(el, toStart) {
                var range = document.selection.createRange();
                range.collapse(toStart);
                range.select();
            };
        } else {
            getBody().removeChild(testTextArea);
            fail("No means of finding text input caret position");
            return;
        }

        getBody().removeChild(testTextArea);

        deleteText = function(el, start, end, moveSelection) {
            var val;
            if (start != end) {
                val = el.value;
                el.value = val.slice(0, start) + val.slice(end);
            }
            if (moveSelection) {
                setSelection(el, start, start);
            }
        };

        deleteSelectedText = function(el) {
            var sel = getSelection(el);
            deleteText(el, sel.start, sel.end, true);
        };

        extractSelectedText = function(el) {
            var sel = getSelection(el), val;
            if (sel.start != sel.end) {
                val = el.value;
                el.value = val.slice(0, sel.start) + val.slice(sel.end);
            }
            setSelection(el, sel.start, sel.start);
            return sel.text;
        };

        insertText = function(el, text, index, moveSelection) {
            var val = el.value, caretIndex;
            el.value = val.slice(0, index) + text + val.slice(index);
            if (moveSelection) {
                caretIndex = index + text.length;
                setSelection(el, caretIndex, caretIndex);
            }
        };

        replaceSelectedText = function(el, text) {
            var sel = getSelection(el), val = el.value;
            el.value = val.slice(0, sel.start) + text + val.slice(sel.end);
            var caretIndex = sel.start + text.length;
            setSelection(el, caretIndex, caretIndex);
        };

        surroundSelectedText = function(el, before, after) {
            if (typeof after == UNDEF) {
                after = before;
            }
            var sel = getSelection(el), val = el.value;
            el.value = val.slice(0, sel.start) + before + sel.text + after + val.slice(sel.end);
            var startIndex = sel.start + before.length;
            var endIndex = startIndex + sel.length;
            setSelection(el, startIndex, endIndex);
        };

        function jQuerify(func, returnThis) {
            return function() {
                var el = this.jquery ? this[0] : this;
                var nodeName = el.nodeName.toLowerCase();

                if (el.nodeType == 1 && (nodeName == "textarea" || (nodeName == "input" && el.type == "text"))) {
                    var args = [el].concat(Array.prototype.slice.call(arguments));
                    var result = func.apply(this, args);
                    if (!returnThis) {
                        return result;
                    }
                }
                if (returnThis) {
                    return this;
                }
            };
        }

        $.fn.extend({
            getSelection: jQuerify(getSelection, false),
            setSelection: jQuerify(setSelection, true),
            collapseSelection: jQuerify(collapseSelection, true),
            deleteSelectedText: jQuerify(deleteSelectedText, true),
            deleteText: jQuerify(deleteText, true),
            extractSelectedText: jQuerify(extractSelectedText, false),
            insertText: jQuerify(insertText, true),
            replaceSelectedText: jQuerify(replaceSelectedText, true),
            surroundSelectedText: jQuerify(surroundSelectedText, true)
        });

        $.fn.rangyInputs = {
            getSelection: getSelection,
            setSelection: setSelection,
            collapseSelection: collapseSelection,
            deleteSelectedText: deleteSelectedText,
            deleteText: deleteText,
            extractSelectedText: extractSelectedText,
            insertText: insertText,
            replaceSelectedText: replaceSelectedText,
            surroundSelectedText: surroundSelectedText
        };
    });
})(jQuery);


(function ($) {
    $.fn.bbcode = function () {
        var editor = '\
            <div class="bbcode-editor">\
                <ul class="bbcode-toolbar">\
                    <li class="bbcode-bold" title="Bold"><i class="fa fa-bold" aria-hidden="true"></i></li>\
                    <li class="bbcode-italic" title="Italic"><i class="fa fa-italic" aria-hidden="true"></i></li>\
                    <li class="bbcode-underline" title="Underline"><i class="fa fa-underline" aria-hidden="true"></i></li>\
                    <li class="bbcode-strikethrough" title="Strikethrough"><i class="fa fa-strikethrough" aria-hidden="true"></i></li>\
                    <li class="bbcode-center" title="Center"><i class="fa fa-align-center" aria-hidden="true"></i></li>\
                    <li class="bbcode-image" title="Image"><i class="fa fa-picture-o" aria-hidden="true"></i></li>\
                    <li class="bbcode-link" title="Link"><i class="fa fa-link" aria-hidden="true"></i></li>\
                    <li class="bbcode-iframe" title="iFrame"><i class="fa fa-video-camera" aria-hidden="true"></i></li>\
                    <li class="bbcode-quote" title="Quote"><i class="fa fa-quote-right" aria-hidden="true"></i></li>\
                    <li class="bbcode-justify" title="Justify"><i class="fa fa-align-justify" aria-hidden="true"></i></li>\
                    <li class="bbcode-align-left" title="Align-left"><i class="fa fa-align-left" aria-hidden="true"></i></li>\
                    <li class="bbcode-align-right" title="Align-right"><i class="fa fa-align-right" aria-hidden="true"></i></li>\
                    <li class="bbcode-list-ol" title="Ordered list"><i class="fa fa-list-ol" aria-hidden="true"></i></li>\
                    <li class="bbcode-list-ul" title="Unordered list"><i class="fa fa-list-ul" aria-hidden="true"></i></li>\
                    <li class="bbcode-code" title="Code"><i class="fa fa-code" aria-hidden="true"></i></li>\
                    <li class="bbcode-pre" title="Code"><i class="fa fa-file-code-o" aria-hidden="true"></i></li>\
                </ul>\
                <textarea></textarea>\
            </div>';
        
        return this.each(function () {
            var $this = $(this);
            if ($this.is('textarea')) {
                var $editor = $(editor),
                    $cloned_textarea = $this.clone().addClass('bbcode-textarea'),
                    render_timer = 0;
                
                $editor.find('textarea').replaceWith($cloned_textarea);
                
               

                $cloned_textarea.bind('focus', function () {
                    $cloned_textarea.next('.bbcode-preview').html(bbcode.render($cloned_textarea.val()));
                });

                $editor.find('.bbcode-bold').bind('click', function () {                    
                    $cloned_textarea.surroundSelectedText('[b]', '[/b]', true);
                    $cloned_textarea.focus()
                });

                $editor.find('.bbcode-italic').bind('click', function () {
                    $cloned_textarea.surroundSelectedText('[i]', '[/i]', true);
                    $cloned_textarea.focus()
                });

                $editor.find('.bbcode-underline').bind('click', function () {
                    $cloned_textarea.surroundSelectedText('[u]', '[/u]', true);
                    $cloned_textarea.focus()
                });
                
                $editor.find('.bbcode-strikethrough').bind('click', function () {
                    $cloned_textarea.surroundSelectedText('[s]', '[/s]', true);
                    $cloned_textarea.focus()
                });                              
                
                $editor.find('.bbcode-center').bind('click', function () {
                    $cloned_textarea.surroundSelectedText('[center]', '[/center]', true);
                    $cloned_textarea.focus()
                });     
                                
                $editor.find('.bbcode-image').bind('click', function () {
                    var img_url = prompt('Enter a valid url to an image', 'http://i.imgur.com/sJIRJ.gif');
                    if (!img_url) { return; }

                    $cloned_textarea.replaceSelectedText('[img]' + img_url + '[/img]', '', true);
                    $cloned_textarea.focus()                    
                });  
                
                $editor.find('.bbcode-link').bind('click', function () {
                    var url = prompt('Enter a valid url', 'http://www.google.com/');
                    if (!url) { return; }

                    $cloned_textarea.replaceSelectedText('[url]' + url + '[/url]', '', true);
                    $cloned_textarea.focus()                    
                });
                
                $editor.find('.bbcode-iframe').bind('click', function () {
                    let url = prompt("iFrame: ");
                    var pattern1 = new RegExp('^(https?:\\/\\/)?'+ 
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ 
                    '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
                    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
                    '(\\#[-a-z\\d_]*)?$','i');

                    var pattern2 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(\d+)/g;
                    var pattern3 = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([\w\-]{10,12})(?:&feature=related)?(?:[\w\-]{0})?/g;
                    var pattern4 = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/embed\/([\w\-]{10,12})/g;
                    var pattern5 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/video\/(\d+)/g;

                    if (!url) {
                        return false;
                    }

                    else if (pattern1.test(url) !== true) {
                        alert("Video URL is invalid, please check your details");
                        return false;
                    }

                    else if(pattern2.test(url)){
                       var replacement = '[IFRAME]https://player.vimeo.com/video/$1[/IFRAME]';   
                       url = url.replace(pattern2, replacement);
                    }
           
        
                    else if(pattern3.test(url)){
                        var replacement = '[IFRAME]https://www.youtube.com/embed/$1[/IFRAME]';
                        url = url.replace(pattern3, replacement);
                    }

                    else if(pattern4.test(url) || pattern5.test(url)){
                        url = '[IFRAME]'+url+'[/IFRAME]';
                    }

                    else{
                        alert("Video URL not supported");
                        return false;
                    }

                    $cloned_textarea.surroundSelectedText(url, '',true);
                    $cloned_textarea.focus();
                });

                $editor.find('.bbcode-quote').bind('click', function () {
                    $cloned_textarea.surroundSelectedText('[quote]', '[/quote]', true);
                    $cloned_textarea.focus()
                });

                $editor.find('.bbcode-justify').bind('click', function () {
                    $cloned_textarea.surroundSelectedText('[justify]', '[/justify]', true);
                    $cloned_textarea.focus()
                }); 

                $editor.find('.bbcode-align-left').bind('click', function () {
                    $cloned_textarea.surroundSelectedText('[left]', '[/left]', true);
                    $cloned_textarea.focus()
                });

                $editor.find('.bbcode-align-right').bind('click', function () {
                    $cloned_textarea.surroundSelectedText('[right]', '[/right]', true);
                    $cloned_textarea.focus()
                });

                $editor.find('.bbcode-list-ol').bind('click', function () {
                    $cloned_textarea.surroundSelectedText('[ordered_list]\n[*] ... ', '[/*]\n[/ordered_list]', true);
                    $cloned_textarea.focus()
                });

                $editor.find('.bbcode-list-ul').bind('click', function () {
                    $cloned_textarea.surroundSelectedText('[unordered_list]\n[*] ... ', '[/*]\n[/unordered_list]', true);
                    $cloned_textarea.focus()
                });

                $editor.find('.bbcode-code').bind('click', function () {
                    $cloned_textarea.surroundSelectedText('[code] \n\n', '[/code]', true);
                    $cloned_textarea.focus()
                });

                $editor.find('.bbcode-pre').bind('click', function () {
                    $cloned_textarea.surroundSelectedText('[pre] \n\n', '[/pre]', true);
                    $cloned_textarea.focus()
                });                  
                                                    
                $this.replaceWith($editor);
            }
        });
    };
}(jQuery));

