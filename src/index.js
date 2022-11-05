import {sum} from './modules/sum';
import './index.css';

const root = document.querySelector('#root');
root.textContent = sum(6, -3).toString();