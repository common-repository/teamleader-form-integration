<div id="teamleader">
	<div class="tl__message" data-action="message" style="display: none;">
	</div>
	<form>
		<h1><?php _e('Teamleader', $data['key']); ?></h1>
		<div class="tl__table">
			<div class="tl__heading">
				<?php _e('Plugin settings', $data['key']); ?>
			</div>
			<div class="tl__body">
				<?php _e(
					'In order to <strong>connect your form</strong> to Teamleader with WordPress, you need to:',
					$data['key']
				); ?>
				<div class="installation">
					<div class="tl__step">
						<span class="tl_circle">1</span>
						<?php _e(
							'Install the WordPress integration from the Teamleader Marketplace or Wordpress repository',
							$data['key']
						); ?>
					</div>
					<div class="tl__step">
						<span class="tl_circle">2</span>
						<?php _e(
							'<a href="https://marketplace.teamleader.eu/eu/en/manage/settings/eeb282" target="_blank">Go to the integrations settings</a> and <strong>connect a new form</strong>',
							$data['key']
						); ?>
					</div>
					<div class="tl__step">
						<span class="tl_circle">3</span>
						<?php _e(
							'After filling in the form, you\'ll see a <strong>Webhook URL</strong>. Copy this URL and paste it in the field below',
							$data['key']
						); ?>
						<div class="tl__webhook">
							<label>
								<?php _e('Webhook URL', $data['key']); ?>
								<input value="<?php echo isset($data['options']['webhook']) ? esc_url($data['options']['webhook']) : '' ?>" name="webhook" class="tl_input">
							</label>
							<button class="button button-primary" data-action="save-options">
								<?php _e('Save', $data['key']); ?>
							</button>
						</div>
					</div>
					<div class="tl__step">
						<span class="tl_circle">4</span>
						<?php _e(
							'Add new form below and include it on any Wordpress page using <strong>shortcode</strong>',
							$data['key']
						); ?>
					</div>
				</div>
			</div>
			<div class="tl__bottom">
				<span class="tl_circle">?</span>
				<?php _e(
					'Read more about this process in the <a href="http://support.teamleader.eu/" target="_blank">Teamleader Knowledge Base</a>',
					$data['key']
				); ?>
			</div>
		</div>

		<div class="tl__table">
			<div class="tl__heading">
				<?php _e('Additional settings', $data['key']); ?>
			</div>
			<div class="tl__body">
				<div class="tl__step">
					<h3><?php _e('Refferal settings', $data['key']); ?></h3>
					<label>
						<?php _e('Show Teamleader logo in the footer', $data['key']); ?>
						<input type="checkbox" data-action="logo" name="logo" <?php echo !empty($data['options']['logo']) ? 'checked' : '' ?>>
					</label>
					<div class="tl_description">
						<?php _e(
							'Say thanks for providing this free plugin and earn extra money with refferal program.',
							$data['key']
						); ?>
					</div>
				</div>
				<div class="tl__step" data-container="logo" style="display: none">
					<label>
						<?php _e('Refferal token', $data['key']); ?>
						<input name="referral" class="tl_input" value="<?php echo !empty($data['options']['referral']) ? esc_attr($data['options']['referral']) : '' ?>">
					</label>
					<div class="tl_description">
						<?php _e(
							'To know Your personal referral token go to: <a href="https://app.teamleader.eu/referrals.php" target="_blank">Teamleader.eu</a>',
							$data['key']
						); ?>
					</div>
				</div>
				<div class="tl__step">
					<h3><?php _e('Recaptcha Settings', $data['key']); ?></h3>
					<label>
						<?php _e('Enable Google Invisible reCAPTCHA', $data['key']); ?>
						<input type="checkbox" data-action="recaptcha" name="recaptcha[enable]" <?php echo !empty($data['options']['recaptcha']['enable']) ? 'checked' : '' ?>>
					</label>
					<div class="tl_description">
						<?php _e(
							'See more information and keys on <a href="https://www.google.com/recaptcha/admin#list" target=_blank">the official google website</a>.',
							$data['key']
						); ?>
					</div>
				</div>
				<div class="tl__step" data-container="recaptcha" style="display: none">
					<label>
						<?php _e('Site key', $data['key']); ?>
						<input name="recaptcha[key]" class="tl_input" value="<?php echo !empty($data['options']['recaptcha']['key']) ? esc_attr($data['options']['recaptcha']['key']) : '' ?>">
					</label>
					<div class="tl_description">
					</div>
				</div>
				<div class="tl__step" data-container="recaptcha" style="display: none">
					<label>
						<?php _e('Secret key', $data['key']); ?>
						<input name="recaptcha[secret]" class="tl_input" value="<?php echo !empty($data['options']['recaptcha']['secret']) ? esc_attr($data['options']['recaptcha']['secret']) : '' ?>">
					</label>
					<div class="description">
					</div>
				</div>
				<div class="tl__step">
					<button class="button button-primary" data-action="save-options">
						<?php _e('Save', $data['key']); ?>
					</button>
				</div>
			</div>
		</div>
	</form>

	<div data-container="forms">
		<?php foreach ($data['forms'] as $id => $form) : ?>
			<div class="tl__form" data-element="form<?php echo esc_attr($id); ?>">
				<div class="tl__form-title" data-element="formTitle">
					<?php echo esc_attr($form['form']['title']); ?>
				</div>
				<div class="tl__form-info">
					<?php _e('Display your form using shortcode below:', $data['key']); ?>
				</div>
				<div class="tl__form-shortcode">
					[teamleader id=<?php echo esc_attr($id); ?>]
				</div>
				<div class="tl__form-buttons">
					<button class="button button-primary" data-action="editForm" data-param="<?php echo esc_attr($id); ?>">
						<?php _e('Edit', $data['key']); ?>
					</button>
					<button class="button button-cancel" data-action="deleteForm" data-param="<?php echo esc_attr($id); ?>">
						<?php _e('Delete', $data['key']); ?>
					</button>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
	<div data-container="create"></div>
	<div data-container="edit"></div>

	<button class="button button-primary" data-action="createForm">
		<?php _e('Create new form', $data['key']); ?>
	</button>

	<script type="text/template" id="templateForm">
		<div class="tl__form" data-element="form">
            <div class="tl__form-title" data-element="title">
            </div>
            <div class="tl__form-info">
                <?php _e('Display your form using shortcode below:', $data['key']); ?>
            </div>
            <div class="tl__form-shortcode">
                [teamleader id=<span data-element="id"></span>]
            </div>
            <div class="tl__form-buttons">
                <button class="button button-primary" data-action="editForm" data-param="">
                    <?php _e('Edit', $data['key']); ?>
                </button>
                <button class="button button-cancel" data-action="deleteForm" data-param="">
                    <?php _e('Delete', $data['key']); ?>
                </button>
            </div>
        </div>
    </script>
	<script type="text/template" id="template">
		<form>
            <div class="tl_esc_html_edit tl__table">
                <div class="tl__heading">
                    <span data-element="titleCreate">
                      <?php _e('Create Form', $data['key']); ?>
                    </span>
                    <span data-element="titleEdit">
                      <?php _e('Edit Form', $data['key']); ?>
                    </span>
                </div>
                <div class="tl__body">
                    <div class="tl__step">
                        <label>
                            <?php _e('Form Title *', $data['key']); ?>
                            <input name="form[title]" class="tl_input" value=""
                                   data-element="formTitle"
                                   placeholder="<?php _e('New form', $data['key']); ?>">
                        </label>
                        <div class="tl_description">
                            <?php _e('Specify the name of the new form', $data['key']); ?>
                        </div>
                    </div>
                    <div class="tl__step">
                        <label>
                            <?php _e('Submit button text', $data['key']); ?>
                            <input name="form[submit]" value=""
                                   class="tl_input"
                                   data-element="formSubmit"
                                   placeholder="<?php _e('Send', $data['key']); ?>">
                        </label>
                        <div class="tl_description">
                            <?php _e('Specify the label of the submit button', $data['key']); ?>
                        </div>
                    </div>
                    <div class="tl__step">
                        <label>
                            <?php _e('After submission text', $data['key']); ?>
                            <input name="form[success]" value=""
                                   class="tl_input"
                                   data-element="formSuccess"
                                   placeholder="<?php _e('Thank you!', $data['key']); ?>">
                        </label>
                        <div class="tl_description">
                            <?php _e(
								'This is the text that is shown after the form has been successfully submitted',
								$data['key']
							); ?>
                        </div>
                    </div>
                </div>
                <div class="tl__heading">
                    <?php _e('Fields', $data['key']); ?>
                </div>
                <div class="tl__fields-container">
                    <?php foreach ($data['fields'] as $key => $field) : ?>
                        <div class="tl__field"
                             data-param="<?php echo esc_attr($key); ?>">
                            <div class="tl__active">
                                <input type="checkbox"
                                       name="<?php echo esc_attr($key); ?>[active]"
                                    <?php echo (true === $field['required']) ? 'checked disabled' : ''; ?>
                                       data-action="activateField"
                                       data-element="active"
                                       id="<?php echo esc_attr($key); ?>"
                                />
                            </div>
                            <div class="tl__name">
                                <strong>
                                    <label for="<?php echo esc_attr($key); ?>"><?php echo esc_attr($field['title']) ?></label>
                                </strong>
                                <div class="tl_description">
                                    <?php echo (true === $field['required']) ? _e(
										'Field is required',
										$data['key']
									) : ''; ?>
                                </div>
                            </div>
                            <div class="tl__label">
                                <?php _e('Field label', $data['key']); ?>
                                <input placeholder="<?php echo esc_attr($field['title']) ?>"
                                       name="<?php echo esc_attr($key); ?>[label]"
                                       class="tl_input"
                                       value=""
                                       data-element="label"
                                >
                            </div>
                            <div class="tl__default">
                                <label>
                                    <?php _e('Default value', $data['key']); ?>
                                    <?php if ($field['type'] === 'textarea') : ?>
                                        <textarea name="<?php echo esc_attr($key); ?>[default]" class="tl_input"
                                                  data-element="default"
                                        ></textarea>
                                    <?php else : ?>
                                        <input name="<?php echo esc_attr($key); ?>[default]"
                                               value="" class="tl_input"
                                               data-element="default"
                                        >
                                    <?php endif; ?>
                                </label>
                            </div>
                            <div class="tl__required">
                                <?php if (true !== $field['required']) : ?>
                                    <?php _e('Required?', $data['key']); ?>
                                    <div class="tl__radio">
                                        <label>
                                            <input type="radio" name="<?php echo esc_attr($key); ?>[required]" value="1"
                                                   data-action="requiredField"
                                                   data-element="requiredTrue"
                                            >
                                            <?php _e('Yes', $data['key']); ?>
                                        </label>
                                        <label>
                                            <input type="radio" name="<?php echo esc_attr($key); ?>[required]" value="0"
                                                   data-element="required"
                                                   data-action="requiredField" checked>
                                            <?php _e('No', $data['key']); ?>
                                        </label>
                                    </div>
                                <?php endif; ?>
                            </div>
                            <div class="tl__hidden" style="display: none;">
                                <?php if (true !== $field['required']) : ?>
                                    <?php _e('Hidden?', $data['key']); ?>
                                    <div class="tl__radio">
                                        <label>
                                            <input type="radio" name="<?php echo esc_attr($key); ?>[hidden]" value="1"
                                                   data-element="hiddenTrue"
                                                   data-action="hiddenField">
                                            <?php _e('Yes', $data['key']); ?>
                                        </label>
                                        <label>
                                            <input type="radio" name="<?php echo esc_attr($key); ?>[hidden]" value="0"
                                                   data-element="hidden"
                                                   data-action="hiddenField" checked>
                                            <?php _e('No', $data['key']); ?>
                                        </label>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                    <div class="tl__buttons">
                        <button type="button" class="button button-primary"
                                data-action="saveForm"><?php _e('Save changes', $data['key']); ?></button>
                        <button type="button" class="button button-primary"
                                data-action="addForm"><?php _e('Create', $data['key']); ?></button>
                        <button type="button" class="button button-cancel"
                                data-action="discardForm"><?php _e('Discard changes', $data['key']); ?></button>
                    </div>
        </form>
    </script>
	<script>
		(function($) {
			$(document).ready(function() {
				TeamleaderAdmin({
					key: 'teamleader',
					url: '<?php echo admin_url('admin-ajax.php'); ?>',
					nonce: '<?php echo wp_create_nonce('teamleader'); ?>',
					container: $('#teamleader'),
				})
			})
		}(jQuery))
	</script>
</div>