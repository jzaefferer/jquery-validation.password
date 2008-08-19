(function() {

var input;	
var messages = $.validator.passwordRating.messages;

function check(messageKey) {
	input.valid();
	if (!messageKey) {
		equals( input.next(":visible").text(), $.validator.messages.required );
	} else {
		equals( input.next(":visible").text(), messages[messageKey] );
	}
}

test("basic password strength meter", function() {
	
	$("#form").validate();
	
	input = $("#password");
	check();
	
	input.val("a");
	check("too-short");
	
	input.val("");
	check();
	
	input.val("abc123@po");
	check("strong");
});

test("check similar username", function() {
	
	input = $("#password").removeClass();
	
	$("#form").validate({
		rules: {
			password: {
				required: true,
				password: "#username"
			}
		}
	});
	
	check();
	
	input.val("peterpeter");
	check("similar-to-username");
});

})();