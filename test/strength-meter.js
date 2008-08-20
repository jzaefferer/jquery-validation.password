(function() {

var input;	
var messages = $.validator.passwordRating.messages;

function check(messageKey) {
	input.valid();
	equals( $("#form .password-meter-message").text(), messages[messageKey] );
}

test("basic password strength meter", function() {
	
	$("#form").validate();
	
	input = $("#password");
	check("too-short");
	
	input.val("a");
	check("too-short");
	
	input.val("abc123@po");
	check("strong");
});

test("check similar username", function() {
	
	input = $("#password").removeClass();
	
	$("#form").validate({
		rules: {
			password: {
				password: "#username"
			}
		}
	});
	
	check("too-short");
	
	input.val("peterpeter");
	check("similar-to-username");
});

})();