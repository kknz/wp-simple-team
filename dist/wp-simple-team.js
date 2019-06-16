( function( $ ) {
	$( document ).ready( function() {
		$( '.wp-block-wst-block-wp-simple-team' ).on( 'click', 'li.team-member .profile-image', function( e ) {
			e.preventDefault();
			const imgObject = $( this ).closest( 'li.team-member' ).find( '.profile-image img' ).clone();
			const nameObject = $( this ).closest( 'li.team-member' ).find( '.profile-image .member-name' ).clone();
			const descriptionObject = $( this ).closest( 'li.team-member' ).find( '.description' ).clone();
			$( 'body' ).append(
				'<div class="wp-simple-team__popup-overlay">\n\
            <div class="popup_content">\n\
                <span class="popup_close_btn">×</span>\n\
                <div class="popup_content_item">\n\
                  ' + $( '<div>' ).append( imgObject ).html() + '\n\
                  ' + $( '<div>' ).append( nameObject ).html() + '\n\
                  ' + $( '<div>' ).append( descriptionObject ).html() + '\n\
                </div>\n\
            </div>\n\
        </div>'
			);
		} );

		$( document ).on( 'click', '.wp-simple-team__popup-overlay .popup_content .popup_close_btn', function() {
			$( '.wp-simple-team__popup-overlay' ).remove();
		} );

		$( document ).mouseup( function( e ) {
			const popup = $( '.wp-simple-team__popup-overlay .popup_content' );
			if ( ! popup.is( e.target ) && popup.has( e.target ).length === 0 ) {
				$( '.wp-simple-team__popup-overlay' ).remove();
			}
		} );
	} );
}( jQuery ) );
