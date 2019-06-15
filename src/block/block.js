/**
 * BLOCK: wp-simple-team
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const memberPlaceholder = {
	profileID: 0,
	// eslint-disable-next-line no-undef
	profileURL: _wpSimpleTeam.avatarURL,
	name: 'John Doe',
	position: 'Leader',
	description: __( 'Write the description…', 'wp-simple-team' ),
};

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'wst/block-wp-simple-team', {
	title: __( 'WP Simple Team', 'wp-simple-team' ),
	icon: 'groups',
	category: 'common',
	keywords: [
		__( 'wp-simple-team' ),
		__( 'wp simple team' ),
		__( 'simple team' ),
		__( 'team' ),
	],
	attributes: {
		members: {
			type: 'array',
			default: [ memberPlaceholder, memberPlaceholder, memberPlaceholder ],
			source: 'query',
			selector: '.team-member',
			query: {
				profileID: {
					type: 'number',
					source: 'attribute',
					selector: 'img',
					attribute: 'data-id',
				},
				profileURL: {
					source: 'attribute',
					selector: 'img',
					attribute: 'src',
				},
				name: {
					source: 'children',
					selector: '.name',
				},
				position: {
					source: 'children',
					selector: '.position',
				},
				description: {
					source: 'children',
					selector: '.description',
				},
			},
		},
		columns: {
			type: 'number',
			default: 3,
		},
		hasCroppedPhoto: {
			type: 'boolean',
			default: false,
		},
	},
	edit: function( props ) {
		return (
			<div className={ props.className }>
				<p>Hello World23</p>
			</div>
		);
	},
	save: function( props ) {
		return (
			<div className={ props.className }>
				<p>Hello World23</p>
			</div>
		);
	},
} );
