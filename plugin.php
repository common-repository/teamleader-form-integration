<?php

/**
 * Plugin Name: Teamleader Form Integration
 * Description: Plugin provides integration between your website and Teamleader CRM
 * Author: Teamleader <support@teamleader.eu>
 * Author URI: http://teamleader.eu
 * Version: 2.3.3
 */

require __DIR__ . '/vendor/autoload.php';

try {
	new \Teamleader\Bootstrap(__FILE__);
} catch (Exception $e) {
}
