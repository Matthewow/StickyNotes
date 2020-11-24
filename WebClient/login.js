var submittype = null;
var userid = null;
var noteinfo = null;
var infocolor = null;
var infotitle =null;
var infocontent = null;
var infonoteid = null;
var infofontsize = null;


(function() {

  class Note {
    constructor(props = {}) {
      this.props = {
        colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
        noteid: "Undefined",
        fontsizes: [12, 14, 16, 18, 20],
        ...props,
      };

      if (!this.props.color) {
        this.props.color = this.props.colors[
          Math.floor(Math.random() * this.props.colors.length)
        ];
      }
    }

    render() {
      const note = document.createElement('div');
      note.setAttribute("id", infonoteid);
      note.classList.add('note');
      note.classList.add(`note-${this.props.color}`);
      note.dataset.color = this.props.color;
      note.dataset.title = this.props.title;
      note.dataset.content = this.props.content;
      note.dataset.noteid = this.props.noteid;
      note.dataset.fontsize = this.props.fontsize;

      note.appendChild((new NoteBar({
        colors: this.props.colors
      })).render());
      note.appendChild((new NoteHeader()).render());
      note.appendChild((new NoteBody({
          content: note.dataset.content
      })).render());
      
      return note;
    }
  }

  class NoteHeader {
    render() {
      const el = document.createElement('div');
      el.classList.add('note-header');
      el.appendChild((new NoteTitle()).render());
      return el;
    }
  }

  class NoteTitle {
    constructor(props = {}) {
      this.props = {
        placeholder: 'Untitled Note',
        ...props,
      };
    }

    render() {
      const el = document.createElement('input');
      el.classList.add('note-title');
      el.setAttribute('type', 'text');
      el.setAttribute('id', infonoteid + 'title');
      el.setAttribute('value', infotitle);
      return el;
    }
  }

  class NoteBody {
    constructor(props = {}) {
        this.props = {
          ...props,
        };
      }
    render() {
      const el = document.createElement('div');
      el.classList.add('note-body');
      const el2 = document.createElement('textarea')
      el.appendChild(el2);
      el2.innerHTML = infocontent;
      el2.setAttribute('id', infonoteid + 'content');
      if (infofontsize == "undefined")
        el2.style.fontSize = "12pt"
    else
        el2.style.fontSize = infofontsize;
      return el;
    }
  }

  class NoteBar {
    constructor(props = {}) {
      this.props = {
        colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
        ...props,
      };
    }

    render() {
      const el = document.createElement('div');
      el.setAttribute("id", infonoteid + "bar")
      el.classList.add('note-footer');

      this.props.colors.map((color) => {
        el.appendChild((new NoteColorButton({
          color
        })).render());
      });

      el.appendChild((new NoteFontLargeButton()).render());
      el.appendChild((new NoteFontSmallButton()).render());
      el.appendChild((new NoteSaveButton()).render());
      el.appendChild((new NoteDeleteButton()).render());
      el.appendChild((new NotePinButton()).render());

      return el;
    }
  }

  class NoteColorButton {
    constructor(props = {}) {
      this.props = {
        color: '',
        ...props,
      };
    }

    handleClick(event) {
      const button = event.currentTarget;
      const note = button.closest('.note');
      note.classList.remove(`note-${note.dataset.color}`);
      note.classList.add(`note-${button.dataset.color}`);
      note.dataset.color = button.dataset.color;
    }

    render() {
      const el = document.createElement('button');
      el.classList.add('note-color-btn', `note-${this.props.color}`);
      el.setAttribute('type', 'button');
      el.setAttribute('title', this.props.color);
      el.setAttribute('aria-label', this.props.color);
      el.dataset.color = this.props.color;

      el.addEventListener('click', this.handleClick);

      return el;
    }
  }

  class NoteDeleteButton {
    handleClick(event) {
      const note = event.currentTarget.closest('.note');
      notepost("delete", note.id, "", "", "12", " ");
      note.parentNode.removeChild(note);
    }

    render() {
      const el = document.createElement('button');
      el.classList.add('note-delete-btn');
      el.setAttribute('type', 'button');
      el.setAttribute('aria-label', 'Delete');

      const icon = document.createElement('i');
      icon.classList.add('fa', 'fa-trash');
      el.appendChild(icon);

      el.addEventListener('click', this.handleClick);

      return el;
    }
  }

  class NoteFontLargeButton {
    handleClick(event) {
      const note = event.currentTarget.closest('.note');
      var size = document.getElementById(note.id + "content").style.fontSize;
      if (size == '' || size == null || size == undefined){
            size = "12pt";
            document.getElementById(note.id + "content").style.fontSize = "12pt"
      }
      console.log( document.getElementById(note.id + "content").style.fontSize);
      document.getElementById(note.id + "content").style.fontSize = (parseInt(size)+2)+"pt";
      console.log("size larger", document.getElementById(note.id + "content").style.fontSize)
    }

    render() {
      const el = document.createElement('button');
      el.classList.add('note-font-btn-large');
      el.setAttribute('type', 'button');
      el.setAttribute('aria-label', 'Large');

      const icon = document.createElement('i');
      icon.classList.add('fa', 'fa-font');  
      el.appendChild(icon);
      el.addEventListener('click', this.handleClick);
      return el;
    }
  }

  class NoteFontSmallButton {
    handleClick(event) {
      const note = event.currentTarget.closest('.note');
      var size = document.getElementById(note.id + "content").style.fontSize;
      if (size == '' || size == null || size == undefined){
        size = "12pt";
        document.getElementById(note.id + "content").style.fontSize = "12pt"
  }
      document.getElementById(note.id + "content").style.fontSize = (parseInt(size)-2)+"pt";
      console.log("size smaller")
    }

    render() {
      const el = document.createElement('button');
      el.classList.add('note-font-btn-small');
      el.setAttribute('type', 'button');
      el.setAttribute('aria-label', 'Small');

      const icon = document.createElement('i');
      icon.classList.add('fa', 'fa-font', 'fa-xs');
      el.appendChild(icon);
      el.addEventListener('click', this.handleClick);
      return el;
    }
  }

  class NoteSaveButton {
    handleClick(event) {    
      const note = event.currentTarget.closest('.note');
      note.dataset.noteid = note.id;
      note.dataset.title = document.getElementById(note.id + "title").value;
      note.dataset.content = document.getElementById(note.id + "content").value;
      note.dataset.fontsize =  document.getElementById(note.id + "content").style.fontSize;
      notepost("update", note.dataset.noteid, note.dataset.title, note.dataset.color, note.dataset.fontsize, note.dataset.content);
    }

    render() {
      const el = document.createElement('button');
      el.classList.add('note-save-btn');
      el.setAttribute('type', 'button');
      el.setAttribute('aria-label', 'Save');

      const icon = document.createElement('i');
      icon.classList.add('fa', 'fa-save');
      el.appendChild(icon);

      el.addEventListener('click', this.handleClick);

      return el;
    }
  }

  class NotePinButton {
    handleClick(event) {    
      var a = this.id;

      const note = document.getElementById(a.substring(0,32))
      if (this.classList.contains('note-pin-btn')){
        this.classList.remove("note-pin-btn");
        this.classList.add("note-unpin-btn");
        note.classList.remove("note");
        note.classList.add("note-mv");
      }
      else if (this.classList.contains('note-unpin-btn')){
        this.classList.remove("note-unpin-btn");
        this.classList.add("note-pin-btn");
        note.classList.remove("note-mv");
        note.style.top = note.offsetTop + "px";
        note.style.left = note.offsetLeft + "px";
        note.classList.add("note");
      }
    }

    render() {
      const el = document.createElement('button');
      el.classList.add('note-pin-btn');
      el.setAttribute('type', 'button');
      el.setAttribute('id', infonoteid + "pin");
      el.setAttribute('aria-label', 'Pin');

      const icon = document.createElement('i');
      icon.classList.add("fas", "fa-thumbtack");
      el.appendChild(icon);

      el.addEventListener('click', this.handleClick);

      return el;
    }
  }

  class NoteAddButton {
    constructor(props = {}) {
      this.props = {
        container: null,
        ...props,
      };
    }

    handleClick() {
        console.log(noteinfo)
        if (noteinfo){
            var noteid = noteinfo["noteId"];
            var title = noteinfo["title"];
            var color = noteinfo["backcolor"];
            var fontsize = noteinfo["font"];
            var content = noteinfo["content"];

            this.props.container.appendChild((new Note({
                noteid: noteid,
                title: title,
                color: color,
                fontsize: fontsize,
                content: content
            })).render());
        }
        else{
            infonoteid = makeid(32);
            console.log(infonoteid);
            notepost("create", infonoteid, "Untitled", "", "12pt", "");
            this.props.container.appendChild((new Note({})).render());
            dragElement(document.getElementById(infonoteid));
        }
    }

    render() {
      const el = document.createElement('button');
      el.classList.add('note-add-btn');
      el.setAttribute('type', 'button');
      el.setAttribute('aria-label', 'Add');
      el.setAttribute('id', 'note-add-button');


      const icon = document.createElement('i');
      icon.classList.add('fa', 'fa-plus');
      el.appendChild(icon);

      const label = document.createElement('span');
      label.textContent = ' Add a note';
      el.appendChild(label);

      el.addEventListener('click', this.handleClick.bind(this));

      return el;
    }
  }

  class LogoutButton {
    constructor(props = {}) {
      this.props = {
        container: null,
        ...props,
      };
    }

    handleClick() {
        location.reload();
    }

    render() {
      const el = document.createElement('button');
      el.classList.add('note-add-btn');
      el.setAttribute('type', 'button');
      el.setAttribute('aria-label', 'close');
      el.setAttribute('id', 'note-logout-button');

      const icon = document.createElement('i');
      icon.classList.add('fa', 'fa-times');
      el.appendChild(icon);

      const label = document.createElement('span');
      label.setAttribute("id", "logoutbutton");
      label.textContent = 'Log Out';
      el.appendChild(label);

      el.addEventListener('click', this.handleClick.bind(this));

      return el;
    }
  }
  

  class App {
    constructor(props = {}) {
      this.props = {
        id: 'app',
        ...props,
      };
      this.render();
    }

    render() {
      const container = document.getElementById(this.props.id);
      const notes = document.createElement('div');
      notes.setAttribute("id", infonoteid);
      const addButton = (new NoteAddButton({
        container: notes
      })).render();
      const logoutButton = (new LogoutButton({
        container: notes
      })).render();
      container.appendChild(addButton);
      container.appendChild(logoutButton);
      container.appendChild(notes);
    }
  }

  new App();
}());


