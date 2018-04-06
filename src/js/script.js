/* Modal */
/* ===== */

$(function() {

	/* Modal */
	(function() {
		var
			$links = $('[data-modal]'),
			classBlock = 'modal',
			classClose = classBlock + '__close',
			classAccord = 'accord';

		if (!$links.length) return;

		$links.each(function() {
			var
				$this = $(this),
				id = addIdHash($this.attr('data-modal'));

			if (!$(id).length) return;

			// Клик по кнопке, открывающей модалку
			$this.on('click', function() {
				var isAccord = !!($this.parents('.' + classAccord).length);

				toggleModal('open', id);

				if (isAccord) {
					var title = $this
						.parents('.' + classAccord + '__body')
						.prev()
						.find('.' + classAccord + '__title')
						.text();

					$(id).find('.js-' + classBlock + '__hidden-title').val(title);
				}

				return false;
			});
			// =====

			// Клик по кнопке "закрыть"
			$(id).find('.' + classClose).on('click', function() {
				toggleModal('close', id);
			});
			// =====

			// Клик по серому фону
			$(id).on('click', function(event) {
				if (!$(event.target).hasClass(classBlock)) return;
				toggleModal('close', id);
			});
			// =====
		});
	}());
	/* ===== */

	/* Area */
	(function() {
		var
			$block = $('.area'),
			$info = $block.find('.area__info'),
			$items = $block.find('.area__item');

		/* Info */
		if ($info.length) {

			$items.on('mouseenter', function() {
				var
					$this = $(this),
					text = $this.attr('data-title'),
					pos = $this.position();

				if (!text) return;

				$info
					.text(text)
					.css({
						opacity: '1',
						top: pos.top,
						left: pos.left - $info.innerWidth()
					})
			});

			$items.on('mouseleave', function() {
				$info.css({
					opacity: ''
				})
			});
		}
		/* ==== */
	}());
	/* ==== */
});