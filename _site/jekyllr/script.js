window.cors_proxy = "http://cors.io/?u=";


// Push to Github
function git_push(docu, data_head, password) { 
	var github_username = 'espresso-math'; // github username
	var github_password = password;
	var github_repo = 'dropbox-deploy';

	var github = new GitHub({
		username: github_username,
		password: github_password
	});

	var repo = github.getRepo(github_username, github_repo);

	var options = {
	  author: {name: 'Jekyll Admin', email: 'automation@automation'},
	  committer: {name: 'Jekyll Admin', email: 'automation@automation'},
	  encode: true // Whether to base64 encode the file. (default: true) 
	}

	var path = 'travis/hbin/' + data_head;
	repo.writeFile('master', path, docu, 'Delivered by Jekyll Admin', options, function(err) {
		if (err) {
			console.log(err);
			document.getElementById("travis").innerHTML = "Failure!";
		} else {
			document.getElementById("travis").innerHTML = "Success!";
		}
	});
}

// Hastebin

function hastebin(haste_key, gittoken, data_head) {
	$.get(window.cors_proxy + 'http://hastebin.com/documents/' + haste_key)
	.done (function (data) {
	  	var docu = JSON.parse(data);
	  	git_push(docu.data, data_head, gittoken );
	}).fail(function (err) {
	  	console.log(err);
	});
}

function hastesync() {
	var haste_key = document.getElementById("hastekey").value;
	var clean_pass = document.getElementById("password").value;
	var title = document.getElementById("title").value;
	if (haste_key != "" && clean_pass != "" && title != "") {
		var bytes  = CryptoJS.AES.decrypt(window.encrypted_gittoken, clean_pass);
		var plaintext = bytes.toString(CryptoJS.enc.Utf8);
		var d = new Date();
		var data_head = d.getFullYear() + '-' + ("0" + d.getMonth()).slice(-2) + '-' + ("0" + d.getDay()).slice(-2) + '-' + title.toLowerCase().split(' ').join('-') + '.md';
		
		hastebin(haste_key, plaintext, data_head);
	} else {
		console.log("some fields are incomplete");
	}
}

// Random String

function randomGen(n) {
		var stng = "";
		var alphabet = "ELjklmnostuvMNOPQRSTUpFGHIrabcdefghiwxyzABCDJKqVWXYZ";
		while (stng.length < n) {
			stng += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		}
		return stng;
}

// Travis

function travis_ci() {
	var password = $("#password").val();
	var name = randomGen(23) + '.dmb';
	var docu = randomGen(2345);
	git_push(docu, name, password);
}

$(document).ready( function() {
	$("#travis").click( function() {
		travis_ci();
	});
});