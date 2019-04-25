import { of, forkJoin, zip } from 'rxjs';
import { map, filter, flatMap, concatAll, toArray } from 'rxjs/operators';

export default function() {
  const arr = of([1, 2, 3, 5]);
  const arr2 = of([22, 31, 52, 654, 12]);
  // before version 5.5
  // arr.map().filter().subscribe()

  // after
  //  arr.pipe(map(), filter).subscribe()

  forkJoin(arr, arr2)
    .pipe(
      map(el => el.flat()),
      map(flatten => flatten.filter(numb => numb % 2 === 0))
    )
    .subscribe((e) => console.log(e)) ;

  zip(arr, arr2)
    .pipe(
      concatAll(),
      flatMap(el => el),
      filter(el => el % 2 === 0),
      toArray()
    )
    .subscribe(el => console.log(el));
}
