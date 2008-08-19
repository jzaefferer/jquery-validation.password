test("ratings", function() {
	
	function rates(password, expectedMessage, expectedRating, username) {
		var rating = $.validator.passwordRating(password, username);
		equals(rating.rate, expectedRating, "rating for " + password);
		equals(rating.messageKey, expectedMessage);
	}
	
	rates(null, "too-short", 0);
	rates("", "too-short", 0);
	rates("a", "too-short", 0);
	rates("abcdefg", "too-short", 0);
	
	// long enough, but too simple: very weak
	rates("aaaaaaaa", "very-weak", 1);
	rates("@@@@@@@@", "very-weak", 1);
	
	// long enough and mixed characters: weak
	rates("Computer", "weak", 2);
	rates("computer", "weak", 2);
	rates("abcdefgh", "weak", 2);

	// letters and a number or upper and lowercase letters: good
	rates("computer1", "good", 3);
	rates("cOmputer", "good", 3);

	// letters and numbers or upper/lower and number, or letter and special: strong
	rates("computer12", "strong", 4);
	rates("c@mputer", "strong", 4);
	rates("cOmputer2", "strong", 4);
	
	// long pass phrase
	rates("my uncle ben has my password safe in his safe", "strong", 4);
	
	// differ from username
	rates("computer", "similar-to-username", 0, "computer");
	rates("cOmputer1", "similar-to-username", 0, "computer");
	
});
