'use strict';

(function() {

  class Note {
    constructor(props = {}) {
      this.props = {
        colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
        ...props,
      };

      if (!this.props.color) {
        // default to a random color
        this.props.color = this.props.colors[
          Math.floor(Math.random() * this.props.colors.length)
        ];
      }
    }

    render() {
      const note = document.createElement('div');
      note.classList.add('note');
      note.classList.add(`note-${this.props.color}`);
      note.dataset.color = this.props.color;

      note.appendChild((new NoteBar({
        colors: this.props.colors
      })).render());
      note.appendChild((new NoteHeader()).render());
      note.appendChild((new NoteBody()).render());
      
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
      el.setAttribute('placeholder', this.props.placeholder);

      return el;
    }
  }

  class NoteBody {
    render() {
      const el = document.createElement('div');
      el.classList.add('note-body');
      el.appendChild(document.createElement('textarea'));

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
      el.classList.add('note-footer');

      this.props.colors.map((color) => {
        el.appendChild((new NoteColorButton({
          color
        })).render());
      });

      el.appendChild((new NoteDeleteButton()).render());

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

  class NoteAddButton {
    constructor(props = {}) {
      this.props = {
        container: null,
        ...props,
      };
    }

    handleClick(event) {
      this.props.container.appendChild((new Note()).render());
    }

    render() {
      const el = document.createElement('button');
      el.classList.add('note-add-btn');
      el.setAttribute('type', 'button');
      el.setAttribute('aria-label', 'Add');

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

      const addButton = (new NoteAddButton({
        container: notes
      })).render();
      container.appendChild(addButton);
      addButton.click();

      container.appendChild(notes);
    }
  }

  new App();
}());
