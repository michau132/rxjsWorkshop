import { Observable, Subscriber, of } from 'rxjs';

export default function() {

  // default constructor
  const observable: Observable<string> = new Observable((subscriber) => {
    subscriber.next('tekst');
    subscriber.next('another tekst');
    subscriber.complete();
  });

  observable.subscribe(
    (val: string) => {
      console.log(val);
    },
    (err) => { console.log(err); },
    () => console.log('default contructor complete')
  );


  // Observable.create()
  const rootElement: HTMLElement = document.querySelector('#root');
  const div = document.createElement('div');
  div.innerHTML = `
    <h2 class="currentValue"></h2>
    <h2 class="currentError"></h2>
  `;
  rootElement.appendChild(div);
  const currentValue: HTMLElement = rootElement.querySelector('.currentValue');
  const currentError: HTMLElement = rootElement.querySelector('.currentError');
  const observableCreate: Observable<string> =  Observable.create((subscriber: Subscriber<string>) => {
    subscriber.next('First text');

    setTimeout(() => {
      subscriber.next('Second text');
    }, 3000);

    setTimeout(() => {
      subscriber.error('Something goes wrong');
    }, 5000);

    setTimeout(() => {
      subscriber.next('Third text');
      subscriber.complete();
    }, 6000);
  });

  observableCreate.subscribe(
    (val) => currentValue.innerText = val,
    (err) => currentError.innerText = err,
    () => console.log('Observable.create complete')
  );


  // of, from operator

  const arr = [1, 2, 3, 3, 5, 7, 8, 10];
  const arrObservalbe: Observable<number[]> = of(arr);
  arrObservalbe.subscribe(
    (val) => console.log(val),
    (val) => console.log(val),
    () => console.log('of operator complete')
  );
}

