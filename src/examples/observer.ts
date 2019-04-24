import { of } from 'rxjs';

export default function() {
  const observable = of([1, 2, 3, 4, 5, 6]);
  const observer = {
    next: (arr: number[]) => console.log(`Array: ${arr}`),
    error: (err: any) => console.log(`ERROR: ${err}`),
    complete: () => console.log(`All done!`),
  };
  observable.subscribe(observer);

  observable.subscribe(
    (arr) => console.log(`Also an array ${arr}`),
    (err) => console.log(`Error ${err}`),
    () => console.log('complete')
  );
}
