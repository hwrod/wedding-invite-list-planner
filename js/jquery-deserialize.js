/**
 * @author Kyle Florence <kyle[dot]florence[at]gmail[dot]com>
 * @website https://github.com/kflorence/jquery-deserialize/
 * @version 1.2.1
 *
 * Dual licensed under the MIT and GPLv2 licenses.
 */
(function( jQuery, undefined ) {

var push = Array.prototype.push,
    rcheck = /^(?:radio|checkbox)$/i,
    rplus = /\+/g,
    rselect = /^(?:option|select-one|select-multiple)$/i,
    rvalue = /^(?:button|color|date|datetime|datetime-local|email|hidden|month|number|password|range|reset|search|submit|tel|text|textarea|time|url|week)$/i;

function getElements( elements ) {
    return elements.map(function() {
            return this.elements ? jQuery.makeArray( this.elements ) : this;
        }).filter( ":input" ).get();
}

function getElementsByName( elements ) {
    var current,
        elementsByName = {};

    jQuery.each( elements, function( i, element ) {
        current = elementsByName[ element.name ];
        elementsByName[ element.name ] = current === undefined ? element :
            ( jQuery.isArray( current ) ? current.concat( element ) : [ current, element ] );
    });

    return elementsByName;
}

jQuery.fn.deserialize = function( data, options ) {
    var i, length,
        elements = getElements( this ),
        normalized = [];

    if ( !data || !elements.length ) {
        return this;
    }

    if ( jQuery.isArray( data ) ) {
        normalized = data;

    } else if ( jQuery.isPlainObject( data ) ) {
        var key, value;

        for ( key in data ) {
            jQuery.isArray( value = data[ key ] ) ?
                push.apply( normalized, jQuery.map( value, function( v ) {
                    return { name: key, value: v };
                })) : push.call( normalized, { name: key, value: value } );
        }

    } else if ( typeof data === "string" ) {
        var parts;

        data = data.split( "&" );

        for ( i = 0, length = data.length; i < length; i++ ) {
            parts =  data[ i ].split( "=" );
            push.call( normalized, {
                name: decodeURIComponent( parts[ 0 ] ),
                value: decodeURIComponent( parts[ 1 ].replace( rplus, "%20" ) )
            });
        }
    }

    if ( !( length = normalized.length ) ) {
        return this;
    }

    var current, element, j, len, name, property, type, value,
        change = jQuery.noop,
        complete = jQuery.noop,
        names = {};

    options = options || {};
    elements = getElementsByName( elements );

    // Backwards compatible with old arguments: data, callback
    if ( jQuery.isFunction( options ) ) {
        complete = options;

    } else {
        change = jQuery.isFunction( options.change ) ? options.change : change;
        complete = jQuery.isFunction( options.complete ) ? options.complete : complete;
    }

    for ( i = 0; i < length; i++ ) {
        current = normalized[ i ];

        name = current.name;
        value = current.value;

        if ( !( element = elements[ name ] ) ) {
            continue;
        }

        type = ( len = element.length ) ? element[ 0 ] : element;
        type = ( type.type || type.nodeName ).toLowerCase();
        property = null;

        if ( rvalue.test( type ) ) {
            if ( len ) {
                j = names[ name ];
                element = element[ names[ name ] = ( j == undefined ) ? 0 : ++j ];
            }

            change.call( element, ( element.value = value ) );

        } else if ( rcheck.test( type ) ) {
            property = "checked";

        } else if ( rselect.test( type ) ) {
            property = "selected";
        }

        if ( property ) {
			if ( !len ) {
                element = [ element ];
                len = 1;
			}

            for ( j = 0; j < len; j++ ) {
                current = element[ j ];

                if ( current.value == value ) {
                    change.call( current, ( current[ property ] = true ) && value );
                }
            }
        }
    }

    complete.call( this );

    return this;
};

})( jQuery );

		
	(function(e){"use strict";e.fn.serializeJSON=function(t){var n,r,i,s,o,u;o=e.serializeJSON;r=this.serializeArray();u=o.optsWithDefaults(t);n={};e.each(r,function(e,t){i=o.splitInputNameIntoKeysArray(t.name);s=o.parseValue(t.value,u);if(u.parseWithFunction)s=u.parseWithFunction(s);o.deepSet(n,i,s,u)});return n};e.serializeJSON={defaultOptions:{parseNumbers:false,parseBooleans:false,parseNulls:false,parseAll:false,parseWithFunction:null,useIntKeysAsArrayIndex:false},optsWithDefaults:function(t){var n,r;if(t==null)t={};n=e.serializeJSON;r=n.optWithDefaults("parseAll",t);return{parseNumbers:r||n.optWithDefaults("parseNumbers",t),parseBooleans:r||n.optWithDefaults("parseBooleans",t),parseNulls:r||n.optWithDefaults("parseNulls",t),parseWithFunction:n.optWithDefaults("parseWithFunction",t),useIntKeysAsArrayIndex:n.optWithDefaults("useIntKeysAsArrayIndex",t)}},optWithDefaults:function(t,n){return n[t]!==false&&(n[t]||e.serializeJSON.defaultOptions[t])},parseValue:function(t,n){var r,i;i=e.serializeJSON;if(n.parseNumbers&&i.isNumeric(t))return Number(t);if(n.parseBooleans&&(t==="true"||t==="false"))return t==="true";if(n.parseNulls&&t=="null")return null;return t},isObject:function(e){return e===Object(e)},isUndefined:function(e){return e===void 0},isValidArrayIndex:function(e){return/^[0-9]+$/.test(String(e))},isNumeric:function(e){return e-parseFloat(e)>=0},splitInputNameIntoKeysArray:function(t){var n,r,i;i=e.serializeJSON;if(i.isUndefined(t)){throw new Error("ArgumentError: param 'name' expected to be a string, found undefined")}n=e.map(t.split("["),function(e){r=e[e.length-1];return r==="]"?e.substring(0,e.length-1):e});if(n[0]===""){n.shift()}return n},deepSet:function(t,n,r,i){var s,o,u,a,f,l;if(i==null)i={};l=e.serializeJSON;if(l.isUndefined(t)){throw new Error("ArgumentError: param 'o' expected to be an object or array, found undefined")}if(!n||n.length===0){throw new Error("ArgumentError: param 'keys' expected to be an array with least one element")}s=n[0];if(n.length===1){if(s===""){t.push(r)}else{t[s]=r}}else{o=n[1];if(s===""){a=t.length-1;f=t[a];if(l.isObject(f)&&(l.isUndefined(f[o])||n.length>2)){s=a}else{s=a+1}}if(l.isUndefined(t[s])){if(o===""){t[s]=[]}else if(i.useIntKeysAsArrayIndex&&l.isValidArrayIndex(o)){t[s]=[]}else{t[s]={}}}u=n.slice(1);l.deepSet(t[s],u,r,i)}}}})(window.jQuery||window.Zepto||window.$)
