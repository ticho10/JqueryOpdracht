const $target = (get) => {
    if (!get) get = true;
    if ($('#main').is(':visible') && get === true) {
        return $('#main');
    } else {
        return $('#other');
    }
};

$('#fade-btn').click(function() {

    $target().FadeTrick();
});

$('#shake-btn').click(function() {

    $target().ShakeTrick();
});

$('#blob-btn').click(function() {

    const text = ($target().hasClass('is-blob') ? '' : 'Hover me ! ☻');
    $target().children().find('.main-label').text(text);
    $target().BlobTrick();
});

$('#swap-btn').click(function() {

    $target().SwapTrick({
        revert: $('#other').is(':visible')
    });
});