function notepost(type, noteid, title, color, fontsize, content){

  var url = "none"
  var method = "POST"
    var server = "stickynotes-env.eba-b3wzhjhx.us-east-1.elasticbeanstalk.com/api"
    if(type == "create"){
        url = "http://" + server + "/newNote/" + userid;
        method = "PUT";
    }
    if(type == "update"){
        url = "http://" + server + "/save";
        method = "POST"
    }
    if(type == "delete"){   
        url = "http://" + server + "/" + noteid;
        method = "DELETE";
    }


	var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    console.log(method, url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
    var response;
    var request;
    
    if (type == "create"){
        request = JSON.stringify({
            "noteId": noteid,
            "content":content,
            "title": title,
            "backcolor": color,
            "font":fontsize
        })
        console.log("Trying to create a note...");
    }
    if (type == "update"){
        console.log(noteid, content);
        request = JSON.stringify({
            "noteId": noteid,
            "content":content,
            "title": title,
            "backcolor": color,
            "font":fontsize
        })
        console.log("Updateing a note...");
    }
    if (type == "delete"){
        request = JSON.stringify({
            'request': "delete"
        })
        console.log("deleted a note...");
    }

    // fetch (url, {
    //     method: method,
    //     body: request,
    //     headers: new Headers({
    //         'Content-Type':'application/json'
    //     })
    // }).then(result => result.json())
    // .catch(error => console.error("Error: ", error))
    // .then(response => {
    //     console.log("Response: \n", response);
    //     var result = response["status"];
    //         console.log("result\n" + response)
	// 		if (result == "successful"){
    //             if(type == "create"){
    //                 console.log("2");
    //                 infonoteid = response["uuid"];
    //                 return response["uuid"];
    //             }
	// 		}
	// 		else if (result == "fail"){
    //             alert("Fail to " + type + " a Note...");
	// 		}		
    // })



    xhr.send(request);
    console.log("request: \n", request);

    xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
            console.log(response);
			response = JSON.parse(this.responseText);
            var result = response["status"];
            console.log("result\n" + result)
			if (result == "successful"){
                if(type == "create"){
                    infonoteid = response["uuid"];
                    return response["uuid"];
                }
			}
			else if (result == "fail"){
                alert("Fail to " + type + " a Note...");
			}		
        }
        else if(this.status == 400){
            alert("Maybe the server is down...");
        }
	};

}


