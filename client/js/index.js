/**
 * Created by mefeakengin on 9/20/15.
 */
/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

document.getElementById("getStarted").onclick = function () {
    location.href = "instagram/auth";
};

document.getElementById("uploadButton").onclick = function() {
    $("#fileInput").click();
};

$(document).ready(function(){
    $("row").hide();
    //why not show on lock
    $("row").click(function(){
        $("row").show();
    });
});

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
