import { Observable, fromEvent } from 'rxjs';

export default function() {
  const rootEl: HTMLElement = document.querySelector('#root');
  const div = document.createElement('div');
  div.innerHTML = `
    <h2 class="time"></h2>
    <button class="stop">Stop</button>
  `;
  rootEl.appendChild(div);
  const button = rootEl.querySelector('.stop');
  const timeEl: HTMLElement = rootEl.querySelector('.time');
  const timer$ = new Observable(subscriber => {
    let i = 0;
    const intervalID = setInterval(() => {
      subscriber.next(i++);
    }, 1000);

    return () => {
      console.log('Executing teardown code.');
      clearInterval(intervalID);
    };
  });

  const timerSubscription = timer$.subscribe(
    value => timeEl.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`,
    null,
    () => console.log('All done!')
  );

  const timerConsoleSubscription = timer$.subscribe(
    value => console.log(`${new Date().toLocaleTimeString()} (${value})`)
  );

  timerSubscription.add(timerConsoleSubscription);

  fromEvent(button, 'click')
    .subscribe(
      event => timerSubscription.unsubscribe()
    );
}
