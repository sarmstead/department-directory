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
	'table' => [],
	'thead' => [],
	'tbody' => [],
	'tr' => [],
	'td' => [],
	'h3' => [],
	'strong' => [],
	'section' => [
		'class' => []
	],
	'article' => [],
	'em' => []
];

echo wp_kses($content, $allowed_html);
