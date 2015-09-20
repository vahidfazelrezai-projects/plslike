/**
 * Created by mefeakengin on 9/20/15.
 */

/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */


$(document).ready(function(){
    $("#uploadButton2").hide();
    $("#uploadedImage").hide();
    $("#socialMediaAdder").addClass("hidden");
    $("#analyticsBackground").addClass("hidden");
    $("#analyticsSpacer").addClass("hidden");
});


document.getElementById("uploadButton1").onclick = function() {
    $("#fileInput").click();
    $("#uploadedImage").show();
    $("#uploadButton1").hide();
    $("#uploadButton2").show();
};

document.getElementById("uploadButton2").onclick = function() {
    $("#fileInput").click();
};

$(function () {
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
	    $("#analyticsBackground").removeClass("hidden").addClass("visible");
	    $("#socialMediaAdder").removeClass("hidden").addClass("visible");
	    $("#analyticsSpacer").removeClass("hidden").addClass("visible");
        }
    });
});

function imageIsLoaded(e) {
    $('#uploadedImage').attr('src', e.target.result);
};


(function($) {
    "use strict"; // Start of use strict


})(jQuery); // End of use strict
