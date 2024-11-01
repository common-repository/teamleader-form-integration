<?php

namespace Teamleader\Controllers;

use Teamleader\DependencyInjection\Container;
use Teamleader\Interfaces\HooksInterface;
use Teamleader\Interfaces\AjaxInterface;
use Teamleader\Helpers\OptionsHelper;
use Teamleader\Helpers\FormsHelper;
use ReCaptcha\ReCaptcha;

/**
 * Class AjaxHandler
 * @package Teamleader\Controllers
 */
class AjaxController extends AbstractController implements HooksInterface, AjaxInterface
{

	/**
	 * @var
	 */
	protected $data;

	/**
	 * Set Wordpress hooks
	 */
	public function initHooks()
	{
		add_action('wp_ajax_' . Container::key(), [$this, 'frontHandler']);
		add_action('wp_ajax_nopriv_' . Container::key(), [$this, 'frontHandler']);

		add_action('wp_ajax_teamleader_get', [$this, 'getForm']);
		add_action('wp_ajax_teamleader_save', [$this, 'saveForm']);
		add_action('wp_ajax_teamleader_options', [$this, 'saveOptions']);
		add_action('wp_ajax_teamleader_create', [$this, 'createForm']);
		add_action('wp_ajax_teamleader_delete', [$this, 'deleteForm']);
	}

	/**
	 * @return bool
	 */
	protected function checkNonce()
	{
		if (!isset($_POST['nonce'])) {
			$this->data['message'] = __('Security Error', Container::key());

			return false;
		}

		if (wp_create_nonce('teamleader') !== $_POST['nonce']) {
			$this->data['message'] = __('Security Error', Container::key());

			return false;
		}

		return true;
	}

	/**
	 * @throws \Exception
	 */
	public function frontHandler()
	{
		$this->data['success'] = false;
		$options               = OptionsHelper::getOptions();

		if (!empty($options['recaptcha']['enable']) && !empty($options['recaptcha']['secret'])) {
			$recaptcha = new ReCaptcha($options['recaptcha']['secret']);
			$resp      = $recaptcha->verify($_POST['g-recaptcha-response']);

			if (false === $resp->isSuccess()) {
				$this->data['message'] = __('Recaptcha invalid', Container::key());
				return $this->renderJson();
			}
		}

		if (null === $_POST['nonce'] || false === wp_verify_nonce($_POST['nonce'], Container::key())) {
			$this->data['message'] = __('Security error. Please, reload the page', Container::key());

			return $this->renderJson();
		}

		$body = $this->sanitize_text_or_array_field($_POST);

		try {
			$args = array(
				'body'        => $body,
				'timeout'     => '5',
				'redirection' => '5',
				'httpversion' => '1.0',
				'blocking'    => true,
				'headers'     => array(),
				'cookies'     => array(),
			);
			$response = wp_remote_post($options['webhook'], $args);

			if (is_wp_error($response)) {
				$this->data['message'] = $response->get_error_message();
				return $this->renderJson();
			}

			$this->data['success'] = true;
			$this->data['message'] = __('Data sent', Container::key());
		} catch (\LogicException $exception) {
			$this->data['message'] = $exception->getMessage();
		}

		return $this->renderJson();
	}

	/**
	 * Store plugin options in database
	 *
	 */
	public function saveOptions()
	{
		$this->data['success'] = false;

		if (false === $this->checkNonce()) {
			return $this->renderJson();
		}

		$post = $this->sanitize_text_or_array_field($_POST);
		if (empty($post['webhook'])) {
			$this->data['message'] = __('Webhook is empty', Container::key());

			return $this->renderJson();
		}

		OptionsHelper::setOptions($post);
		$this->data['success'] = true;
		$this->data['message'] = __('Settings saved', Container::key());

		return $this->renderJson();
	}

