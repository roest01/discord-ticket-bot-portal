/*
 * Small microservice to generate a Discord-like chat section
 * Copyright (C) 2020 Bowser65
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { createUserPopout } from '../utils'

class MessageAvatar extends HTMLImageElement {
  constructor () {
    super()
    this.onError = this.onError.bind(this)
  }

  connectedCallback () {
    this.addEventListener('error', this.onError)
    const contents = this.nextElementSibling.nextElementSibling
    createUserPopout(this, {
      username: contents.querySelector('.name').textContent,
      discriminator: this.dataset.discriminator,
      avatar: this.src,
      badge: contents.querySelector('.badge').textContent
    })
  }

  onError () {
    this.removeEventListener('error', this.onError)
    const discriminator = parseInt(this.dataset.discriminator) || 0
    this.src = `https://cdn.discordapp.com/embed/avatars/${discriminator % 4}.png`
  }
}

customElements.define('message-avatar', MessageAvatar, { extends: 'img' })
