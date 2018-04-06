/* Узнать ширину ползунка */
function getScrollbarWidth() {
	var
		documentWidth = parseInt(document.documentElement.clientWidth),
		windowWidth = parseInt(window.innerWidth);
	return windowWidth - documentWidth;
}
/* ========== */

/* Сделать боди фиксированным */
function toggleBodyScroll(noscroll) {
	var
		$body = $('body'),
		noScrollClass = 'noscroll',
		scrollWidth = getScrollbarWidth();

	if (noscroll === false) {
		$body
			.css('padding-right', '')
			.removeClass(noScrollClass);
	} else {
		$body
			.css('padding-right', scrollWidth)
			.addClass(noScrollClass);
	}
}
/* ========== */

/* Функция открытия / закрытия модалки */
function toggleModal(action, modalId) {

	var
		id = addIdHash(modalId),
		$modal = $(id),
		$body = $('body'),
		classBlock = 'modal',
		classVisible = classBlock + '_visible',
		classWrap = classBlock + '__wrap',
		classWrapVisible = classBlock + '__wrap_visible',
		classInput = 'input__item',
		classFog = 'fog',
		$wrap = $modal.find('.' + classWrap),
		delay = 300,
		closeOnEsc = function(event) { // Закрытие модалки при нажатии ESC
			if (event.keyCode != 27) return;
			toggleModal('close', id);
		};

	if (action == 'open') {

		if (!$modal.length) {
			console.log('Модалка не найдена!');
			return;
		}

		if ($modal.hasClass(classVisible)) {
			console.log('Модалка уже открыта!');
			return;
		}

		$modal.addClass(classVisible);

		toggleBodyScroll(true);

		$(document).on('keydown', closeOnEsc);

		setTimeout(function() {
			$wrap.addClass(classWrapVisible);
		}, 0);

		setTimeout(function() {
			$modal.find('.' + classInput).first().focus();
		}, delay * 2);
	}

	if (action == 'close') {

		if (!$modal.length) {
			console.log('Модалка не найдена!');
			return;
		}

		if (!$modal.hasClass(classVisible)) {
			console.log('Модалка уже закрыта!');
			return;
		}

		$(document).off('keydown', closeOnEsc);

		$modal
			.find('.' + classInput)
			.val('')
			.trigger('focusout');

		$modal
			.find('.js-' + classBlock + '__hidden-title')
			.val('');

		$wrap.removeClass(classWrapVisible);

		setTimeout(function() {
			$modal.removeClass(classVisible);
			toggleBodyScroll(false);
		}, delay);
	}
}
/* ========== */

/* Добавление хеша строке с ID */
function addIdHash(id) {

	if (id && id.charAt(0) !== '#') {
		id = '#' + id;
	}

	return id;
}
/* ========== */