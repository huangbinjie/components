import { render } from '../utils.js'

class QFriendItem extends HTMLElement {

  get displayName() { return this.getAttribute('display-name') }
  set displayName(value) { return this.setAttribute('display-name', value) }

  get avatar() { return this.getAttribute('avatar') }
  set avatar(value) { return this.setAttribute('avatar', value) }

  get active() { return this.hasAttribute('active') }
  set active(value) { return value ? this.setAttribute('active', '') : this.removeAttribute('active') }

  static get observedAttributes() {
    return ['display-name', 'avatar', 'active']
  }

  udpate() {

    if (!this.rendered) return
    this.querySelector('#name').innerText = this.displayName
    this.querySelector('#avatar').setAttribute('src', this.avatar)

    if (this.active) {
      this.firstElementChild.classList.add('active')
    } else {
      this.firstElementChild.classList.remove('active')
    }
  }

  async connectedCallback() {
    await render(this, '/components/q-friend-item/index.html')
    this.rendered = true
    this.udpate()
  }

  attributeChangedCallback() {
    this.udpate()
  }
}

customElements.define('q-friend-item', QFriendItem)
