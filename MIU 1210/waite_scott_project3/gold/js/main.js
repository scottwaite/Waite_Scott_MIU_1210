// Scott Waite 
// Mobile Interfaces & Usability 1210 
// Project 3

    (function($) {
  $.widget('mobile.tabbar', $.mobile.navbar, {
    _create: function() {
      var theme = this.element.jqmData('theme') || "a";
      this.element.addClass('ui-footer ui-footer-fixed ui-bar-' + theme);

      this.element.closest('[data-role="page"]').addClass('ui-page-footer-fixed');

      $.mobile.navbar.prototype._create.call(this);
    },

    setActive: function(url) {
      this.element.find('a').removeClass('ui-btn-active ui-state-persist');
      this.element.find('a[href="' + url + '"]').addClass('ui-btn-active ui-state-persist');
    }
  });

  $(document).bind('pagecreate create', function(e) {
    return $(e.target).find(":jqmData(role='tabbar')").tabbar();
  });
  
  $(":jqmData(role='page')").live('pageshow', function(e) {
    var tabBar, id = $(e.target).attr('id');

    tabBar = $.mobile.activePage.find(':jqmData(role="tabbar")');
    if(tabBar.length) {
      tabBar.tabbar('setActive', '#' + id);
    }
  });

var attachEvents = function() {
	var hoverDelay = $.mobile.buttonMarkup.hoverDelay, hov, foc;

	$( document ).bind( {
		"vmousedown vmousecancel vmouseup vmouseover vmouseout focus blur scrollstart": function( event ) {
			var theme,
				$btn = $( closestEnabledButton( event.target ) ),
				evt = event.type;
		
			if ( $btn.length ) {
				theme = $btn.attr( "data-" + $.mobile.ns + "theme" );
		
				if ( evt === "vmousedown" ) {
					if ( $.support.touch ) {
						hov = setTimeout(function() {
							$btn.removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-down-" + theme );
						}, hoverDelay );
					} else {
						$btn.removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-down-" + theme );
					}
				} else if ( evt === "vmousecancel" || evt === "vmouseup" ) {
					$btn.removeClass( "ui-btn-down-" + theme ).addClass( "ui-btn-up-" + theme );
				} else if ( evt === "vmouseover" || evt === "focus" ) {
					if ( $.support.touch ) {
						foc = setTimeout(function() {
							$btn.removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-hover-" + theme );
						}, hoverDelay );
					} else {
						$btn.removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-hover-" + theme );
					}
				} else if ( evt === "vmouseout" || evt === "blur" || evt === "scrollstart" ) {
					$btn.removeClass( "ui-btn-hover-" + theme  + " ui-btn-down-" + theme ).addClass( "ui-btn-up-" + theme );
					if ( hov ) {
						clearTimeout( hov );
					}
					if ( foc ) {
						clearTimeout( foc );
					}
				}
			}
		},
		"focusin focus": function( event ){
			$( closestEnabledButton( event.target ) ).addClass( $.mobile.focusClass );
		},
		"focusout blur": function( event ){
			$( closestEnabledButton( event.target ) ).removeClass( $.mobile.focusClass );
		}
	});

	attachEvents = null;
};

$.fn.buttonMarkup = function( options ) {
	var $workingSet = this;

	options = ( options && ( $.type( options ) == "object" ) )? options : {};
	for ( var i = 0; i < $workingSet.length; i++ ) {
		var el = $workingSet.eq( i ),
			e = el[ 0 ],
			o = $.extend( {}, $.fn.buttonMarkup.defaults, {
				icon:       options.icon       !== undefined ? options.icon       : el.jqmData( "icon" ),
				iconpos:    options.iconpos    !== undefined ? options.iconpos    : el.jqmData( "iconpos" ),
				theme:      options.theme      !== undefined ? options.theme      : el.jqmData( "theme" ) || $.mobile.getInheritedTheme( el, "c" ),
				inline:     options.inline     !== undefined ? options.inline     : el.jqmData( "inline" ),
				shadow:     options.shadow     !== undefined ? options.shadow     : el.jqmData( "shadow" ),
				corners:    options.corners    !== undefined ? options.corners    : el.jqmData( "corners" ),
				iconshadow: options.iconshadow !== undefined ? options.iconshadow : el.jqmData( "iconshadow" ),
				iconsize:   options.iconsize   !== undefined ? options.iconsize   : el.jqmData( "iconsize" ),
				mini:       options.mini       !== undefined ? options.mini       : el.jqmData( "mini" )
			}, options ),

			innerClass = "ui-btn-inner",
			textClass = "ui-btn-text",
			buttonClass, iconClass,
			buttonInner,
			buttonText,
			buttonIcon,
			buttonElements;

		$.each(o, function(key, value) {
			e.setAttribute( "data-" + $.mobile.ns + key, value );
			el.jqmData(key, value);
		});

		buttonElements = $.data(((e.tagName === "INPUT" || e.tagName === "BUTTON") ? e.parentNode : e), "buttonElements");

		if (buttonElements) {
			e = buttonElements.outer;
			el = $(e);
			buttonInner = buttonElements.inner;
			buttonText = buttonElements.text;
			$(buttonElements.icon).remove();
			buttonElements.icon = null;
		}
		else {
			buttonInner = document.createElement( o.wrapperEls );
			buttonText = document.createElement( o.wrapperEls );
		}
		buttonIcon = o.icon ? document.createElement( "span" ) : null;

		if ( attachEvents && !buttonElements) {
			attachEvents();
		}
		
		if ( !o.theme ) {
			o.theme = $.mobile.getInheritedTheme( el, "c" );	
		}		

		buttonClass = "ui-btn ui-btn-up-" + o.theme;
		buttonClass += o.inline ? " ui-btn-inline" : "";
		buttonClass += o.shadow ? " ui-shadow" : "";
		buttonClass += o.corners ? " ui-btn-corner-all" : "";

		if ( o.mini !== undefined ) {
			// Used to control styling in headers/footers, where buttons default to `mini` style.
			buttonClass += o.mini ? " ui-mini" : " ui-fullsize";
		}
		
		if ( o.inline !== undefined ) {			
			buttonClass += o.inline === false ? " ui-btn-block" : " ui-btn-inline";
		}
		
		
		if ( o.icon ) {
			o.icon = "ui-icon-" + o.icon;
			o.iconpos = o.iconpos || "left";

			iconClass = "ui-icon " + o.icon;

			if ( o.iconshadow ) {
				iconClass += " ui-icon-shadow";
			}

			if ( o.iconsize ) {
				iconClass += " ui-iconsize-" + o.iconsize;
			}
		}

		if ( o.iconpos ) {
			buttonClass += " ui-btn-icon-" + o.iconpos;

			if ( o.iconpos == "notext" && !el.attr( "title" ) ) {
				el.attr( "title", el.getEncodedText() );
			}
		}
    
		innerClass += o.corners ? " ui-btn-corner-all" : "";

		if ( o.iconpos && o.iconpos === "notext" && !el.attr( "title" ) ) {
			el.attr( "title", el.getEncodedText() );
		}

		if ( buttonElements ) {
			el.removeClass( buttonElements.bcls || "" );
		}
		el.removeClass( "ui-link" ).addClass( buttonClass );

		buttonInner.className = innerClass;

		buttonText.className = textClass;
		if ( !buttonElements ) {
			buttonInner.appendChild( buttonText );
		}
		if ( buttonIcon ) {
			buttonIcon.className = iconClass;
			if ( !(buttonElements && buttonElements.icon) ) {
				buttonIcon.appendChild( document.createTextNode("\u00a0") );
				buttonInner.appendChild( buttonIcon );
			}
		}

		while ( e.firstChild && !buttonElements) {
			buttonText.appendChild( e.firstChild );
		}

		if ( !buttonElements ) {
			e.appendChild( buttonInner );
		}

		buttonElements = {
			bcls  : buttonClass,
			outer : e,
			inner : buttonInner,
			text  : buttonText,
			icon  : buttonIcon
		};

		$.data(e,           'buttonElements', buttonElements);
		$.data(buttonInner, 'buttonElements', buttonElements);
		$.data(buttonText,  'buttonElements', buttonElements);
		if (buttonIcon) {
			$.data(buttonIcon, 'buttonElements', buttonElements);
		}
	}

	return this;
};

$.fn.buttonMarkup.defaults = {
	corners: true,
	shadow: true,
	iconshadow: true,
	iconsize: 18,
	wrapperEls: "span"
};

function closestEnabledButton( element ) {
    var cname;

    while ( element ) {
        cname = ( typeof element.className === 'string' ) && (element.className + ' ');
        if ( cname && cname.indexOf("ui-btn ") > -1 && cname.indexOf("ui-disabled ") < 0 ) {
            break;
        }

        element = element.parentNode;
    }

    return element;
}

	
})(jQuery);
