import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { validator } from '../../utils/validator';
import { debounce } from '@ember/runloop';
import { JOIN_DEBOUNCE_TIME } from '../../constants/join';

export default class StepTwoComponent extends Component {
  @tracked data = JSON.parse(localStorage.getItem('stepTwoData')) ?? {
    introduction: '',
    skills: '',
    college: '',
    forFun: '',
    funFact: '',
  };
  isValid;
  setIsValid;
  setIsPreValid;

  constructor(...args) {
    super(...args);
    this.isValid = this.args.isValid;
    this.setIsValid = this.args.setIsValid;
    this.setIsPreValid = this.args.setIsPreValid;
    const validated =
      validator(this.data.introduction, 1) &&
      validator(this.data.skills, 1) &&
      validator(this.data.college, 1) &&
      validator(this.data.forFun, 100) &&
      validator(this.data.funFact, 100);
    localStorage.setItem('isValid', validated);
    this.setIsPreValid(validated);
  }

  @action inputHandler(e) {
    this.setIsPreValid(false);
    const setValToLocalStorage = () => {
      this.data = { ...this.data, [e.target.name]: e.target.value };
      localStorage.setItem('stepTwoData', JSON.stringify(this.data));
      const validated =
        validator(this.data.introduction, 1) &&
        validator(this.data.skills, 1) &&
        validator(this.data.college, 1) &&
        validator(this.data.forFun, 100) &&
        validator(this.data.funFact, 100);
      this.setIsValid(validated);
      localStorage.setItem('isValid', validated);
    };
    debounce(this.data, setValToLocalStorage, JOIN_DEBOUNCE_TIME);
  }
}