function submit(submittype){

    
    if (submittype == 1){
        console.log("Sign in ...");
        username = document.getElementById("sign-in-user").value;
        password = document.getElementById("sign-in-pass").value;
        userpost(username, password, null, submittype);
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
            userpost(username, password1, email, submittype);
    }
    
}

function userpost(username, password, email, submittype){

    var url = 'http://stickynotes-env.eba-b3wzhjhx.us-east-1.elasticbeanstalk.com/api/authentify';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
    var response;
    
    if (submittype == 1){
        xhr.send(JSON.stringify({
            "request": "signin",
            "username": username,
            "password": password
        }));
        console.log("Signing in with "+ username);
    }
    if (submittype == 2){
        xhr.send(JSON.stringify({
            "request": "signup",
            "username": username,
            "password": password,
            "email": email
        }));
        console.log("Signing up with "+ username);
    }

    xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == "200") {
            response = JSON.parse(this.responseText);
            console.log("signin\n", response)
			var result = response["description"];
			if (result == "Successful"){
                var x = document.getElementById('login-in-area');
                x.style.display = "none";
                var y = document.getElementById('app');
                y.style.display = "block";
                userid = username;
                document.getElementById("logoutbutton").textContent = ' Hi, ' + userid + ' Click Here to Log Out';
                var notelist = response["noteList"];
                createpage(notelist)
			}
			else{
				alert("Wrong password. Try again or double check your username.");
			}			
		}
	};
}

function createpage (noteList){
    const addButton = document.getElementById("note-add-button");
    for (var i = 0; noteList[i]; i++){
        noteinfo =  noteList[i];
        infonoteid = noteinfo["noteId"];
        infotitle = noteinfo["title"];
        infocolor = noteinfo["backcolor"];
        infofontsize = noteinfo["font"];
        infocontent = noteinfo["content"];
        addButton.click();
        console.log("debug",infonoteid)
        dragElement(document.getElementById(infonoteid));
    }
    noteinfo = false;
    infocolor = null;
    infotitle ="Untitled";
    infocontent = "Type here...";
    infonoteid = null;
    infofontsize = null;
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
 function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "bar")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "bar").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
