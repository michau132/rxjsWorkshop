import { fromEvent } from 'rxjs';
import { map, buffer, debounceTime, filter } from 'rxjs/operators';

export default function() {
  const rootElement: HTMLElement = document.querySelector('#root');
  const div = document.createElement('div');
  div.innerHTML = `
    <button class="button">Click me</button>
    <h2 class="notification">Nothing</h2>
  `;
  rootElement.appendChild(div);
  const button: HTMLElement = rootElement.querySelector('.button');
  const notification: HTMLElement = rootElement.querySelector('.notification');
  const clickEvent = fromEvent(button, 'click');
  const buff = clickEvent.pipe(
    debounceTime(250)
  );
  const click = clickEvent.pipe(
    buffer(buff),
    map(list => list.length),
    filter(x => x === 2)
  );
  click.subscribe(() => {
    notification.innerText = 'Clicked twice';
    button.innerText = 'I was clicked twice!';
    setTimeout(() => {
      notification.innerText = '';
      button.innerText = 'Click me';
    }, 2000);
  });
}
