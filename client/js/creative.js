/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

document.getElementById("getStarted").onclick = function () {
    location.href = "instagram/auth";
};

$(function () {
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
});

function imageIsLoaded(e) {
    $('#uploadedImage').attr('src', e.target.result);
};


(function($) {
    "use strict"; // Start of use strict


})(jQuery); // End of use strict
