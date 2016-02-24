$(document).ready(function() {
    // Build the guest lists.
    for (principal in friends) {
        friends[principal] = friends[principal].sort();
        for (i in friends[principal]) {
            $("." + principal + ".friends").append('<li><label class="control-label"><input type="checkbox" name="friends[' + principal + '][]" value="' + friends[principal][i] + '" /> <span>' + friends[principal][i] + "</span></label></li>");
        }
    }

    // Save click handler.
    $('.js-save').click(function(e){
        $(this).fadeOut(function(){$(this).fadeIn()}); 
        var side = $(e.currentTarget).data('side');
        $.post('.', {
            name: side,
            data: $("form ." + side + " input").serialize()
        });
    });

    // Checkbox click handler.
    $("body").on("change", "input", function() {
        var b = $("form").serializeJSON().friends || {};
        b.groom = b.groom || [], b.bride = b.bride || [], $(".common.friends").html(_.intersection(b.groom, b.bride).join("<li>")), $(".difference.friends").html(_.difference(b.groom, b.bride).concat(_.difference(b.bride, b.groom)).join("<li>"))
    }); 

    // On load, deserialize the saved data.
    $("form").deserialize(groom_saved); 
    $("form").deserialize(bride_saved); 

    // On load, nicely fade the page in.
    $("#background").fadeIn(function() { $(".container").fadeIn(1e3); }); 

    // Trigger a change to kick off the column logic.
    $("input:first").trigger("change");
});
