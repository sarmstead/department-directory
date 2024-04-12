<?php

$allowed_html = [
	'div' => [
		'class' => [],
		'id' => []
	],
	'p' => [
		'class' => [],
		'id' => []
	],
	'svg' => [
		'xmlns' => [],
		'fill' => [],
		'viewbox'  => [],
		'height' => [],
		'width' => [],
	],
	'path' => [
		'd' => [],
		'fill' => [],
	],
];

echo wp_kses($content, $allowed_html);
