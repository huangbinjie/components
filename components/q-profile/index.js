import { render } from '../utils.js'

class QProfile extends HTMLElement {
  get nickname() {
    return this.getAttribute('nickname')
  }

  set nickname(value) {
    return this.setAttribute('nickname', value)
  }

  get avatar() {
    return this.getAttribute('avatar')
  }

  set avatar(value) {
    return this.setAttribute('avatar', value)
  }

  get sex() {
    return this.getAttribute('sex')
  }

  set sex(value) {
    return this.setAttribute('sex', value)
  }

  get signature() {
    return this.getAttribute('signature')
  }

  set signature(value) {
    return this.setAttribute('signature', value)
  }

  get remark() {
    return this.getAttribute('remark')
  }

  set remark(value) {
    return this.setAttribute('remark', value)
  }

  get type() {
    return this.getAttribute('type')
  }

  set type(value) {
    return this.setAttribute('type', value)
  }

  static get observedAttributes() {
    return [ 'nickname', 'avatar', 'sex', 'signature', 'remark', 'type' ]
  }

  udpate() {
    if (!this.rendered) return

    this.querySelector('#nickname').innerText = this.nickname
    this.querySelector('#avatar').setAttribute('src', this.avatar)
    this.querySelector('#signature').innerHTML = this.signature

    if (this.remark) {
      this.querySelector('#remark').innerHTML = this.remark
    } else {
      this.querySelector('#remark').innerHTML = this.nickname
    }

    if (this.sex === 'men') {
      this.querySelector('#sex').classList.remove('web_wechat_women')
      this.querySelector('#sex').classList.add('web_wechat_men')
    } else if (this.sex === 'woman') {
      this.querySelector('#sex').classList.remove('web_wechat_men')
      this.querySelector('#sex').classList.add('web_wechat_woman')
    } else {
      this.querySelector('#sex').classList.remove('web_wechat_men')
      this.querySelector('#sex').classList.remove('web_wechat_woman')
      this.querySelector('#sex').classList.add('web_wechat_woman')
    }

    if (this.type === 'user') {
      this.querySelector('#label').innerHTML = '备注: '
      this.querySelector('#delete').innerHTML = '删除好友'
    } else if (this.type === 'room') {
      this.querySelector('#label').innerHTML = '群名: '
      this.querySelector('#delete').innerHTML = '退出群'
    } else {
      this.querySelector('#label').innerHTML = '备注: '
      this.querySelector('#delete').innerHTML = '删除好友'
    }
  }

  async connectedCallback() {
    await render(this, '/components/q-profile/index.html')
    this.rendered = true
    this.udpate()

    this.querySelector('#send').addEventListener('click', (event) => {
      this.dispatchEvent(new Event('send'))
    })

    this.querySelector('#delete').addEventListener('click', (event) => {
      this.dispatchEvent(new Event('delete'))
    })
  }

  attributeChangedCallback() {
    this.udpate()
  }
}

customElements.define('q-profile', QProfile)
