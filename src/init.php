<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @package WST
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function wp_simple_team_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'wp_simple_team-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ), // Dependency to include the CSS after it.
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'wp_simple_team-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'wp_simple_team-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// Localize the script with avatar url.
	$translation_array = array(
		'avatarURL' => plugins_url( '/images/avatar.jpg', dirname( __FILE__ ) ),
	);
	wp_localize_script( 'wp_simple_team-block-js', '_wpSimpleTeam', $translation_array );

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'wst/block-wp-simple-team',
		array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'wp_simple_team-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'wp_simple_team-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'wp_simple_team-block-editor-css',
		)
	);
}

// Hook: Block assets.
add_action( 'init', 'wp_simple_team_block_assets' );

/**
 * Enqueue Gutenberg block assets for frontend.
 *
 * @since 1.0.0
 */
function wp_simple_team_enqueue_script() {
	wp_enqueue_script(
		'wp-simple-team',
		plugins_url( '/dist/wp-simple-team.js', dirname( __FILE__ ) ),
		array( 'jquery' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/wp-simple-team.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);
}
add_action( 'wp_enqueue_scripts', 'wp_simple_team_enqueue_script' );