	/**
	 *
	 * @throws \ReflectionException
	 * @throws \LogicException
	 */
	public function getForm()
	{
		$this->data['success'] = false;

		$post = $this->sanitize_text_or_array_field($_POST);
		if (!isset($post['id']) || false === $this->checkNonce()) {
			return $this->renderJson();
		}

		/**
		 * @var $formsHelper FormsHelper
		 */
		$formsHelper = $this->container->get(FormsHelper::class);
		$form        = $formsHelper->getForm((int) $post['id']);

		if (null === $form) {
			$this->data['message'] = __('Form not found');

			return $this->renderJson();
		}

		$this->data['success'] = true;
		$this->data['form']    = $form;

		return $this->renderJson();
	}

	/**
	 *
	 * @throws \ReflectionException
	 * @throws \Exception
	 * @throws \LogicException
	 */
	public function saveForm()
	{
		$this->data['success'] = false;

		if (false === $this->checkNonce()) {
			return $this->renderJson();
		}

		$post = $this->sanitize_text_or_array_field($_POST);
		if (empty($post['form']) && !isset($post['id'])) {
			$this->data['message'] = __('Form is empty', Container::key());

			return $this->renderJson();
		}

		/**
		 * @var $formsHelper FormsHelper
		 */
		$formsHelper = $this->container->get(FormsHelper::class);

		try {
			$this->data['id']      = $formsHelper->updateForm((int) $post['id'], $post);
			$this->data['success'] = true;
			$this->data['message'] = __('Form saved', Container::key());
		} catch (\LogicException $exception) {
			$this->data['message'] = __('System error', Container::key());
		}

		return $this->renderJson();
	}

	/**
	 * @throws \Exception
	 */
	public function createForm()
	{
		$this->data['success'] = false;

		if (false === $this->checkNonce()) {
			return $this->renderJson();
		}

		$post = $this->sanitize_text_or_array_field($_POST);

		if (empty($post['form'])) {
			$this->data['message'] = __('Form is empty', Container::key());

			return $this->renderJson();
		}

		/**
		 * @var $formsHelper FormsHelper
		 */
		$formsHelper = $this->container->get(FormsHelper::class);

		try {
			$this->data['id']      = $formsHelper->createForm($post);
			$this->data['success'] = true;
			$this->data['message'] = __('Form created', Container::key());
		} catch (\LogicException $exception) {
			$this->data['message'] = __('System error', Container::key());
		}

		return $this->renderJson();
	}

	/**
	 *
	 * @throws \ReflectionException
	 * @throws \LogicException
	 */
	public function deleteForm()
	{
		$this->data['success'] = false;

		if (false === $this->checkNonce()) {
			return $this->renderJson();
		}

		$post = $this->sanitize_text_or_array_field($_POST);
		if (!isset($post['id'])) {
			$this->data['message'] = __('Nothing to delete', Container::key());

			return $this->renderJson();
		}

		/**
		 * @var $formsHelper FormsHelper
		 */
		$formsHelper = $this->container->get(FormsHelper::class);
		$formsHelper->deleteForm((int) $post['id']);

		$this->data['success'] = true;
		$this->data['message'] = __('Form was deleted', Container::key());

		return $this->renderJson();
	}

	/**
	 * Recursive sanitation for text or array
	 * 
	 * @param $array_or_string (array|string)
	 * @since  0.1
	 * @return mixed
	 */
	public function sanitize_text_or_array_field($array_or_string)
	{
		if (is_string($array_or_string)) {
			$array_or_string = sanitize_text_field($array_or_string);
		} elseif (is_array($array_or_string)) {
			foreach ($array_or_string as $key => &$value) {
				if (is_array($value)) {
					$value = $this->sanitize_text_or_array_field($value);
				} else {
					$value = sanitize_text_field($value);
				}
			}
		}

		return $array_or_string;
	}

	/**
	 *
	 */
	public function renderJson()
	{
		echo json_encode($this->data);
		wp_die();
	}
}
