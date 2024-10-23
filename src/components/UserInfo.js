export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInformation() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement ? this._avatarElement : "",
    };
  }

  setUserInformation({ name, job }) {
    if (name) {
      this._nameElement.textContent = name;
    }
    if (job) {
      this._jobElement.textContent = job;
    }
  }

  setUserAvatar(avatarUrl) {
    this._avatarElement.src = avatarUrl;
  }
}
