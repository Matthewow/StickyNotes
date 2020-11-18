var server = null;
var port = null;
var submittype = null;
var url = "http://" + server + ":" + port; // to be modified

function submit(submittype){

    
    if (submittype == 1){
        console.log("Sign in ...");
        username = document.getElementById("sign-in-user").value;
        password = document.getElementById("sign-in-pass").value;
        post(username, password, null, submittype);
    }
    else if (submittype == 2){
        console.log("Sign up...");
        username = document.getElementById("sign-up-user").value;
        password1 = document.getElementById("sign-up-pass1").value;
        password2 = document.getElementById("sign-up-pass2").value;
        email = document.getElementById("email-address").value;
        if(password1 !== password2)
            alert("Please double check your passwords, they are different");
        else
            post(username, password1, email, submittype);
    }
    
}

function post(username, password, email, submittype){

    var url = 'http://PCofZhao:10004/';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
    var response;

    xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			response = JSON.parse(this.responseText);
			var result = response["status"];
			if (result == "successful"){
                var x = document.getElementById('login-in-area');
                x.style.display = "none";
                
			}
			else if (result == "failed-full"){
				
			}
			else{
				alert("Invalid Input");
			}			
		}
	};

    
    if (submittype == 1){
        xhr.send(JSON.stringify({
            'request': "signin",
            'username': username,
            'password': password
        }));
        console.log("Signing up with "+ username);
    }
    if (submittype == 2){
        xhr.send(JSON.stringify({
            'request': "signup",
            'username': username,
            'password': password,
            'email': email
        }));
        console.log("Signing in with "+ username);
    }

}