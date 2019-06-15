<?php
/**
 * Plugin Name: WP Simple Team
 * Plugin URI: https://github.com/kknz/wp-simple-team/
 * Description: WP Simple Team for Gutenberg.
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
