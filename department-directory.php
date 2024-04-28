<?php
/**
 * Plugin Name:       Department Directory
 * Plugin URI:        https://sunjayarmstead.com
 * Description:       A lightweight block for displaying department information.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.3
 * Author:            Sunjay Armstead
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       department-directory
 *
 * @package Department Directory
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function department_directory_department_listing_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'department_directory_department_listing_block_init' );
