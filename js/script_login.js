$('#myLogin').on('focus', function() {
	$('.logindiv').addClass('focused');
});

$('#myRegister').on('focus', function() {
	$('.registerdiv').addClass('focused');
});

// Login connection to database on submit event
$('#myLogin').on('submit', function(e) {
	// Adding the loading animation
	$('.logindiv').removeClass('focused').addClass('loading');
	
	// Preventing default action of form
	e.preventDefault();
	
	// Getting values from the form
	name = $('input[name=log_username]')[0].value;
	pswd = $('input[name=log_passwd]')[0].value;
	
	// Making an ajax call to server to check credentials
	$.ajax({
		url: "php/login.php",
		type: "POST",
		data: "log_username="+name+"&log_passwd="+pswd,
		success: function(result){
					if (result == 'Success')
						window.location.href = 'home.html';
					else {
						alert(result);
						$('.logindiv').removeClass('loading').addClass('focused')
					}
				}
	});
});

// Register connection to database on submit event
$('#myRegister').on('submit', function(e) {
	// Adding the loading animation
	$('.registerdiv').removeClass('focused').addClass('loading');
	
	// Preventing default action of form submission
	e.preventDefault();
	
	// Getting values from the form
	username = $('input[name=reg_username]')[0].value;
	email = $('input[name=reg_email]')[0].value;
	dob = $('input[name=reg_dob]')[0].value;
	pswd = $('input[name=reg_passwd]')[0].value;
	rpswd = $('input[name=reg_repasswd]')[0].value;

	if(pswd == rpswd){
		// Making an ajax call to server
		$.ajax({
			url: "php/register.php",
			type: "POST",
			data: "reg_username=" + username + "&reg_passwd=" + pswd + "&reg_email=" + email + "&reg_dob=" + dob,
			success: function(result){
						if (result == 'Success')
							window.location.href = 'home.html';
						else {
							alert(result);
							$('.registerdiv').removeClass('loading').addClass('focused')
						}
					}
		});
	} else {
		alert("The passwords don't match!");   
	}
});
