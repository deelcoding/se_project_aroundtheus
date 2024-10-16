export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
    }

    getUserInformation() {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent,
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
}